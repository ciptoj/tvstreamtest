//   /model/user.ts
import { Document,Schema, Model, model} from "mongoose";

export interface IUser extends Document{
    id:Number,
    name:String,
    password:String
}
export const UserSchema: Schema = new Schema({
    id: {
        type: Number,
        required: 'Enter id'
    },
    name: {
        type: String,
        required: 'Enter a user name'
    },
    password: {
        type: String,
        required: 'Enter a password'
    }
});
export const User: Model<IUser> = model<IUser>("User",UserSchema);