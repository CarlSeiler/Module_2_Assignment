const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const myLogger = require('winston'); // An extra logger
const errorHander = require('errorhandler');
const routes = require('./routes');

const portNumber = 3000;

const app = express();
const posts = routes.posts_;
const comments = routes.comments_;

//Middleware
let store = {};
store.posts = [];

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(errorHander());
app.use((req, res, next) => {
    req.store = store;
    next();
});

// Posts
app.get('/posts', (req, res) => {
    posts.getPosts(req, res);
});

app.post('/posts', (req, res) => {
    posts.addPost(req, res);
});

app.put('/posts/:id', (req, res) => {
    posts.updatePost(req, res);
});

app.delete('/posts/:id', (req, res) => {
    posts.removePost(req, res);
});

// Comments
app.get('/posts/:id/comments', (req, res) => {
    comments.getComments(req, res);
});

app.post('/posts/:id/comments', (req, res) => {
    comments.addComment(req, res);
});

app.put ('/posts/:postID/comments/:commentID', (req,res) => {
    comments.updateComment(req, res);
});

app.delete ('/posts/:postID/comments/:commentID', (req,res) => {
    comments.updateComment(req, res);
});

app.listen(portNumber);
myLogger.info(`Started listening on port ${portNumber}`);
