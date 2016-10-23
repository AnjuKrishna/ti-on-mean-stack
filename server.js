var express = require('express');

var app = express();

var path = require('path');

var http = require('http');

var multer  = require('multer');

var newName = "";
var storage = multer.diskStorage({
  destination: './uploads/',
 
 filename: function (req, file, cb)
 { newName =
  file.originalname.replace(
	path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname);
  cb(null, newName )}
})


var upload = multer({ storage: storage })


app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 3000);



app.post('/savedata', upload.single('file'), function(req,res,next){
    console.log('Uploade Successful ', req.file, req.body);
var fs = require('fs');
var fileloc = './uploads/';

fs.readFile(fileloc+newName, 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
console.log('file content '+ JSON.stringify(obj));
res.setHeader('Content-Type', 'application/json');
res.send("Successful");
});
});




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


