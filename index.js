const express = require('express')
const cors = require("cors");
const mongoose = require("mongoose")
const pino = require('pino-http')()
const { Post } = require("./posts.model");

const app = express()
app.use(pino)
app.use(cors())
app.use(express.json());

const port = 3001

app.get('/', (req, res) => {
    res.send(`Node API v1 is listening on ${port}`)
})

app.get(`/api/posts`, async (request, response) => {
    const allPosts = await Post.find();
    return response.status(200).send({ data: allPosts })
})

app.post(`/api/post`, async (req, res) => {
    const newPost = new Post({ ...req.body });
    const insertedPost = await newPost.save();
    return res.status(201).json(insertedPost);
})


const start = async () => {
    try {
        await mongoose.connect(
            ""
        );
        app.listen(port, () => {
            console.log(`Node API is listening on ${port}`)
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();