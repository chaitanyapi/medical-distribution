// var monk = require('monk');
// var multer = require('multer');
// var pathi='/Users/chaitanya/Documents/HeroApp/heroApp/uploads/';
// var upload = multer({dest: pathi});
// var GridFsStorage = require('multer-gridfs-storage');
// var mongo = require('mongodb');
// var db = monk('localhost:27017/meandb');
// var db = new mongo.Db('meandb', new mongo.Server(config.data_database));
// var gfs = Grid(db, mongo);

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Model = require('../models/model');
const config = require('../config/database')
mongoose.connect(config.data_database);

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var fs = require('fs');
var conn = mongoose.createConnection(config.data_database) //mongoose.connection;
var gfs = Grid(conn.db);
  
var ObjectId = require('mongodb').ObjectId; 



mongoose.connection.on('connected',()=>{
    console.log("succesfully connected to the database");
});
mongoose.Promise = global.Promise;



router.post('/register', (req, res, next)=>{
    let newUser = new Model.userSchema({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });


    Model.addUser(newUser, (err, user)=>{
        if(err){
            res.json({success:false , msg:"registration failed"});
        } else {
            res.json({success : true, msg:"registration success"});
        }
    });
});

router.post('/authenticate', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;
    Model.getUserByUsername(username, (err, user)=>{
        if(err) throw err;
        if (!user){
            return res.json({success: false, msg:"username not matched"})
        }
        Model.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn : 30000,
                    
                });
            res.json({
                success:true,
                token : 'JWT '+token,
                user : {
                    id : user._id,
                    name : user.name,
                    username : user.username,
                    email : user.email
                }
            });
            } else {
                return res.json({success:false , msg:"Password incorrect"});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session : false}) ,(req, res, next)=>{
res.json({user : req.user});
});

router.get("/showimage/:filename", function(req, res){
	gfs.files.find({"_id":ObjectId(req.params.filename)} ).toArray(function (err, files) {
 	    if(files.length===0){
			return res.status(400).send({
				message: 'File not found'
			});
         }
         data=[];
		var readstream = gfs.createReadStream({
			  filename: files[0].filename
        });

        readstream.on('data', function(chunk) {
            data.push(chunk);
	    });

        readstream.on('end', function() {
            data = Buffer.concat(data);
            let img = 'data:image/jpeg;base64,' + Buffer(data).toString('base64');
	        res.end(data);        
	    });
 
		readstream.on('error', function (err) {
		  console.log('An error occurred!', err);
		  throw err;
		});
	});
});

router.get('/', (req, res)=>{
    res.send("api works");
});

router.get('/videos', (req, res)=>{
    Model.vid.find({})
        .exec((err, output)=>{
            if(err){
                console.log("error in retreiving data from database");
            }else{
                res.send(output);
            }
        });
});

router.post('/videos',(req,res)=>{
    var obj ={
        title : req.body.title,
        url : req.body.url,
        description : req.body.description
    }
    Model.vid.create(obj, function(err, output){
        if(err){
            res.send(err);
        }else{
            res.json(output);
        }
    })
});

router.put('/videos/:id',(req,res)=>{
    Model.vid.findByIdAndUpdate(req.params.id,
    {
        $set:{title : req.body.title, url : req.body.url, description : req.body.description}
    },
    {
        new : true
    },
    (err, output)=>{
            if(err){
                res.send("error while updating the database")
            }else{
                res.json(output)
            }
        }
    );
});

router.get('/products', (req, res)=>{
    search = req.query.search;//(req.query.search) ? req.query.search : "kjfkwjgfwkcvwkcvwkhcvkwhvcwcw";
    searchBy = req.query.searchBy;
    query = {};
    query[searchBy]={ $regex: new RegExp(search), '$options' : 'i' };
    Model.product.find(query)
        .exec((err, output)=>{
        if(err){
            console.log("error in retreiving data from database");
        }else{
            res.send(output);
        }
    });
})

