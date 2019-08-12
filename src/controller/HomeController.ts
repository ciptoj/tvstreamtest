import { Request, Response } from 'express';

export class HomeController{
    public Index(req: Request, res: Response) {   
        //get watched before

        res.render('index.html');
    }
}