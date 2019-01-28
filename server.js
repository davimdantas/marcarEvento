const http = require('http');
const marcarServer = http.createServer((req, res) => {
  res.end('This is my first responde');
});

marcarServer.listen(process.env.PORT || 3000);