//getproductdetail/
router.get('/getcompanydetail/:name', (req, res)=>{
    // search = req.query.search;//(req.query.search) ? req.query.search : "kjfkwjgfwkcvwkcvwkhcvkwhvcwcw";
    // searchBy = req.query.searchBy;
    // query = {};
    // query[searchBy]={ $regex: new RegExp(search), '$options' : 'i' };
    Model.company.find({COMPANYNAME:req.params.name},{COMPANYCODE:1, _id:0})
        .exec((err, output)=>{
        if(err){
            res.send("error in retreiving data from database");
        }else{
            res.send(output[0]);
        }
    });
})

router.get('/getproductdetail/:name', (req, res)=>{
    // search = req.query.search;//(req.query.search) ? req.query.search : "kjfkwjgfwkcvwkcvwkhcvkwhvcwcw";
    // searchBy = req.query.searchBy;
    // query = {};
    // query[searchBy]={ $regex: new RegExp(search), '$options' : 'i' };
    

    Model.product.find({PRODUCTNAME:req.params.name},{PRODUCTCODE:1,PACK:1,SRATE:1,RATE:1,PRATE:1,MRP:1,TAX:1,BPAK:1, _id:0})
        .exec((err, output)=>{
        if(err){
            res.send("error in retreiving data from database");
        }else{
            res.send(output[0]);
        }
    });
})

router.get('/updateproduct/:id', (req, res)=>{
    // search = req.query.search;//(req.query.search) ? req.query.search : "kjfkwjgfwkcvwkcvwkhcvkwhvcwcw";
    // searchBy = req.query.searchBy;
    // query = {};
    // query[searchBy]={ $regex: new RegExp(search), '$options' : 'i' };
    Model.product.find({_id:ObjectId(req.params.id)})
        .exec((err, output)=>{
        if(err){
            res.send("error in retreiving data from database");
        }else{
            res.send(output[0]);
        }
    });
})

router.put('/updateproduct/:id',(req,res)=>{
    obj={};
    if(req.body.fileName){
        var writestream = gfs.createWriteStream({
            filename: req.body.fileName,
          });
          writestream.write(req.body.PRODPIC, ()=>{
            writestream.end();
          });     
        picId = writestream.id; 
        obj["PRODPIC"] = picId
    } else {
        picId='';
    }
    
    Object.keys(req.body).forEach(function (item) {
        if( (item != "PRODPIC") && (req.body[item] != 'undefined')){
            obj[item] = req.body[item]
        }
    });
    Model.product.findByIdAndUpdate({_id : ObjectId(req.params.id)}, obj, {new:true},function(err, output){
        if(err){
            res.send(err);
        }else{
            res.json(output);
        }
    });
});


router.post('/products',(req,res)=>{
    //need product code and product entry date 
    if(req.body.fileName){
        var writestream = gfs.createWriteStream({
            filename: req.body.fileName,
          });
    
          writestream.write(req.body.PRODPIC, ()=>{
            writestream.end();
          });     
        picId = writestream.id; 
    } else {
        picId='';
    }
    Model.prodseq.findOneAndUpdate({"seqOn" : "product"},{ $inc : { seq: 1 }} ,{new:true}, function(err, queryset){
        if(err){
            res.send(err);
        }else{
            var code = 'P' + req.body.COMPANYCODE + req.body.PRODUCTNAME.slice(0,4)+queryset.seq;
            var obj ={
                PRODPIC : picId,
                COMPANYCODE: req.body.COMPANYCODE,
                COMPANYNAME: req.body.COMPANYNAME,
                PRODUCTCODE: code,
                PRODUCTNAME: req.body.PRODUCTNAME,
                PRODPACK: req.body.PRODPACK,
                CQTY: req.body.CQTY,
                BPAK: req.body.BPAK,
                TAX: req.body.TAX,
                SRATE: req.body.SRATE,
                RATE: req.body.RATE,
                PRATE: req.body.PRATE,
                MRP: req.body.MRP,
                OFPN: req.body.OFPN,
                PEDT: req.body.PEDT
            }
            Model.product.create(obj, function(err, output){
                if(err){
                    res.send(err);
                }else{
                    res.json(output);
                }
            })
        }
});
});


