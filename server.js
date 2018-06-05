const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const myLogger = require('winston');
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
// TODO: Not sure about this:
store.posts.comments = [];
let newPost = { "name": "Top 10 ES6 Features Every Web Developer Must Know",
	"url": "https://www.example.com/es6",
	"text": "This essay blah blah blah",
	"comments": [] };
let newComment = { "text": "This is the comment" };

store.posts.push(newPost);
store.posts.comments[(store.posts.length - 1)] = 

app.get('/posts', (req, res) => {
	posts.getPosts(req, res); 
	res.status(200).send();
	});

app.listen(portNumber);
myLogger.info(`Started listening on port ${portNumber}`); 

