//   /model/videoRating.ts
import { Document,Schema, Model, model} from "mongoose";
export interface IVideoRating extends Document{
    videoid:Number,
    rate:Number,
    userid:Number
}
export const VideoRatingSchema = new Schema({
    videoid: {
        type: Number,
        required: 'Enter video id'
    },
    rate: {
        type: Number,
        required: 'Enter rating'


    },
    userid: {
        type: Number,
        required: 'Enter user id'
    },
});
export const VideoRating: Model<IVideoRating> = model<IVideoRating>("VideoRating",VideoRatingSchema);
