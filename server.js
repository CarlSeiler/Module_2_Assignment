const fs = require('fs');
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
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(errorHander());

let store = {};
store.posts = [];

// Posts
app.get('/posts', (req, res) => {
    posts.getPosts(req, res, store);
});

app.post('/posts', (req, res) => {
    posts.addPost(req, res, store);
});

app.put('/posts/:id', (req, res) => {
    posts.updatePost(req, res, store);
});

app.delete('/posts/:id', (req, res) => {
    posts.removePost(req, res, store);
});

// Comments
app.get('/posts/:id/comments', (req, res) => {
    comments.getComments(req, res, store);
});

app.post('/posts/:id/comments', (req, res) => {
    comments.addComment(req, res, store);
});

app.listen(portNumber);
myLogger.info(`Started listening on port ${portNumber}`);
