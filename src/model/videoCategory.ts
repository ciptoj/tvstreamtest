//   /model/videoCategory.ts
import { Document,Schema, Model, model} from "mongoose";

export interface IVideoCategory extends Document{
    id:Number,
    name:String
}
export const VideoCategorySchema = new Schema({
    id: {
        type: Number,
        required: 'Enter id'
    },
    name: {
        type: String,
        required: 'Enter name'
    }
});
export const VideoCategory: Model<IVideoCategory> = model<IVideoCategory>("VideoCategory",VideoCategorySchema);