router.get('/customers', (req, res)=>{
    search = req.query.search;//(req.query.search) ? req.query.search : "kjfkwjgfwkcvwkcvwkhcvkwhvcwcw";
    searchBy = req.query.searchBy;
    query = {};
    query[searchBy]={ $regex: new RegExp(search), '$options' : 'i' };
    Model.customer.find(query)
        .exec((err, output)=>{
        if(err){
            res.send("error in retreiving data from database");
        }else{
            res.send(output);
        }
    });
})

router.get('/updatecustomer/:id', (req, res)=>{
    // search = req.query.search;//(req.query.search) ? req.query.search : "kjfkwjgfwkcvwkcvwkhcvkwhvcwcw";
    // searchBy = req.query.searchBy;
    // query = {};
    // query[searchBy]={ $regex: new RegExp(search), '$options' : 'i' };
    Model.customer.find({_id:ObjectId(req.params.id)})
        .exec((err, output)=>{
        if(err){
            res.send("error in retreiving data from database");
        }else{
            res.send(output[0]);
        }
    });
})

router.put('/customers/:id',(req,res)=>{
        obj={};
        Object.keys(req.body).forEach(function (item) {
            if(req.body[item] != 'undefined'){
                obj[item] = req.body[item]
            }
        });
        Model.customer.findByIdAndUpdate({_id : ObjectId(req.params.id)}, obj, {new:true},function(err, output){
            if(err){
                res.send(err);
            }else{
                res.json(output);
            }
        });
 });

router.post('/customers',(req,res)=>{
   
    Model.custseq.findOneAndUpdate({"seqOn" : "customer"},{ $inc : { seq: 1 }} ,{new:true}, function(err, queryset){
        if(err){
            res.send(err);
        }else{
            var code = 'C' + queryset.seq;
                var obj ={
                    CUSTCODE: code,
                    CUSTNAME: req.body.CUSTNAME,
                    CUSTADD: req.body.CUSTADD,
                    CUSTCONT1: req.body.CUSTCONT1,
                    CUSTCONT2 : req.body.CUSTCONT2,
                    APGSTNO: req.body.APGSTNO,
                    CSTNO: req.body.CSTNO,
                    CNAME: req.body.CNAME,
                    LFNO: req.body.LFNO,
                    DIST: req.body.DIST,
                    REP: req.body.REP,
                    ROUT: req.body.ROUT,
                    RTNAME: req.body.RTNAME,
                    CARRIER: req.body.CARRIER,
                    STATION: req.body.STATION,
                    LIMIT: req.body.LIMIT
                }
                Model.customer.create(obj, function(err, output){
                    if(err){
                        res.send(err);
                    }else{
                        res.json(output);
                    }
                });
            }
        });
});





router.get('/company', (req, res)=>{
    search = req.query.search;//(req.query.search) ? req.query.search : "kjfkwjgfwkcvwkcvwkhcvkwhvcwcw";
    searchBy = req.query.searchBy;
    query = {};
    query[searchBy]={ $regex: new RegExp(search), '$options' : 'i' };
    Model.company.find(query)
        .exec((err, output)=>{
        if(err){
            res.send("error in retreiving data from database");
        }else{
            res.send(output);
        }
    });
});

router.get('/updatecompany/:id', (req, res)=>{
    // search = req.query.search;//(req.query.search) ? req.query.search : "kjfkwjgfwkcvwkcvwkhcvkwhvcwcw";
    // searchBy = req.query.searchBy;
    // query = {};
    // query[searchBy]={ $regex: new RegExp(search), '$options' : 'i' };
    Model.company.find({_id:ObjectId(req.params.id)})
        .exec((err, output)=>{
        if(err){
            res.send("error in retreiving data from database");
        }else{
            res.send(output[0]);
        }
    });
});

