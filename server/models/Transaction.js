import {Schema ,model} from "mongoose";

const transactionSchema=new Schema({
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        Default:"Others"
    },
    type:{
        type:Number,
        enum:["debit","credit"]
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})