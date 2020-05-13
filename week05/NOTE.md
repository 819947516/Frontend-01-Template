# 浏览器工作原理

## 网络协议分成

    * 应用层 （ DHCP HTTP HTTPS RTMP P2P DNS GTP RPC ）
    * 传输层 （ UDP TCP ）
    * 网络层 （ ICMP IP OSPF BGP IPSec GRE ）
    * 数据链路层 （ ARP VLAN STP ）
    * 物理层 （ 网络跳线、wifi、5G ）

## HTTP协议

    * Request-Response形式
    * 客户端单项向服务器端发送
    * HTTP 协议是基于 TCP 协议的，所以它使用面向连接的方式发送请求，通过 stream 二进制流的方式传给对方
    * HTTP 的返回报文格式固定
    * 标准 https://tools.ietf.org/html/rfc2616

## HTTP协议格式

### Request

    ```
        POST / HTTP/1.1  // (request line)
        Host: 127.0.0.1  // headers
        Content-Type: application/x-www-form-urlencoded  // headers
                         // (\r\n)
        name=LeeJ // body
    ```

### Response

    ```
        HTTP/1.1 200 OK                         // (status line 构成分别是协议和版本 + 状态码 + 状态)
        Content-Type: text/html                 // headers
        Date: Tue, 12 May 2020 10:53:59 GMT
        Connection: keep-alive
        Transfer-Encoding: chunked
                                                // (\r\n)
        26                                      // chunked的方式是表示字符数量的数字+换行+字符
        <html><body>Hello World</body></html>   // body

        0
    ```

## 概括当我们在浏览器输入一个URL敲回车到看到网页发生了什么

    1. URL经过HTTP请求返回的主体是HTML代码 (DNS等等)
    2. 对HTML代码进行parse解析得到DOM树
    3. css computing应用到Dom树，得到DOM with CSS
    4. layout排版，得到元素带位置的DOM（DOM with position）
    5. render得到Bitmap

## CSS Houdini

Houdini是一组底层API，它们公开了CSS引擎的各个部分，从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展CSS。 Houdini是一组API，它们使开发人员可以直接访问CSS 对象模型 （CSSOM），使开发人员可以编写浏览器可以解析为CSS的代码，从而创建新的CSS功能，而无需等待它们在浏览器中本地实现。
