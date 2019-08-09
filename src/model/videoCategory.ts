//   /model/videoCategory.ts
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const VideoCategoryModel = new Schema({
    id: {
        type: Number,
        required: 'Enter id'
    },
    name: {
        type: String,
        required: 'Enter name'
    }
});