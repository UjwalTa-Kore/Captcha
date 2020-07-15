// const express = require('express')
// const session = require('express-session')

var svgCaptcha = require('svg-captcha');
var captcha=svgCaptcha.create()
// const app = express()
console.log(captcha)
// app.get('/captcha', function (req, res) {
//     var captcha = svgCaptcha.create();
//     req.session.captcha = captcha.text;
//     res.type('svg');
//     res.status(200).send(captcha.data);
//     console.log(captcha)
// });
// console.log('/captcha',captcha)
// app.get('/', function (req, res, next) {
//   res.type('html')
//   res.end(`
//     <img src="/captcha"/>
//     <form action="/test" method="post">
//       <input type="text" name="captcha"/>
//       <input type="submit"/>
//     </form>
//   `)
// })
// app.post('/test', (req, res) => {
//   res.type('html')
//   res.end(`
//     <p>CAPTCHA VALID: ${captcha.validate(req, req.body.captcha)}</p>
//   `)
// })
 
// app.listen(8002, () => {
//   console.log('server started')
// })




// // app.listen = function() {
// //     var server = http.createServer(8005);
// //     return server.listen.apply(server, arguments);
// //   };