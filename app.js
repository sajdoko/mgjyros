// RUN PACKAGES
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

// SETUP APP
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));



//MULTER CONFIG: to get file photos to temp server storage
const multerConfig = {
  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({
    //specify destination
    destination: function (req, file, next) {
      next(null, './public/photo-storage');
    },
    //specify the filename to be unique
    filename: function (req, file, next) {
      console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      //set the file fieldname to a unique name containing the original name, current datetime and the extension.
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),
  // filter out and prevent non-image files.
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    // only permit image mimetypes
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported")
      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};


/* ROUTES
 **********/
app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/', multer(multerConfig).single('fotoBardheZi'), function (req, res) {

    // Example posting a local image file:
    var fs = require('fs');
    var request = require('request');
    request.post({
      url: 'https://api.deepai.org/api/colorizer',
      headers: {
        'Api-Key': '0ea2392a-0e01-4080-883f-10cd3afb35fc'
      },
      formData: {
        'image': fs.createReadStream('public/photo-storage/' + req.file.filename),
      }
    }, function callback(err, httpResponse, body) {
      if (err) {
        console.error('request failed:', err);
        return;
      }
      var response = JSON.parse(body);
      console.log(response);
      res.send(response)
    });
  }

);

// RUN SERVER
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});