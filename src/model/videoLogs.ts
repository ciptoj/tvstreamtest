//   /model/videoLogs.ts
import { Document,Schema, Model, model} from "mongoose";

export interface IVideoLog{
    videoid:Number,
    accessedDateTime:Date,
    userid:Number,
}
export interface IVideoLogModel extends IVideoLog, Document{
    getWathedVideosByUserID(userid:Number):Promise<IVideoLog>
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
//additional methods
VideoLogSchema.methods.getWathedVideosByUserID = function(userid:Number):Promise<IVideoLog> {
    return new Promise((resolve, reject) => {
        this.find({userid:userid})
        .sort({accessedDateTime:-1})
        .select({videoid:1,accessedDateTime:1})
        .then((response:IVideoLog) => {
            resolve(response);
        })
        .catch((error:any) => reject(error));
    });
};
export const VideoLogs: Model<IVideoLogModel> = model<IVideoLogModel>("VideoLogs",VideoLogSchema);
