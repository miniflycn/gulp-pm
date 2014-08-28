# gulp-pm

> 来自 [duo](https://github.com/duojs/duo) 的包管理方案实现。
> `[注意]`正在开发过程中......

### Why

>  出于兴趣写一下，但你或许能看到一些小亮点^ ^

### Goals

* 管理Javascript、css、html、images等公共资源
* 通过源文件声明来下载依赖，而不是通过 manifest
* 只负责包管理，不参与构建工作

### How

例如源文件：index.js：

```javascript
// 表明依赖的组件不是本地文件，是github上matthewmueller的uid项目
// 未指定版本号，所以默认为最新版本
var uid = require(':matthewmueller/uid');

// 可以这样指定版本号：
// require(':matthewmueller/uid@0.0.2')
// 还可以指定特定的branch，例如：
// require(':matthewmueller/uid@mater')

// 干些其他事情
```

我们的gulpfile.js为：

```javascript
var gulp = require('gulp')
  , pm = require('./');

gulp.task('default', function () {
  gulp.src('src/**/*.js')
    .pipe(pm({
      // 这里写你的github的token
      token: 'xxxxxxxxxxxxxxxxxxx'
    }))
    // ....做些其他构建工作
    .pipe(gulp.dest('dest'));
});
```

如果没有github的token，请点击这里创建：https://github.com/settings/tokens/new

运行 `$ gulp` 则我们会发现，components目录下会多了一个matthewmueller-uid@0.0.2文件夹，及依赖库matthewmueller-uid的最新版本0.0.2已被下载下来了。

然后我们就可以通过接下来的构建任务，将项目打包起来了。