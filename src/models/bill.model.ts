import {model, Schema, Document, Mongoose } from 'mongoose';
import { nanoid } from 'nanoid'
// import  { compareAsc, format } from 'date-fns';
import { Task } from '../interfaces/controller.interface';

// const id = nanoid();
const billSchema : Schema = new Schema({
    lable :{
        type : String,
        required : true
    },
    amount :{
        type : Number,
        require : true
    },
    short_id :{
        type : String
        // default: id
    },
    is_active :{
        type : Boolean,
        default : true
    },
},
{timestamps : true}
);

// billSchema.pre('save', function (next) {
//      const new_id: string  = nanoid(5)
//     this.short_id = new_id;
//     return  next()
// });

const billModel = model<Task & Document>('Bill', billSchema);

export default billModel;