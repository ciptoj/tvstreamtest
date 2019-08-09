//   /model/videoLogs.ts
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const VideoLogsModel = new Schema({
    videoid: {
        type: Number,
        required: 'Enter video id'
    },
    accessedDateTime: {
        type: Date,
        required: 'Enter accessed datetime',

    },
    userid: {
        type: Number,
        required: 'Enter user id'
    },
});