router.put('/updatecompany/:id',(req,res)=>{
        obj={};
        Object.keys(req.body).forEach(function (item) {
            if(req.body[item] != 'undefined'){
                obj[item] = req.body[item]
            }
        });
        Model.customer.findByIdAndUpdate({_id : ObjectId(req.params.id)}, obj, {new:true},function(err, output){
            if(err){
                res.send(err);
            }else{
                res.json(output);
            }
        });
 });

router.post('/company',(req,res)=>{
    
// Need to add this only if company picture need to be stored.
//**************** */
// var writestream = gfs.createWriteStream({
//     filename: req.body.fileName,
//   });

//   writestream.write(req.body.PRODPIC, ()=>{
//     writestream.end();
//   });      
Model.suppseq.findOneAndUpdate({"seqOn" : "company"},{ $inc : { seq: 1 }} ,{new:true}, function(err, queryset){
    if(err){
        res.send(err);
    }else{
        var code = 'S' + req.body.COMPANYTYPE.slice(0,1) + queryset.seq;
        var obj ={
            // PRODPIC : writestream.id,
            COMPANYCODE : code,//req.body.COMPCODE,
            COMPANYTYPE : req.body.COMPANYTYPE,
            COMPANYNAME : req.body.COMPANYNAME,
            COMPANYADD : req.body.COMPANYADD,
            COMPANYPHONE : req.body.COMPANYPHONE,
            PRIMARYCONTACTNAME : req.body.PRIMARYCONTACTNAME,
            PRIMARYCONTACTNUMBER : req.body.PRIMARYCONTACTNUMBER,
            SECONDARYCONTACTNAME : req.body.SECONDARYCONTACTNAME,
            SECONDARYCONTACTNUMBER : req.body.SECONDARYCONTACTNUMBER,
            ACCOUNTANTCONTACTNAME : req.body.ACCOUNTANTCONTACTNAME,
            ACCOUNTANTCONTACTNUMBER : req.body.ACCOUNTANTCONTACTNUMBER,
            GSTNO : req.body.GSTNO,
            COMPDLNO1 : req.body.COMPDLNO1,
            COMPDLNO2 : req.body.COMPDLNO2,
            LFNO : req.body.LFNO
        }
Model.company.create(obj, function(err, output){
    if(err){
        res.send(err);
    }else{
        res.json(output);
    }
});
    }});
});

//This dropdownList url is used for getting the typeahead values while searching for companies and products
router.get('/dropdownList', (req,res)=>{
    text = req.query.text;
    searchOn = req.query.field;
    tab=req.query.tableName;
    query = {};
    array=[];
    noData=[];
    tabName = mongoose.model(tab);
    query[searchOn]={ $regex: new RegExp(text), '$options' : 'i' };
    tabName.find(query,function(err, output){
        if(output.length){ 
            for(var item of output){
                array.push(item[searchOn])
            }
            res.send(array);
        }
        else {
            res.send(noData);
        }


    });
})

router.delete('/deletedocument/:id', (req,res)=>{
    tabName = mongoose.model(req.query.table_name);
    tabName.findByIdAndRemove(req.params.id, (err, output)=>{
        if(err){
            res.send("File not found to delete");
        }else{
            res.send(output);
        }
    })

})

//purchaseinvoice
router.post('/insertpurchaseinvoice', (req,res)=>{
    Model.piseq.findOneAndUpdate({"seqOn" : "referenceInvoice"},{ $inc : { seq: 1 }} ,{new:true}, function(err, queryset){
        if(err){
            res.send(err);
        }else{
            obj=req.body;
            obj["REFINVOICENUMBER"] = queryset.seq;
                Model.purchaseinvoice.create(obj, function(err, output){
                    if(err){
                        res.send(err);
                    }else{
                        res.json(output);
                    }
                });
            }
        });

});

