---
slug: android-atomic-file-operation
title: Android 原子文件操作
authors: obby-xiang
tags: [Android]
---



现在需要实现一个功能，将应用 `assets` 目录中指定目录的所有图片复制到共享存储空间的公共目录，让其他应用可以访问到这些图片。

假设已获得相关的存储权限且共享存储空间充足，也不需要考虑添加图片到媒体库，应该怎么实现呢？



<!--truncate-->



思路比较简单，列出应用 `assets` 目录中指定目录的资源后逐一复制到共享存储空间目标目录即可。

```java
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.WorkerThread;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

...

@SuppressWarnings("ApplySharedPref")
@WorkerThread
public static void copyImagesIfNeeded(@NonNull final Context context) {
    final SharedPreferences preferences = context.getSharedPreferences("example", Context.MODE_PRIVATE);
    // 检查是否已复制，已复制则不处理
    if (preferences.getBoolean("images_copied", false)) {
        Log.i(TAG, "copyImagesIfNeeded: already copied");
        return;
    }

    try {
        // 获取待复制资源路径数组
        final String[] assets = context.getAssets().list("example-images");
        if (assets == null) {
            Log.w(TAG, "copyImagesIfNeeded: assets is null");
            return;
        }

        // 创建共享存储空间目标目录
        final File targetDir =
            new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "example");
        FileUtils.forceMkdir(targetDir);

        // 复制资源到目标目录
        for (final String asset : assets) {
            try (final InputStream in = context.getAssets().open("example-images/" + asset);
                 final FileOutputStream out = new FileOutputStream(new File(targetDir, asset))) {
                IOUtils.copy(in, out);
                out.flush();
                out.getFD().sync();
            }
        }
    } catch (IOException e) {
        Log.e(TAG, "copyImagesIfNeeded: error occurred", e);
        return;
    }

    Log.i(TAG, "copyImagesIfNeeded: copied successfully");
    // 标记为已复制
    preferences.edit().putBoolean("images_copied", true).commit();
}
```

小小功能，拿捏。

然而没过多久，问题很快就来了，有时候复制的图片显示不全且复制的图片数量也少了，这是怎么回事呢？

![test-image-failed](assets/image-copy-failed.png)

从现象看，显示不全的图片仅有一张，丢失的图片都是该图片之后的。从日志看，没有图片复制结果的日志打印。基本可以确定问题原因是复制图片的过程被打断，导致图片没有完整复制或丢失。那为什么会这样呢？

由于复制图片是耗时任务，不能放到主线程运行，于是创建后台线程来处理。然而运行复制图片任务时，应用可能不在前台，系统可能随时终止应用进程，[异步工作](https://developer.android.com/develop/background-work/background-tasks/asynchronous)无法保证完成。对于这个问题，可以通过[前台服务](https://developer.android.com/develop/background-work/services/foreground-services)或[持久性工作](https://developer.android.com/develop/background-work/background-tasks/persistent)来解决，这里不做过多讨论。

这就结束了吗？如果用户手动清理应用任务导致复制图片的过程被打断，那么还是有可能会出现显示不全的图片。为了解决这个问题，需要确保复制中的图片不能呈现出来，完整复制的图片才能呈现。

于是想到将图片复制到非媒体扩展名的临时文件，再将临时文件重命名为目标图片名称，这样问题就解决了。

```java
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.WorkerThread;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

...

// highlight-next-line
@SuppressWarnings({"ApplySharedPref", "ResultOfMethodCallIgnored"})
@WorkerThread
public static void copyImagesIfNeeded(@NonNull final Context context) {
    final SharedPreferences preferences = context.getSharedPreferences("example", Context.MODE_PRIVATE);
    // 检查是否已复制，已复制则不处理
    if (preferences.getBoolean("images_copied", false)) {
        Log.i(TAG, "copyImagesIfNeeded: already copied");
        return;
    }

    try {
        // 获取待复制资源路径数组
        final String[] assets = context.getAssets().list("example-images");
        if (assets == null) {
            Log.w(TAG, "copyImagesIfNeeded: assets is null");
            return;
        }

        // 创建共享存储空间目标目录
        final File targetDir =
            new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "example");
        FileUtils.forceMkdir(targetDir);

        // 复制资源到目标目录
        for (final String asset : assets) {
            // highlight-next-line
            final File tempFile = new File(targetDir, asset + ".tmp");
            try (final InputStream in = context.getAssets().open("example-images/" + asset);
                 // highlight-next-line
                 final FileOutputStream out = new FileOutputStream(tempFile)) {
                IOUtils.copy(in, out);
                out.flush();
                out.getFD().sync();
                // highlight-start
                // 重命名临时文件
                tempFile.renameTo(new File(targetDir, asset));
                // highlight-end
            }
        }
    } catch (IOException e) {
        Log.e(TAG, "copyImagesIfNeeded: error occurred", e);
        return;
    }

    Log.i(TAG, "copyImagesIfNeeded: copied successfully");
    // 标记为已复制
    preferences.edit().putBoolean("images_copied", true).commit();
}
```

通过写入临时文件再重命名为目标文件，就实现了对文件进行原子操作。

对于原子文件操作，跟数据库事务类似，简单理解就是对文件的操作要么完全成功，要么完全失败，不存在中间状态，确保文件的一致性和可靠性。

Android 提供了原子文件操作辅助类 [`AtomicFile`](https://developer.android.com/reference/androidx/core/util/AtomicFile)，可以对文件进行原子读取和写入操作。

```java
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.WorkerThread;
// highlight-next-line
import androidx.core.util.AtomicFile;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

...

// highlight-next-line
@SuppressWarnings("ApplySharedPref")
@WorkerThread
public static void copyImagesIfNeeded(@NonNull final Context context) {
    final SharedPreferences preferences = context.getSharedPreferences("example", Context.MODE_PRIVATE);
    // 检查是否已复制，已复制则不处理
    if (preferences.getBoolean("images_copied", false)) {
        Log.i(TAG, "copyImagesIfNeeded: already copied");
        return;
    }

    try {
        // 获取待复制资源路径数组
        final String[] assets = context.getAssets().list("example-images");
        if (assets == null) {
            Log.w(TAG, "copyImagesIfNeeded: assets is null");
            return;
        }

        // 创建共享存储空间目标目录
        final File targetDir =
            new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "example");
        FileUtils.forceMkdir(targetDir);

        // 复制资源到目标目录
        for (final String asset : assets) {
            // highlight-next-line
            final AtomicFile file = new AtomicFile(new File(targetDir, asset));
            try (final InputStream in = context.getAssets().open("example-images/" + asset);
                 // highlight-next-line
                 final FileOutputStream out = file.startWrite()) {
                IOUtils.copy(in, out);
                // highlight-next-line
                file.finishWrite(out);
            }
        }
    } catch (IOException e) {
        Log.e(TAG, "copyImagesIfNeeded: error occurred", e);
        return;
    }

    Log.i(TAG, "copyImagesIfNeeded: copied successfully");
    // 标记为已复制
    preferences.edit().putBoolean("images_copied", true).commit();
}
```

原子文件操作还有很多其他的应用场景，也有其他的实现方法，你能想到吗？

