var express = require('express'),
    app = express(),
    server = require('http').createServer(app);

var rp = require("request-promise");
var bodyParser = require('body-parser');
var jws = require('jws');
var inHouse = require("./inHouseAPI");

server.listen(4835, () => {
    console.log("Running on port 4835");
});

var databaseUrl = "mongodb://localhost:27017"; //local mongo db server
var nanoid = require('nanoid'); //logic 
var mongoClient = require('mongodb');
var Promise = require('bluebird');
var inHouse = require('./inHouseAPI');
var svgCaptcha = require('svg-captcha');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoClient.connect(databaseUrl, {
    useNewUrlParser: true
})
    .then(function (client) {
        app.locals.db = client.db('shortener'); //create the db it not exists
        console.log("Connected to " + databaseUrl);
    }).catch(function (err) {
        console.error('Failed to connect to the mongo database. Please ensure MongoDb server is installed and running in the machine ur pointing it to : ' + err);
    });


app.post('/CustomServices/getGoogleApiAccessToken', function (req, res) {
    var privateKey = (req.body && req.body.privateKey) ? req.body.privateKey : "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2oR0kbCwXNt5U\n2GfP3aK9i4lFJvK3tRyuxqeTD27Gq5d7URS24DnH6TO+uNoyxfVF5hB8TpIyZgwt\nWrdF1sFQv/J4B0dYmsz20Y5MUCSYH/BQB+L1sg28wtzTvs6JgSmEouR3B7+KsK9O\nJWEa75t5Q4RScQR7q1Wla9YDyubCPfgYTw5yD1qxfXzHvjB8+m/46DhITpmaT1UY\n/lVYnFHgaq/BeTNKci4+zrWhG+SHCCH47y2IAusUkbM5GilKt1JsizhbJEdKbukg\nDZ9gwYZELcPJOEmmAdgn5L5OdzopAgcJNbFiui9UeXtygKyMAmaTCiRsk5UIn9lx\nR102hpptAgMBAAECggEABZQjKavpO+CinCkLy23L17+QVvhYhTPnLKU8/1vDE0Fb\nbE+pfZLuCOqEI2EOVJXh8buUSNZ166Fc4VzKSOaau0lQZ4oMtqBB6bnfKiXE5xBg\nskfPZG3G3Xt+rImBUcd22cpHsXrJ3HtxsMYpCB4wxlyW3pV9C3xhbnRpEkQWK5w/\nmPR2bJlqIgAHcrI+07jUcSduYzwgmwaiwmO93NoAobncY36Anscn7E1f8H08eIIO\n1m8kyzoulK9Mq4FFy0SxFCkZj5k+/bKSKkcRXfAACnoBKabcv2ToX0KZW0lrM9u0\nVS/jFQlhJdHNw8Q+a3w7zwGyFWihqpuf7YU9zEUhoQKBgQDiIwOkp075b/15e/mE\nPV0PmeYcI/nvRQvb8eCfPT9eqDYwFDv7kVvp80q4npdl7oZyoCYqM+jUJ43C65c5\nECTcrcsqi69uhSZqXwwZBQTABgPHMYTTeN9b/WeHU8PsmngFS9B/kOoznjapM+2f\ntA7BXHJ0ryTZFgAfA364+efjYQKBgQDOvz9+VGkuMLzxRLXTTv5Go0op3hTahfQ6\nM64Nf8vM9zOe81yju6FqE9RZhnbx0x/C3tXK+6gMIyIt0MY9ANkRXpss9IMlnGLu\nFzKRlDOeMC1LL2ym1TWyT68PttY8ddwnf7V9EFwtY2GeSQRDBg2hftJJErBLMXL6\nKvernskejQKBgGUWIdrIr5Txau2TbcafZ6pBsYuCyYcb5mE7jp2gU2OM7iwv32Bl\naiD6kLxWqHb4WUGENYtICRxNUiGADumDPfcn+Vnbd2CARNvoARBuHeF4zteMW0Pt\nFGuaq1zjJQHvSxeS/HEJ5qeMYgLhI6fwZWgqWz+ty1r/aq5ycYNeszoBAoGAOFH2\n/PYHtRKH1f3OvmKNeDaxVFhwO9sz3csIRhsjLJHG2S0Ydm39mcUPGtg7fMLzqwVD\nHkmRzMShYfO2nRWnDElGYme1dkB03sEpAGlr6lLbc9jWc1gviYSVfuVi1ROSRpxO\nl2QmiCLDi/f+FjgG7JB8vnU92y38UVP1JiZaSV0CgYABpix95kDd8TM/Oln6avuR\nj4+34GgcVzbhzzdRNLW/1C96r8z4fBgt7Eg50UVzLA2bb6c9L66WZoEcWHS624vK\n9MMyCxzIDTtMZib7JTHt9zt4PKDNUfnXmDriKR2HmlcAmPNX7LlwFHEdnsJEkVWw\nrq7hygfI0ycIBdLba/HflA==\n-----END PRIVATE KEY-----\n";
    var sub = (req.body && req.body.sub) ? req.body.sub : "shahanaz.mohammed@kore.com";
    var iat = Math.floor(new Date().getTime() / 1000);
    var payload = {
        "iss": "kore-calendar-account@formal-shadow-230008.iam.gserviceaccount.com",
        "sub": sub,
        "scope": "https://www.googleapis.com/auth/calendar",
        "aud": "https://www.googleapis.com/oauth2/v4/token",
        "exp": iat + 3600,
        "iat": iat
    };

    var signedJWT = jws.sign({
        header: {
            alg: 'RS256'
        },
        payload: payload,
        secret: privateKey
    });
    var options = {
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: signedJWT
        }
    };

    return rp(options).then(function (body) {
        console.log(body)
        res.send(JSON.parse(body))
    }).catch(function (err) {
        console.error(err.error);
        res.send(err)
    });
});

