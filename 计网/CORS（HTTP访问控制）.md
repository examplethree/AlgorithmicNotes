### 是什么
  是一种通过设置 *HTTP报头字段*，由浏览器和服务器配合实现的跨域资源

#### 什么情况下需要CORS策略，它允许的使用场景
 * 由 XMLHttpRequest 或 Fetch API 发起的跨源 HTTP 请求。
 * Web 字体（CSS 中通过 @font-face 使用跨源字体资源），因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
 * WebGL 贴图。
 * 使用 drawImage() 将图片或视频画面绘制到 canvas。
 * 来自图像的 CSS 图形 (en-US)。
 > cross-origin resource sharing

#### 总结
 从浏览器角度来看，有两种跨源请求：“安全”请求和其他请求。

“安全”请求必须满足以下条件：
* 方法：GET，POST 或 HEAD。
* header —— 我们仅能设置：
  * `Accept`
  * `Accept-Language`
  * `Content-Language`
  * `Content-Type` 的值为 `application/ x-www-form-urlencoded`，`multipart/form-data` 或 `text/plain`。
  
安全请求和其他请求的本质区别在于，自古以来就可以使用 `<form>` 或 `<script>` 标签来实现安全请求，而对于浏览器来说，非安全请求在很长一段时间都是不可能的。

**所以，实际区别在于，安全请求会立即发送，并带有 `Origin` header，而对于其他请求，浏览器会发出初步的“预检”请求，以请求许可。**

##### 对于安全请求：

* → 浏览器发送带有源的 Origin header。
* ← 对于没有凭据的请求（默认不发送），服务器应该设置：
  * Access-Control-Allow-Origin 为 * 或与 Origin 的值相同
* ← 对于具有凭据的请求，服务器应该设置：
  * Access-Control-Allow-Origin 值与 Origin 的相同
  * Access-Control-Allow-Credentials 为 true

此外，要授予 JavaScript 访问除 `Cache-Control`，`Content-Language`，`Content-Type`，`Expires`，`Last-Modified` 或 `Pragma` 外的任何 response header 的权限，服务器应该在 header `Access-Control-Expose-Headers` 中列出允许的那些 header。

##### 对于非安全请求，会在请求之前发出初步“预检”请求 (——相当于变成对服务器而言安全的请求，然后再执行上方安全请求的方案)：

* → 浏览器将具有以下 header 的 OPTIONS 请求发送到相同的 URL：
  * Access-Control-Request-Method 有请求方法。
  * Access-Control-Request-Headers 以逗号分隔的“非安全” header 列表。
* ← 服务器应该响应状态码为 200 和 header：
  * Access-Control-Allow-Methods 带有允许的方法的列表，
  * Access-Control-Allow-Headers 带有允许的 header 的列表，
  * Access-Control-Max-Age 带有指定缓存权限的秒数。
* 然后，发送实际的请求，并应用之前的“安全”方案。