router.put('/updatepurchaseinvoice', (req, res)=>{
    Model.purchaseinvoice.update({"REFINVOICENUMBER":req.query.INV}, req.body, (err, output)=>{
        if(err){
            res.send(err);
        }else{
            res.json(output);
        }
    })
})

router.put('/updategenerateinvoice/:INV', (req,res)=>{
    invoicenumber=req.params.INV;
    Model.purchaseinvoice.find({"REFINVOICENUMBER":invoicenumber}, (err, row)=>{
        arr=[];
        date = new Date();
        day=date.getDay();
        month=date.getMonth();
        year=date.getFullYear();
        hour=date.getHours();
        minute=date.getMinutes();
        second=date.getSeconds();
        row[0]["DETAILS"].forEach(function(itm){
            testobj={};
            testobj["COMPANYCODE"]=row[0]["COMPANYCODE"];
            testobj["COMPANYNAME"]=row[0]["COMPANYNAME"];
            testobj["ROWCREATEDDATE"]= day+'/'+month+'/'+year+' '+hour+'-'+minute+'-'+second;// this should be the system date while entering the stock.
            testobj["REFINVOICENUMBER"]=row[0]["REFINVOICENUMBER"];
            testobj["INVOICENUMBER"]=row[0]["INVOICENUMBER"];
            testobj["INVOICEDATE"]=row[0]["INVOICEDATE"];
            testobj["PRODUCTCODE"] = itm["PRODUCTCODE"];
            testobj["EXPIRYDATE"] = itm["EXPIRYDATE"];
            testobj["BATCHNUMBER"] = itm["BATCHNUMBER"];
            testobj["SRATE"] = itm["SRATE"];
            testobj["MRP"] = itm["MRP"];
            testobj["PRATE"] = itm["PRATE"];
            testobj["RATE"] = itm["RATE"];
            testobj["RECEIPT"] = itm["RECEIPT"];
            testobj["PRODUCTOPEN"] = '';
            testobj["PRODUCTCLOSE"] = '';
            testobj["RETURNGOODS"] = '';
            testobj["SUPPLIEDCOUNT"] = '';
            testobj["MANUFACTURER"] = itm["MANUFACTURER"];
            testobj["PCN"] = itm["PCN"];
            testobj["REMARKS"] = '';
            testobj["OFPN"] = itm["OFPN"];
            testobj["DISCOUNT"] = itm["DISCOUNT"];
            testobj["NRATE"] = itm["NRATE"];
            arr.push(testobj);
        });
        
        Model.stock.insertMany(arr, (err,out)=>{
            if(err){
                res.send(err);
            }else{
                Model.purchaseinvoice.update({"REFINVOICENUMBER":invoicenumber},{$set : {"GENERATEDINVOICE":"YES", "UPDATING":"NO"}}, (err,output)=>{
                    if(err){
                        res.send(err);
                    }else{
                        res.json(output);
                    }
                })
            }
        })        
    })    
})

router.get('/pendingPI', (req,res)=>{
    Model.purchaseinvoice.find({"GENERATEDINVOICE":"NO"}, (err,output)=>{
        if(err){
            res.send(err);
        }else{
            res.json(output);
        }
    })
})


router.get('/getpurchaseinvoice/:INV', (req,res)=>{
    Model.purchaseinvoice.find({"REFINVOICENUMBER":req.params.INV}, (err, output)=>{
        if(err){
            res.send("No record found with this Reference Invoice");
        }else{
            res.json(output);
        }
    })
})

router.get('/findpicombination', (req, res)=>{
    Model.purchaseinvoice.find({"COMPANYNAME":req.query.compname},{INVOICENUMBER:1,_id:0}, (err, data)=>{
        if(err){
            res.send(err);
        }else{
            msg="found another name";
            nomatch="no match";
            for(item of data){
                if(req.query.invnum === item["INVOICENUMBER"].toUpperCase()){
                    return res.json({msg:msg});
               }
            }
             res.json({nomatch:nomatch});
        }
    })
})
module.exports = router;