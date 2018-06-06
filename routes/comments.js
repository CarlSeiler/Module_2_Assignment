// comments.js
// 2018-06-0
// Description: 
const myLogger = require('winston');

module.exports = {
  getComments(req, res, postStore) {
	// Get all comments for post specified by id
	let postId = req.params.id;
	try {
            if (postId > (postStore.posts.length - 1) || postId < 0) {
                throw "Id is out of range";
            }
        } catch (err) {
            myLogger.warn('404: Comments not retrieved. Id is out of range');
            return res.status(404).send({
                error: err
            });
            // this should end it
        }
    // There must be a more elegant way to do this:
    res.status(200).send(JSON.parse( '{ "comments":' + JSON.stringify(postStore.posts[postId].comments) + "}" ));
  }, 
  addComment(req, res) {
    
  },
  updateComment(req, res) {
    
  },
  removeComment(req, res) {
    
  }  
};
