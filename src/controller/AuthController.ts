import { Request, Response } from 'express';
import { User, IUser } from '../model/userModel';
import { UserSession } from '../types/UserSession';
export class AuthController{
    public Login(req: Request, res: Response) {   
       res.render('login');
    }
    public LoginPost(req:Request, res: Response){
        var post = req.body;
        var user = User.findOne({'name':post.username},'id password')
        .then((targetUser:IUser)=>{
            if(user!=null){
                if (post.password === targetUser.password) {
                    req.session.user = new UserSession();
                    req.session.user.userid = targetUser.id;
                    res.redirect('/');
                }else{
                    res.send('invalid username/password');
                }
            } else {
                    res.send('login error');
            }
        });
    }
    public Logout(req: Request, res: Response) {   
        req.session.destroy(function(err) {
            res.redirect('/login');
         });
    }
}