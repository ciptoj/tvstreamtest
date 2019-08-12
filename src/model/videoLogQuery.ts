import { VideoLogs,IVideoLog } from '../model/videoLogs';
export interface IVideoLogQuery{
    getWathedVideosByUserID(userid:Number):Promise<IVideoLog[]>
}
export const VideLogQuery: IVideoLogQuery = {
    getWathedVideosByUserID : function(userid:Number):Promise<IVideoLog[]> {
    return new Promise((resolve, reject) => {
        VideoLogs.find({userid:userid})
        .sort({accessedDateTime:-1})
        .select({videoid:1,accessedDateTime:1})
    });
 }
}