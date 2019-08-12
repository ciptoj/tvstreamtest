import { Request, Response } from 'express';
import { VideoLogs,IVideoLog } from '../model/videoLogs';
export class VideoController{
    public GetWatchedBefore(req: Request, res: Response) {  
        VideoLogs.find({userid:req.session.user.userid})
        .sort({accessedDateTime:-1})
        .select({videoid:1,accessedDateTime:1})
        .exec(function (err, videoLogs) {
            if (err) {
                console.log('error retrieving videos '+err);
            }
            res.json(videoLogs);
          });
    }
}