//   /model/videoLogs.ts
import { Document,Schema, Model, model} from "mongoose";

export interface IVideoLog extends Document{
    videoid:Number,
    accessedDateTime:Date,
    userid:Number,
}

export const VideoLogSchema = new Schema({
    videoid: {
        type: Number,
        required: 'Enter video id'
    },
    accessedDateTime: {
        type: Date,
        required: 'Enter accessed datetime',

    },
    userid: {
        type: Number,
        required: 'Enter user id'
    }
});
export const VideoLogs: Model<IVideoLog> = model<IVideoLog>("VideoLogs",VideoLogSchema);
