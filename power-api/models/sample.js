const mongoose = require('mongoose'); //imported mongoose package

const sampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //random generated id which is long string (this method is given by mongoose)
    Vrms_AN_avg: {type : Number, required : true},
    Vrms_BN_avg: {type : Number, required : true},
    Vrms_CN_avg: {type : Number, required : true},
    Irms_A_avg: {type : Number, required : true},
    Irms_B_avg: {type : Number, required : true},
    Irms_C_avg: {type : Number, required : true},
    Irms_N_avg: {type : Number, required : true},
    Frequency_avg: {type : Number, required : true},
    ApparentEnergy_Total_avg: {type : Number, required : true},
    NonActiveEnergy_Total_avg: {type : Number, required : true},
    Vrms_Effective_avg: {type : Number, required : true},
    Irms_Effective_avg: {type : Number, required : true}
});

module.exports = mongoose.model('sample',sampleSchema); 











