# 工具

## Dev工具

* Server

    - build: webpack babel vue jsx postcss
    - watch: fsevent
    - mock: ...
    - http: http-server

* Client

    - debugger: devtool vscode
    - sourceMap

## 熟悉各类工具使用

* babel --- 主要同于解析js将浏览器不识别的ES新特性转换成能识别的js代码
* fsevent --- IOS系统文件监控包，常用于检测文件变化，如：热更新
* watchman --- 文件监控包(windows可用)
* devtool --- 有自己的一套api 可以通过实现他们还调用server里面的服务
* sourceMap --- 一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置
    
    - 注意webpack loader的map合成

## Test工具

### mocha

    常用测试框架，提供一些方法便于测试用例的调用

### nyc

    用于检测覆盖率

## 链接

    https://facebook.github.io/watchman/

## 注意

* node环境下的import和require的调用转换
