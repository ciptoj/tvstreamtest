//   /model/video.ts
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const VideoModel = new Schema({
    id: {
        type: Number,
        required: 'Enter video id'
    },
    type: {
        type: String,
        required: 'Enter a video type'
    },
    length: {
        type: String,
        required: 'Enter a video length'
    },
    name: {
        type: String,
        required: 'Enter video name'
    },
    uploadedDateTime: {
        type: Date,
        required: 'Enter uploaded date time'
    },
    videoCategoryID: {
        type: Number,
        required: 'Enter video category ID'
    },
    numberOfWatch:{
        type: Number
    }
});