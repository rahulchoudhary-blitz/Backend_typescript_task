import {model, Schema, Document } from 'mongoose';

import  { compareAsc, format } from 'date-fns';
import { Task } from '../interfaces/bills.interface';

const billSchema: Schema = new Schema({
    lable:{
        type: String,
        required: true
    },
    amount:{
        type:Number,
        require: true
    },
    createdAt:{
     type:String,
     default: format(Date.now(), 'yyyy-MM-dd')
    },
    history: [
        {
            type: Object
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false
    },
});


const billModel = model<Task & Document>('Bill', billSchema);

export default billModel;