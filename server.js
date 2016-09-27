var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var router = express.Router();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

//Set up SMTP options for mailing.
var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user: 'jonesautomotive.mailer@gmail.com',
		pass: 'ilikepie123'
	}
});

app.use('/mail', router);
router.post('/', handleMail);

app.get('/send',function(req,res){
	var mailOptions={
		to : req.query.to,
		subject : req.query.subject,
		text : req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		}else{
			console.log("Message sent: " + response.message);
			res.end("sent");
		}
	});
});



function handleMail(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'jonesautomotive.mailer@gmail.com',
			pass: 'ilikepie123'
		}
	});

	var text = 'hello world from \n\n' + req.body.name;

	var mailOptions = {
		from: 'nodbody@gmail.com',
		to: 'samualkholmes@gmail.com',
		subject: 'Email Example',
		text: text
	}

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.json({yo: 'error'});
		}else{
			console.log('Message sent: ' + info.response);
			res.json({yo: info.response});
		}
	});
}

// set the home page route
app.get('/', function(req, res) {
    // ejs render automatically looks in the views folder
    res.render('index');
});

app.get('/mail', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'jonesautomotive.mailer@gmail.com',
			pass: 'ilikepie123'
		}
	});

	var text = 'hello world from \n\n' + req.body.name;

	var mailOptions = {
		from: 'nodbody@gmail.com',
		to: 'samualkholmes@gmail.com',
		subject: 'Email Example',
		text: text
	}

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.json({yo: 'error'});
		}else{
			console.log('Message sent: ' + info.response);
			res.json({yo: info.response});
		}
	});
});


app.listen(port, function() {
	console.log('Running on http://localhost:' + port);
});