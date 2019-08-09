import * as mongoose from 'mongoose';
import { UserModel } from '../model/userModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserModel);
export class UserController{

    public addNewUser (req: Request, res: Response) {                
            let newUser = new User(req.body);
            newUser.save().then(
                function(doc){
                  res.json(doc);
                }
            ).catch(function(err) {
                console.log(err); 
            });
        }

}