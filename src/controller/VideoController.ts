import { Request, Response } from 'express';
import {VideLogQuery} from '../model/videoLogQuery'
import { IVideoLog } from '../model/videoLogs';
export class VideoController{
    public GetWatchedBefore(req: Request, res: Response) {  
        VideLogQuery.getWathedVideosByUserID(req.session.user.userid)
        .then(function (videoLogs:IVideoLog[]) {
            res.json(videoLogs);
        })
        .catch(function(reason:any){
            console.log(reason);
        });
    }
}