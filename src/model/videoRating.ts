//   /model/videoRating.ts
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const VideoRatingModel = new Schema({
    videoid: {
        type: Number,
        required: 'Enter video id'
    },
    rate: {
        type: Number,
        required: 'Enter rating'

    },
    userid: {
        type: Number,
        required: 'Enter user id'
    },
});