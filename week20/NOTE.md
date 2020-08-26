# phantomJS eslint Oauth

## 无头浏览器 phantomJS

    无头浏览器是指可以在图形界面情况下运行的浏览器。我可以通过编程来控制无头浏览器自动执行各种任务，比如做测试，给网页截屏等。相对于一般浏览器来说，节省了GUI所必须消耗的大量内存，给多线程、进程并行提供了方便。

### phantomJS

    https://phantomjs.org/

* 对页面截图
* 对dom结构检查
* 适配使用较为复杂

## eslint

    js规范检测工具，帮助校验js格式，避免一些bug

* 集成到脚手架
* 校验规则rules可自定义话
* 灵活性较强

## Oauth

* 客户端某些操作需要用户授权
* 将用户导向第三方服务端（github）
* 用户同意授权后第三方提供令牌（code）回调到服务端
* 服务端通过（code）与第三方（github）交互获取access_token并回调到客户端
* 客户端通过access_token与服务端交互并产生相关操作
* 服务端通过access_token与第三方交互获取用户信息判断权限后来验证操作
