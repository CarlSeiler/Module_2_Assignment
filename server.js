const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const myLogger = require('winston'); // An extra logger
const errorHander = require('errorhandler');
const routes = require('./routes');

const portNumber = 3000;

const app = express();

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
app.get('/posts', routes.posts_.getPosts);
app.post('/posts', routes.posts_.addPost);
app.put('/posts/:id', routes.posts_.updatePost);
app.delete('/posts/:id', routes.posts_.removePost);

// Comments
app.get('/posts/:id/comments', routes.comments_.getComments);
app.post('/posts/:id/comments', routes.comments_.addComment);
app.put ('/posts/:postID/comments/:commentID', routes.comments_.updateComment);
app.delete ('/posts/:postID/comments/:commentID', routes.comments_.removeComment);

app.listen(portNumber);
myLogger.info(`Started listening on port ${portNumber}`);
