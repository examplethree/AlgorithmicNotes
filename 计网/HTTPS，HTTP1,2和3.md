#### HTTP协议特点
1. 允许传输任意类型的数据，使用header中的 `content-type`字段说明。
2. 无状态
   1. 请求独立：每个请求都是独立的，服务器不会根据之前的请求来处理当前请求。每个请求都包含了足够的信息，以便服务器理解和响应它，而不需要额外的上下文信息。
   4. 负载均衡：由于无状态性，负载均衡器可以将请求路由到任何可用的服务器，因为它不需要关心请求与哪个服务器之前有过交互。

#### HTTPS
 1. 客户端向服务器发送一个 HTTPS 请求，同时发送自己支持的加密算法和随机数。
 2. 服务器选择一个加密算法，并发送自己的证书和随机数给客户端。证书中包含了服务器的**公钥和签名**。(**签名只有客户端知道正确的，公钥只有服务端知道解码的私钥，分别用来客户端和服务端确认对方的安全性**)
 3. 客户端验证证书的有效性和签名的合法性，如果通过，就生成一个新的随机数，用服务器的公钥加密，然后发送给服务器。这个随机数就是用来生成对称密钥的。
 4. 服务器用自己的私钥解密客户端发送的随机数，然后用它和自己的随机数生成对称密钥。
 5. 客户端和服务器用对称密钥加密数据（对称密钥是一个值，非对称是两个值），进行安全的通信。

#### HTTP1.0 和 HTTP1.1
 * HTTP1.1使用了长连接和管道化的机制

##### 长连接使用场景
* 长连接（Long Connection）在数据库连接上的使用场景通常涉及到需要保持持久性连接以提供实时或频繁通信的情境。以下是一些可能的场景：
实时应用程序： 需要实时数据更新的应用程序，如即时通讯、在线游戏、实时监控系统等

* 短连接（Short Connection）通常指的是在完成一次通信任务后立即断开连接的方式。相对于长连接，短连接的生命周期较短，连接通常在请求-响应周期内建立和断开。以下是一些短连接的使用场景：
1. Web页面请求： 当用户在浏览器中请求一个网页时，通常使用短连接。浏览器向服务器发起请求，服务器响应后即断开连接。这种模式适用于典型的HTTP请求-响应场景。
2. RESTful API： RESTful API 的设计通常采用无状态、独立的请求-响应模式，每个请求都是独立的短连接。
3. 文件下载
4. 邮件传输： SMTP（Simple Mail Transfer Protocol）用于电子邮件传输，通常使用短连接。
6. 远程过程调用（RPC）
7. 数据库查询： 在一些轻量级查询场景中，数据库查询可以使用短连接。


#### HTTP2的特点
  最大的特点就是使用了多路复用的技术。使用分帧技术，使得接收端可以乱序处理并响应，解决了HTTP的队头阻塞。但HTTP基于TCP，因此在TCP会按顺序发送他的数据包，TCP仍然存在队头阻塞问题。同时，由于HTTP2规定一个域名只能有一个TCP连接，而HTTP1.1可以有6个，因此在一些场景下，HTTP2的性能可能比HTTP1.1更差。
  HTTP2 参考 https://zhuanlan.zhihu.com/p/276057825

#### 队首阻塞
  当前一个请求被阻塞，则后续的所有请求都要等待。虽然HTTP1.X的客户端可以使用多个连接发送请求，缓解队首阻塞，但是连接的数量是被限制的（通常为6个）。但实际上，HTTP2的并行办法也并不是真的解决了队首阻塞，只是从HTTP协议的层面解决，但底层的TCP连接还是存在队首阻塞，并且HTTP2给每个域名只开启一个TCP连接，而HTTP1.x可以有至多6个，所以在某些情况下，HTTP2并不比HTTP1.x效率高。