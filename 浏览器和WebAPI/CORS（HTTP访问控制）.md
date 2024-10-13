### 是什么
  是一种通过设置 *HTTP报头字段*，由 *浏览器和服务器配合实现* 的跨域资源共享，需要*服务器实现CORS接口*。
  
  * 整个CORS通信过程，都是**浏览器自动完成**，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

  因此，实现CORS通信的**关键是服务器**。只要服务器实现了CORS接口，就可以跨源通信。

### 什么情况下需要CORS策略，它允许的使用场景
 * 由 XMLHttpRequest 或 Fetch API 发起的跨源 HTTP 请求。
 * Web 字体（CSS 中通过 @font-face 使用跨源字体资源），因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
 * WebGL 贴图。
 * 使用 drawImage() 将图片或视频画面绘制到 canvas。
 * 来自图像的 CSS 图形 (en-US)。
 > cross-origin resource sharing

### CORS策略执行的过程
 从浏览器角度来看，有两种跨源请求：“安全”请求和其他请求。
 “安全”请求必须满足以下条件：
  * 方法：GET，POST 或 HEAD。
  * header —— 我们仅能设置：
    * `Accept`
    * `Accept-Language`
    * `Content-Language`
    * `Content-Type` 的值为 `application/ x-www-form-urlencoded`，`multipart/form-data` 或 `text/plain`。
  * 以及一些对事件监听函数的限制
  
安全请求和其他请求的区别在于，自古以来就可以使用 `<form>` 或 `<script>` 标签来实现安全请求，而对于浏览器来说，非安全请求在很长一段时间都是不可能的。
**所以，实际区别在于，安全请求会立即发送，并带有 `Origin` header，而对于其他请求，浏览器会发出初步的“预检”请求，以请求许可。**

#### 对于安全请求：

1. → 浏览器发送带有`Origin`字段的 Origin header。
> `Origin` 表明预检请求或实际跨源请求的源站

2. ← 对于没有cookie的请求（默认不发送），服务器应该设置：
  * Access-Control-Allow-Origin 为 * 或与 Origin 的值相同

3. ← 对于发送了cookie的请求，服务器应该设置：
  * Access-Control-Allow-Origin 值与 `Origin` 的相同
  * Access-Control-Allow-Credentials 为 true（表示需要携带cookie）
  > **注意**：如果服务器端的响应中未携带 `Access-Control-Allow-Credentials: true`，浏览器将**不会**把响应内容返回给请求的发送者。也就是说，服务端会返回响应，但浏览器会将其拦截

此外，要授予 JavaScript 访问除 `Cache-Control`，`Content-Language`，`Content-Type`，`Expires`，`Last-Modified` 或 `Pragma` 外的任何 response header 的权限，服务器应该在 header `Access-Control-Expose-Headers` 中列出允许的那些 header。

#### 对于非安全请求，会在请求之前发出初步“预检”请求 (——相当于变成对服务器而言安全的请求，然后再执行上方安全请求的方案)：

1. 发出预检请求
  → 浏览器将具有以下 header 的 OPTIONS 请求发送到相同的 URL：
   * Access-Control-Request-Method 请求的方法。
   * Access-Control-Request-Headers 以逗号分隔的“非安全”（很可能是自定义的请求头） header 列表。

2. 预检请求的响应：服务器收到请求后，检查Origin、Access-Control-Request-Method 和 Access-Control-Request-Headers 字段，确认允许跨源请求，就可以做出回应。

  > 如果服务器*否定*了"预检"请求，会返回一个*正常的HTTP响应报文*（状态码可能是200 OK），但是**报文中没有任何CORS相关的头信息字段**。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出报错信息。

  ← 服务器应该响应状态码为 200 和带有跨域字段的响应头：
   * Access-Control-Allow-Origin 为特定的域，不允许为 *
   * Access-Control-Allow-Methods 允许的方法的列表，不允许为 *
   * Access-Control-Allow-Headers 带有允许的 header 的列表，不允许为 *
   * Access-Control-Max-Age 带有指定缓存权限的秒数。不允许为 *

3. 然后，发送实际的请求，并应用之前的“安全”方案。

### 相比JSONP方式
  CORS方法支持多种请求方式，JSONP只支持`GET`请求。
  JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。