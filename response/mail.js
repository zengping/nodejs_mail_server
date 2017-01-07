var querystring = require("querystring");
var email = require("nodemailer");
var url = require("url");

function send(request, response) {
    var path = url.parse(request.url, true);

    var transporter = email.createTransport({
        service: 'qq',
        auth: {
            user: 'xxx@qq.com',
            pass: 'xxx' //授权码,通过QQ获取  

        }
    });
    var mailOptions = {
        from: 'xxx@qq.com', // 发送者  
        to: path.query.to, // 接受者,可以同时发送多个,以逗号隔开  
        subject: path.query.title, // 标题  
        //text: 'Hello world', // 文本  
        html: path.query.content
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('发送成功');
    });  

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write("{status: {code: 200, message: 'success'}, data: 'mail send success'}");
    response.end();

}

exports.send = send;