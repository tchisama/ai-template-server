const mongoose = rquire("mongoose");

const sketchSchema = new mongoose.Schema({
    name:String,
    data:String,
    image:String,
    description:String,
    owner:String,
},{
    timestamp:{
        createdAt:'createdAt',
        updatedAt:false,
    }
})