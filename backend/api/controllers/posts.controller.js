import mongoose from 'mongoose';

import Post from "../../models/post.js";

const get_posts = async (req,res) => {
    const { page } = req.query;
    const limit = 10;
    const start = (Number(page) - 1) * limit;

    try {
        const totalPosts = await Post.countDocuments();
        const posts = await Post.find().sort({updatedAt: -1}).limit(limit).skip(start);
        res.json({data: posts, page: page, totalPages: Math.ceil(totalPosts / limit)});
    } catch(err) {
        res.status(404).json({ message: err.message});
    }
};

const new_post = (req,res) => {
    const post = new Post(req.body);

    post.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(409).json({message: err.message});
        })
};

const post_details = (req,res) => {
    Post.findById(req.params.id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({message: err.message});
        })
};

const edit_post = (req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send(`No post with id: ${req.params.id}`);

    Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(result => {
            res.status(200).json(req.body);
        })
        .catch(err => {
            res.status(409).json({message: err.message});
        })
};


const delete_post = (req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send(`No post with id: ${req.params.id}`);

    Post.findByIdAndDelete(req.params.id)
        .then(result => {   //or status 204 maybe
            res.status(204).json({
                message: "Deleted successfully."
            });
        })
        .catch(err => {
            res.status(409).json({message: err.message});
        })
};


const add_comment = async (req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send(`No post with id: ${req.params.id}`);

    const post = await Post.findById(req.params.id);
    post.comments.push(req.body);

    try {
        const updated = await Post.findByIdAndUpdate(req.params.id,post,{new: true});
        res.status(201).json(updated);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
};

const delete_comment = async (req,res) => {
    const pid = req.query.pid;
    if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(404).send(`No post with id: ${pid}`);
    const cid = req.query.cid;

    const post = await Post.findById(pid);

    let comments = post.comments;
    const index = comments.findIndex(x => x._id == cid);    //delete comment with request id from array of comments
    if (index > -1) {
    comments.splice(index, 1);
    } else {
        res.status(404).json({message: "Comment not found."});
    }

    post.comments = comments;   //set post comments as new comments

    try {
        //const updated = await Post.updateOne({_id: pid}, {$pull: {'comments': {_id: cid} }}, {new: true});
        const updated = await Post.findByIdAndUpdate(pid,post,{new: true});
        res.status(200).json(updated);  //status 200 so content is returned
        //res.status(204).json(updated);
    } catch(err) {
        res.status(409).json({message: err.message});
    }
};

export default {
    get_posts,
    new_post,
    post_details,
    edit_post,
    delete_post,
    add_comment,
    delete_comment
};