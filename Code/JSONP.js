//客户端html中：
window.foo = function (data) {
  console.log('Your public IP address is: ' + data.ip);
};

// 利用一个script
<script src="http://example.com/ip?callback=foo"> </script>

// 服务器对此script请求，响应一段代码，执行对应函数。
// 实际上将数据通过参数给出
foo({
     "ip": "8.8.8.8"
});