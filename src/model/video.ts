//   /model/video.ts
import { Document,Schema, Model, model} from "mongoose";

export interface IVideo extends Document{
    id:Number,
    type:String,
    length:String,
    name:String,
    uploadedDateTime:Date,
    videoCategoryID:Number,
    numberOfWatch:Number
}



export const VideoSchema = new Schema({
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
export const Video: Model<IVideo> = model<IVideo>("Video",VideoSchema);
