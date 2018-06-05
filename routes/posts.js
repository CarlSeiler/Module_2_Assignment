// posts.js
// 2018-06-04
// Description:
const myLogger = require('winston');

module.exports = {
  getPosts(req, res) {
	myLogger.info ('getPosts route requested');
	},
  addPost(req, res) {
	myLogger.info ('addPosts route requested');
  },
  updatePost(req, res) {
	  myLogger.info ('updatePosts route requested');

  },
  removePost(req, res) {
	myLogger.info ('removePost route requested');
  }
};
