import { User, IUser } from '../model/userModel';
import { Request, Response } from 'express';

export class UserController{

    public addNewUser (req: Request, res: Response) {                
            let newUser = new User(req.body);
            newUser.save().then(
                function(user:IUser){
                  res.json(user);
                }
            ).catch(function() {
                //console.log(err); 
            });
        }

}