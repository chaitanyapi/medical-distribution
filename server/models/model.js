const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const url = 'mongodb://localhost:27017/meandb';
const config = require('../config/database');
// const connection = mongoose.createConnection(url);
//mongoose.connect(url); 
mongoose.connect(config.data_database,{useMongoClient: true});

var connection = mongoose.connection;
const Schema = mongoose.Schema;

const videoSchema = new mongoose.Schema({
    title  :{type:String},
    url : {type:String},
    description : {type:String}
},{collection : 'videos'},{versionkey : '_somethingElse'})


const company = new mongoose.Schema({
    COMPANYCODE : {type:String},
    COMPANYTYPE : {type:String},
    COMPANYNAME : {type:String},
    COMPANYADD : {type:String},
    COMPANYPHONE : {type:Number},
    PRIMARYCONTACTNAME : {type:String},
    PRIMARYCONTACTNUMBER : {type:Number},
    SECONDARYCONTACTNAME : {type:String},
    SECONDARYCONTACTNUMBER : {type:Number},
    ACCOUNTANTCONTACTNAME : {type:String},
    ACCOUNTANTCONTACTNUMBER : {type:Number},
    GSTNO : {type:String},
    COMPDLNO1 : {type:String},
    COMPDLNO2 : {type:String},
    LFNO : {type:String},
},{collection: 'company'}, {versionkey : '_somethingElse'})


const product = new mongoose.Schema({
    COMPANYCODE: {type:String},
    COMPANYNAME: {type:String},
    PRODUCTCODE: {type:String},
    PRODUCTNAME: {type:String},
    PRODPIC : {type:String},
    PRODPACK: {type:String},
    CQTY: {type:Number},
    BPAK: {type:String},
    TAX: {type:Number},
    SRATE: {type:Number},
    RATE: {type:Number},
    PRATE: {type:Number},
    MRP: {type:Number},
    OFPN: {type:Number},
    PEDT: {type:Date}
},{collection: 'product'}, {versionkey : '_somethingElse'})


const customer = new mongoose.Schema({
    CUSTCODE: {type:String},
    CUSTNAME: {type:String},
    CUSTADD: {type:String},
    CUSTCONT1: {type:Number},
    CUSTCONT2: {type:Number},
    APGSTNO: {type:String},
    GST: {type:String},
    CITY: {type: String},
    LFNO: {type:String},
    DIST: {type:String},
    REP: {type:String},
    RTNAME: {type:String},
    CARRIER: {type:String},
    STATION: {type:String}
},{collection: 'customer'}, {versionkey : '_somethingElse'})

var purchaseinvoice = new mongoose.Schema({
    COMPANYCODE: {type:String},
    COMPANYNAME: {type:String},
    PI_RECEIPTDATE : {type: Date}, //this should be the system date when the receipt is generated
    PI_GENERATEDBY : {type:String}, //this is the name of person who added this entry
    INVOICEDATE : {type: String},
    DEBITNOTE: {type:Number},
    CREDITNOTE: {type:Number},
    INVOICENUMBER : {type:String},
    REFINVOICENUMBER : {type:Number},
    GENERATEDINVOICE : {type:String},
    UPDATING : {type:String}, // this is to tell if anyone is updating the record.
    DISCOUNT: {type:Number},
    INVVALUE: {type:Number},
    TAXVALUE: {type:Number},
    OFFERVAL: {type:Number},
    NETAMT: {type:Number},
    DETAILS : [{
        PRODUCTCODE: {type:String},
        PRODUCTNAME: {type:String},
        PRODPACK: {type:Number},
        BATCHNUMBER: {type:String},
        SRATE: {type:Number},
        RATE: {type:Number},
        RECEIPT: {type:Number},
        FREE: {type:Number},
        PRATE: {type:Number},
        MRP: {type:Number},
        EXPIRYDATE: {type:String},        
        NOTE: {type:String},
        PCN: {type:Number},
        MANUFACTURER: {type:String},
        BPAK: {type:Number},
        OFPN: {type:Number},
        OFPNREMARKS:{type:String},
        NRATE: {type:Number},
        TAX: {type:Number},
        DISCOUNT: {type:Number},
        DISCOUNTVALUE: {type:Number},
        NET: {type:Number},
        P_RECEIPTDATE : {type:Date}, //this should be the system date when the receipt is generated
        P_GENERATEDBY : {type:String} //this is the name of person who added this entry
    }]
},{collection: 'purchaseinvoice'}, {versionkey : '_somethingElse'});

