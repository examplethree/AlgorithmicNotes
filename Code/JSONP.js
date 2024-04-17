//客户端html中：
window.foo = function (data) {
  console.log('Your public IP address is: ' + data.ip);
};

// 利用一个script
<script src="http://example.com/ip?callback=foo"> </script>

// 服务器执行函数
foo({
     "ip": "8.8.8.8"
});