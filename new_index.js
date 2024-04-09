var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

app.use(fileUpload({}));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/form', function (req, res) {
  res.setHeader('content-type', 'text/html;charset=utf-8');
  res.write('<form action="/upload" method="POST" enctype="application/x-www-form-urlencoded" >');
  res.write('<input type="file" name="photo">');
  res.write('<input type="submit">');
  res.write('</form>');
  res.end();
})

app.post('/upload', function(req, res) {
  req.files.photo.mv('public/pics/'+req.files.photo.name);
  res.end(req.files.photo.name);
  console.log(req.files.photo); // the uploaded file object
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at ")

})