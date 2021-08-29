import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: String,
    authorId: {
        type: String,
        required: true
    },
    comments: [{
        author: {
            type: String,
            required: true
        },
        authorId: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }],
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);
export default Post;