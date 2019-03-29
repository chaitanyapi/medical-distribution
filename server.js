const express = require('express');
const app = express();
// var session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./server/routes/api');
const passport = require('passport');
// const cors = require('cors');
const port = 3000;
const logger= require('morgan');
var mongo = require('mongodb');
// var monk = require('monk');
const mongoose = require('mongoose');
// var multer = require('multer');
// var GridFsStorage = require('multer-gridfs-storage');
// var db = new mongo.Db('meandb', new mongo.Server("localhost", 27017));

// var Grid = require('gridfs-stream');
// // Grid.mongo = mongoose.mongo;
// var gfs = Grid(db, mongo);

// app.use(function(req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });

// var storage = GridFsStorage({
//     gfs : gfs,
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
//     },
//     /** With gridfs we can store aditional meta-data along with the file */
//     metadata: function(req, file, cb) {
//         cb(null, { originalname: file.originalname });
//     },
//     root: 'ctFiles' //root name for collection to store files into
// });

// var upload = multer({ //multer settings for single upload
//     storage: storage
// }).single('file');

// console.log(storage);

app.listen(port, (err,res)=>{
    if (err){
        console.log("some error on listening");
    }else {
        console.log("listening on port "+ port);
    }
})
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended:true, limit:1024*1024*20}));
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));
app.use(logger('dev'));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(session( { 
//                     secret: 'mysecret',
//                     rolling: true,
//                     resave: true, 
//                     saveUninitialized: false
//                     }
//             )
//         );

require('./server/config/passport')(passport);
app.use('/api',api);
app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'))
});

// module.exports = app;