app.get('/CustomServices/authoriseBankingBotUser', function (req, res) {
    console.log(("authorization Headers : ", req.headers));
    //John : 123 => Sm9objoxMjM=
    var data = (req.headers.authorization) ? (req.headers.authorization).replace('Basic ', '').trim() : "";
    var buff = new Buffer(data, 'base64');
    validateDpdUsers(buff.toString('ascii')).then(function (response) {
        if (!response) response = "inValid";
        console.log('Resp : ', response);
        if (response.uid || response.path || response.id)
            res.status(200);
        else
            res.status(401);
        res.send(response);
    }).catch(function (err) {
        console.error("Error - >", err.error);
    });;
});


function validateDpdUsers(base64data) {
    var userNamePassword = base64data.split(":");
    console.log(userNamePassword[0], userNamePassword[1]);
    var options = {
        method: 'POST',
        url: 'https://dpd.kore.ai/banking-user-accounts/login',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            username: userNamePassword[0],
            password: userNamePassword[1]
        },
        json: true
    };

    return rp(options).then(function (body) {
        return body;
    }).catch(function (err) {
        console.error("Error found : ", err.error);
        return err.error;
    });
}

function caseInsensitiveDpdUsersValidation(base64data) {
    var userNamePassword = base64data.split(":");
    console.log(userNamePassword[0], userNamePassword[1]);
    return rp({
        "method": "GET",
        "uri": "https://dpd.kore.ai/banking-user-accounts"
    }).then(function (resp) {
        var response = JSON.parse(resp);
        for (var i = 0; i < response.length; i++) {
            if (response[i].username && response[i].username.toLowerCase() == userNamePassword[0].toLowerCase())
                return {
                    "id": response[i].id
                };
        }
    }).catch(function (err) {
        console.error(err.error);
        return err.error;
    });
}


app.post('/CustomServices/getShortUrl/', function (req, res) {
    console.log(req.body.longUrl);

    const {
        db
    } = req.app.locals;
    var originalUrl = req.body.longUrl;
    urlShortnerClass.shortenURL(db, originalUrl).then(function (result) {
        console.log(result);
        var resp = (result && result.value && result.value.short_id) ? "https://demo.kore.net/CustomServices/" + result.value.short_id : req.body.longUrl;
        res.send(resp);
    }).catch(function (err) {
        console.error(err);
    });
});

//redirect by shortend url
app.get('/CustomServices/:short_id', function (req, res) {
    const shortId = req.params.short_id;
    const {
        db
    } = req.app.locals;
    urlShortnerClass.checkIfShortIdExists(db, shortId)
        .then(function (response) {
            (response === null) ? res.send('No link found') : res.redirect(response.original_url);
        }).catch(function (err) {
            console.error(err);
        });
});

app.get('/CustomServices/inHouseCapital/getToken', function (req, res) {
    inHouse.GetAuthToken().then((token) => {
        res.status(200).send(token);
    });
});

var urlShortnerClass = {

    checkIfShortIdExists: function (db, code) {
        return Promise.resolve(db.collection('shortenedURLs').findOne({
            short_id: code
        }));
    },
    shortenURL: function (db, url) {
        const shortenedURLs = db.collection('shortenedURLs');
        //update if exists else insert new .
        //Hence unique values are maintained
        return shortenedURLs.findOneAndUpdate({
            original_url: url
        }, {
            $setOnInsert: {
                original_url: url,
                //mongodb id is 12 bytes.
                //4 bytes time in sec
                //3 bytes machine identifier
                //2 byte process id
                //3 some random value
                //We can even choose 4+3 bytes . How ever lets be more conservative...So choosing 12 bytes
                short_id: nanoid(12),
            },
        }, {
            returnOriginal: false, //will not be modifies if exists
            upsert: true, //creates if does not exists
        });
    }
}



app.get('/CustomServices/captcha', function (req, res) {
    var newCaptcha=svgCaptcha.create()                 //newCaptcha with {"text":text_value ,"data":"html_svg"}
    var encodedString=Buffer.from(newCaptcha['data']).toString('base64')//converting html to base64 
    newCaptcha['data']="data:image/svg+xml;base64,"+encodedString
    res.send(newCaptcha)  
    // res.end()
});

app.listen(8003, () => {
    console.log('server started')
  })