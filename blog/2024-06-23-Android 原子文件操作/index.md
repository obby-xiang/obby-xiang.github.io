---
slug: android-atomic-file-operation
title: Android 原子文件操作
authors: obby-xiang
tags: [Android]
draft: true
---



现在需要实现一个功能，将应用 `assets` 目录中指定目录的所有图片复制到共享存储空间的公共目录，让其他应用可以访问到这些图片。

假设已获得相关的存储权限且共享存储空间充足，也不需要考虑添加图片到媒体库，应该怎么实现呢？



<!--truncate-->



思路比较简单，列出应用 `assets` 目录中指定目录的资源后逐一复制到共享存储空间目标目录即可：

```java
import android.annotation.SuppressLint;
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

@SuppressLint("ApplySharedPref")
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



