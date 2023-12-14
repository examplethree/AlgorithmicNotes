### 在浏览器中存储数据
Cookie 通常是由 Web 服务器使用响应 `Set-Cookie` `HTTP-header` 设置的。然后浏览器使用 `Cookie` `HTTP-header` 将它们自动添加到（几乎）每个对相同域的请求中，随着每次的请求报文发送到服务器。

1. domain字段
domain 控制了可访问 cookie 的域。但是在实际中，有一些限制。我们无法设置任何域。

**无法从另一个二级域访问 cookie，因此 other.com 永远不会收到在 site.com 设置的 cookie。**

这是一项安全限制，为了允许我们将敏感数据存储在应该仅在一个站点上可用的 cookie 中。

默认情况下，cookie 只有在设置的域下才能被访问到。

请注意，默认情况下，cookie 也**不会共享给子域**，例如 forum.site.com。但通过 domain 选项的设置，可以实现允许在子域访问 cookie

2. expires，max-age
默认情况下，如果一个 `cookie` 没有设置这两个参数中的任何一个，那么在关闭浏览器之后，它就会消失。此类 `cookie` 被称为 "`session cookie`”。

3. secure
默认情况下，如果我们在 `http://site.com` 上设置了 cookie，那么该 cookie 也会出现在 `https://site.com` 上，反之亦然。也就是说，cookie 是基于域的，它们不区分协议。  
通过这个标识，Cookie 只能被通过 HTTPS 传输。

4. samesite
提供了一种防止XSRF（跨站请求伪造）攻击的方式。
* 当 `samesite=strict`（没有值的 `samesite` 一样）
 进行了任何来自其他域下的操作，cookie 都不会被发送。但是这也限制了从安全的域下进行的访问。
* 使用 `samesite=lax`
 允许安全的HTTP方法  
 执行顶级导航  
 以上两种情况浏览器会发送cookie

 #### CSRF攻击
 利用浏览器向目标服务器发送请求时，通常会自动携带与目标域相关的Cookie信息，这一行为，来伪造请求。
 防止这一攻击，可以通过
  * 在服务端设置cookie的samesite属性，要求只有来自同一域名的请求才能发送 cookie。
  * 服务器端应该为每个用户生成一个随机的 token，并在每个表单中加入这个 token，然后在接收请求时验证 token 的有效性。这样可以防止攻击者伪造没有 token 的请求。