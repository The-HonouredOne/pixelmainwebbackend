const mongoose = require('mongoose');
const industrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    // title: { type: String, required: true },
    // category: { type: String, required: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    description: { type: String, required: true }
},{timestamps:true});

module.exports=mongoose.model('industry', industrySchema)
