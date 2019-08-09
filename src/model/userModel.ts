//   /model/user.ts
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserModel = new Schema({
    id: {
        type: Number,
        required: 'Enter id'
    },
    name: {
        type: String,
        required: 'Enter a user name'
    }
});