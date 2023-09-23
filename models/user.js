const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    photoProfile:String,
    user_id:String
}
,
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)


module.exports = mongoose.model("User",userSchema)