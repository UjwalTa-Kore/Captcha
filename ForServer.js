const expressCaptcha = require('express-svg-captcha')

const captcha = new expressCaptcha({
    isMath: false,           // if true will be a simple math equation
    useFont: null,          // Can be path to ttf/otf font file
    size: 5,                // number of characters for string capthca
    ignoreChars: '0o1i',    // characters to not include in string capthca
    noise: 3,               // number of noise lines
    color: true,            // if true noise lines and captcha characters will be randomly colored
                            // (is set to true if background is set)
    background: null,       // HEX or RGB(a) value for background set to null for transparent
    width: 150,             // width of captcha
    height: 50,             // height of captcha
    fontSize: 56,           // font size for captcha
    charPreset: null,       // string of characters for use with string captcha set to null for default aA-zZ
  })


app.get("/CustomServices/getCaptcha",function(req,res,next){
    var new_captcha=captcha.generate()
})

app.post('/CustomServices/getCaptcha/test', (req, res) => {
    // res.type('html')
    res.end("CAPTCHA VALID: ",captcha.validate(req, req.body.captcha))
  })