const stock = new mongoose.Schema({
    COMPANYCODE: {type:String},
    COMPANYNAME: {type:String},
    ROWCREATEDDATE: {type:String},
    REFINVOICENUMBER: {type:Number},
    INVOICENUMBER: {type:String},
    INVOICEDATE: {type:String},
    
    PRODUCTCODE: {type:String},
    EXPIRYDATE: {type:String},
    BATCHNUMBER: {type:String},
    SRATE: {type:Number},
    MRP: {type:Number},
    PRATE: {type:Number},
    RATE: {type:Number},
    RECEIPT: {type:Number},
    PRODUCTOPEN: {type:Number},
    PRODUCTCLOSE: {type:Number},
    RETURNGOODS: {type:Number},
    SUPPLIEDCOUNT: {type:Number},
    MANUFACTURER: {type:String},
    PCN: {type:Number},
    REMARKS: {type:String},
    OFPN: {type:Number},
    DISCOUNT: {type:Number},
    NRATE: {type:Number}
},{collection: 'stock'}, {versionkey : '_somethingElse'});

const inv = new mongoose.Schema({
    INV	: {type:String},
    TERM	: {type:String},
    BILLDT	: {type:Date},
    CUSTCODE	: {type:String},
    PRODCODE	: {type:String},
    MFR	: {type:String},
    PRDN	: {type:String},
    BAT	: {type:String},
    PACK	: {type:String},
    RT	: {type:String},
    SRATE	: {type:Number},
    PRATE	: {type:Number},
    RATE	: {type:Number},
    MRP	: {type:Number},
    RN	: {type:Number},
    RNMT	: {type:Number},
    QTY	: {type:Number},
    DISC	: {type:Number},
    FREE	: {type:Number},
    REPC	: {type:Number},
    TAD	: {type:Number},
    NET	: {type:Number},
    CNAME	: {type:String},
    ADD1	: {type:String},
    ADD2	: {type:String},
    DL1	: {type:String},
    DL2	: {type:String},
    APG	: {type:String},
    TNAME	: {type:String},
    CODE	: {type:String},
    DIST	: {type:String},
    DP	: {type:Number},
    CRAMT	: {type:Number},
    DRAMT	: {type:Number},
    CRN	: {type:String},
    DRN	: {type:String},
    CHKFLD	: {type:String},
    EXP_DT	: {type:Date},
    MES	: {type:String},
    SMAN	: {type:String},
    SMD	: {type:String},
    DCNO	: {type:String},
    TAX	: {type:Number},
    TAMT	: {type:Number},
    PFN	: {type:Number},
    PFMT	: {type:Number},
    PC	: {type:Number},
    LBAL	: {type:Number},
    LPDT	: {type:Date},
    TRPN	: {type:String},
    CHKNO	: {type:String},
    CHKDT	: {type:Date},
    BANK	: {type:String},
    DOCM	: {type:String},
    WBLN	: {type:String},
    ORDT	: {type:Date}
},{collection: 'inv'}, {versionkey : '_somethingElse'})

const userSchema = new mongoose.Schema({
    name : {type:String},
    username : {type:String, required:true},
    email : {type:String},
    password : {type:String, required:true}
},{collection: 'userschema'}, {versionkey : '_somethingElse'});

const USerSchema =  connection.model('userschema', userSchema);


var suppSeq = new mongoose.Schema({
    seqOn : {type:String},
	seq : {type:Number}
},{collection:'suppseq'},{versionkey : '_somethingElse'});

var piseq = new mongoose.Schema({
    seqOn : {type:String},
	seq : {type:Number}
},{collection:'piseq'},{versionkey : '_somethingElse'});

var prodSeq = new mongoose.Schema({
    seqOn : {type:String},
	seq : {type:Number}
},{collection:'prodseq'},{versionkey : '_somethingElse'});

var custSeq = new mongoose.Schema({
    seqOn : {type:String},
	seq : {type:Number}
},{collection:'custseq'},{versionkey : '_somethingElse'});

module.exports={
    vid:connection.model('videos',videoSchema),
    company : connection.model('company', company),
    customer : connection.model('customer', customer),
    product : connection.model('product', product),
    purchaseinvoice : connection.model('purchaseinvoice', purchaseinvoice),
    stock : connection.model('stock', stock),
    inv : connection.model('inv', inv),
    userSchema : connection.model('userschema', userSchema),
    suppseq : connection.model('suppseq', suppSeq),
    piseq : connection.model('piseq', piseq),
    prodseq : connection.model('prodseq', prodSeq),
    custseq : connection.model('custseq', custSeq)
}  


module.exports.getUserById = (id, callback)=>{
                            USerSchema.findById(id, callback);
                            };

module.exports.getUserByUsername = (username, callback)=>{
    USerSchema.findOne({username : username}, callback);
                                    }

module.exports.addUser = (newUser , callback)=>{
                            bcrypt.genSalt(10, (err , salt)=>{
                                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                                    if(err) throw err;
                                    newUser.password = hash;
                                    newUser.save(callback);
                                });
                            });
                        }

module.exports.comparePassword = function(candidatePassword, hash, callback){
                                    bcrypt.compare(candidatePassword, hash,(err, isMatch)=>{
                                        if(err) throw err;
                                        callback(null, isMatch);
                                    });
                                }

                             