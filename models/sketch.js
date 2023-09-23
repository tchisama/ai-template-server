const mongoose = require("mongoose");

const sketchSchema = new mongoose.Schema({
    name:String,
    data:String,
    image:String,
    description:String,
    owner:String,
}
,
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)


module.exports = mongoose.model("Sketch",sketchSchema)