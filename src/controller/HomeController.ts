import { Request, Response } from 'express';

export class HomeController{
    public Index(req: Request, res: Response) {   
        res.render('index.html');
    }
}