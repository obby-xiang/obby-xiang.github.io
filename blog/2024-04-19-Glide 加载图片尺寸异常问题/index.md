---
slug: glide-abnormal-image-size
title: Glide 加载图片尺寸异常问题
authors: obby-xiang
tags: [Glide]
draft: true
---



[Glide](https://github.com/bumptech/glide) 是一个快速高效的 Android 图片加载库。最近在使用这个库的时候遇到一个有趣的问题，简单回顾一下。



<!--truncate-->



## 问题背景

我们负责开发的一个 Android 应用，有个图片全屏预览的功能，测试同学验证的时候发现有些图片必现无法加载，问题日志如下：

```java
java.lang.RuntimeException: Canvas: trying to draw too large(?bytes) bitmap.
    at android.graphics.RecordingCanvas.throwIfCannotDraw(RecordingCanvas.java:280)
    at android.graphics.BaseRecordingCanvas.drawBitmap(BaseRecordingCanvas.java:88)
    at android.graphics.drawable.BitmapDrawable.draw(BitmapDrawable.java:548)
    at android.widget.ImageView.onDraw(ImageView.java:1436)
    at android.view.View.draw(View.java:22350)
    ...
```



代码大致如下：

```java title="MainActivity.java" showLineNumbers
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final ImageView imageView = findViewById(R.id.image);
        Glide.with(imageView)
                .asBitmap()
                .load(R.drawable.image)
                .transform(new FitCenter())
                .into(imageView);
    }
}
```



```xml title="activity_main.xml" showLineNumbers
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/image"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scaleType="fitCenter"
        tools:ignore="ContentDescription" />
</androidx.constraintlayout.widget.ConstraintLayout>
```



> - 测试设备：Android 11，1080x2400
> - 测试图片：[6000x1000](assets/test-image.png)



我们使用测试图片尝试复现问题，却发现图片是可以正常加载的。退出应用终止进程后再次启动应用查看测试图片，神奇的事情发生了——图片加载不出来了，问题日志跟刚开始提到的一模一样。

为什么会这样呢？



## 问题分析





