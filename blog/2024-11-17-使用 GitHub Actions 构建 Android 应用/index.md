---
slug: build-android-with-github-actions
title: 使用 GitHub Actions 构建 Android 应用
authors: obby-xiang
tags: [Github, Android]
draft: true
---



[GitHub Actions](https://docs.github.com/zh/actions) 是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署管道。我们可以创建工作流，以便在推送更改到存储库时运行测试，或将合并的拉取请求部署到生产环境。

这里介绍下如何使用 GitHub Actions 构建 Android 应用。



<!--truncate-->



在 Github 的存储库中，创建 `.github/workflows` 目录，并在该目录下创建工作流文件（例如 `build.yml`），参考工作流模板 [Android CI](https://github.com/actions/starter-workflows/blob/main/ci/android.yml) 完善内容。

```yaml title="build.yml"
name: Android Build

# 推送到 master 分支时运行工作流程
on:
  push:
    branches:
      - master

jobs:
  build:
    name: Build Android
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: set up JDK 11
        uses: actions/setup-java@v4
        with:
          java-version: '11'
          distribution: 'temurin'
          cache: gradle

      - name: Grant execute permission for gradlew
        run: chmod +x gradlew

      - name: Build with Gradle
        run: ./gradlew build
```

提交更改并推送到存储库，将触发工作流运行。

工作流运行成功，但构建的应用包没有存储，需要使用 [upload-artifact](https://github.com/actions/upload-artifact) 上传构建构件。

```yaml title="build.yml"
name: Android Build

# 推送到 master 分支时运行工作流程
on:
  push:
    branches:
      - master

jobs:
  build:
    name: Build Android
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: set up JDK 11
        uses: actions/setup-java@v4
        with:
          java-version: '11'
          distribution: 'temurin'
          cache: gradle

      - name: Grant execute permission for gradlew
        run: chmod +x gradlew

      - name: Build with Gradle
        run: ./gradlew build

      # highlight-start
      - name: Upload Build Artifact
        uses: actions/upload-artifact@v4
        with:
          name: build-artifact
          path: app/build/outputs/apk/release/app-release-unsigned.apk
      # highlight-end
```

Android 应用包必须使用证书进行数字签名才能安装，可以通过 [Android Studio](https://developer.android.com/studio/publish/app-signing?hl=zh-cn#generate-key) 或 [命令行](https://developer.android.com/build/building-cmdline?hl=zh-cn#sign_cmdline) 生成密钥和密钥库，用于为应用签名。

在模块级 `build.gradle` 文件添加签名配置，出于安全原因，从 Gradle 属性获取签名信息。

```groovy title="build.gradle"
...

android {
    ...

    signingConfigs {
        release {
            storeFile rootProject.file(property('signing.storeFile'))
            storePassword property('signing.storePassword')
            keyAlias property('signing.keyAlias')
            keyPassword property('signing.keyPassword')
        }
    }

    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

通过命令行构建应用。

```shell
./gradlew build -Psigning.storeFile="signing/example.jks" -Psigning.storePassword=example -Psigning.keyAlias=Example -Psigning.keyPassword=example
```

本地开发构建时，可以直接在项目根目录下的 `gradle.properties` 文件添加签名信息，注意不要将这些签名信息带入到存储库中。

```properties title="gradle.properties"
...

# Signing configuration
signing.storeFile=signing/example.jks
signing.storePassword=example
signing.keyAlias=Example
signing.keyPassword=example
```

可以考虑创建一个单独的属性文件（例如 `signing.properties`）来存储签名信息，在 build 文件中引用该文件，同时在 `.gitignore` 文件添加忽略该文件的规则，避免上传签名信息到存储库。

```properties title="signing.properties"
storeFile=signing/example.jks
storePassword=example
keyAlias=Example
keyPassword=example
```

```groovy title="build.gradle"
...

// highlight-start
def signingProperties = new Properties()
def signingPropertiesFile = rootProject.file("signing.properties")
if (signingPropertiesFile.exists()) {
    signingProperties.load(new FileInputStream(signingPropertiesFile))
}
// highlight-end

android {
    ...

    signingConfigs {
        release {
            // highlight-start
            storeFile rootProject.file(signingProperties['storeFile'] ?: property('signing.storeFile'))
            storePassword signingProperties['storePassword'] ?: property('signing.storePassword')
            keyAlias signingProperties['keyAlias'] ?: property('signing.keyAlias')
            keyPassword signingProperties['keyPassword'] ?: property('signing.keyPassword')
            // highlight-end
        }
    }

    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

```gitignore title=".gitignore"
...

signing.properties
```

todo...



## 参考

- [GitHub Actions 快速入门 - GitHub 文档](https://docs.github.com/zh/actions/writing-workflows/quickstart)
- [从工作流存储和共享数据 - GitHub 文档](https://docs.github.com/zh/actions/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow)
- [在变量中存储信息 - GitHub 文档](https://docs.github.com/zh/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables)
- [在 GitHub Actions 中使用机密 - GitHub 文档](https://docs.github.com/zh/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- [actions/starter-workflows: Accelerating new GitHub Actions workflows - Github](https://github.com/actions/starter-workflows)
- [actions/setup-java: Set up your GitHub Actions workflow with a specific version of Java - Github](https://github.com/actions/setup-java)
- [actions/upload-artifact - Github](https://github.com/actions/upload-artifact)
- [从命令行构建您的应用 | Android Studio | Android Developers](https://developer.android.com/build/building-cmdline?hl=zh-cn)
- [为应用签名 | Android Studio | Android Developers](https://developer.android.com/studio/publish/app-signing?hl=zh-cn)
- [Configuring the Build Environment - Gradle Documentation](https://docs.gradle.org/current/userguide/build_environment.html)
