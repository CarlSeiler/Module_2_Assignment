// comments.js
// 2018-06-07
// CRUD functions for comments
const myLogger = require('winston');

module.exports = {
    getComments(req, res) {
        // Get all comments for post specified by id
        let postId = req.params.id;
        try {
            if (postId > (req.store.posts.length - 1) || postId < 0) {
                throw "Id is out of range.";
            }
        } catch (err) {
            myLogger.warn('404: Comments not retrieved. Id is out of range.');
            return res.status(404).send({
                error: err
            });
            // this should end it
        }
        // There must be a more elegant way to do this:
        // Was influenced by this thread:
        //   https://bit.ly/2JwHFJR on StackExchange
        // in returning the JSON object rather than an array.
        if ('comments' in req.store.posts[postId]) {
            res.status(200).send(JSON.parse('{ "comments":' + JSON.stringify(req.store.posts[postId].comments) + "}"));
        } else {
            res.status(404).send({
                error: `No comments exist for id ${postId}.`
            });
            myLogger.warn(`404: Comments not retrieved. No comments exist for id ${postId}.`);
        }
    },
    addComment(req, res) {
        // Add a comment to the post specified by the id.
        let postId = req.params.id;
        try {
            if (postId > (req.store.posts.length - 1) || postId < 0) {
                throw "Id is out of range.";
            }
        } catch (err) {
            myLogger.warn('404: Comment not added. Id is out of range. Post does not exist.');
            return res.status(404).send({
                error: err
            });
            // this should end it
        }
        // If post id exists, and comments exist then
        // add the comment which came in the body by pushing it on the
        // array.
        if ('comments' in req.store.posts[postId]) {
            req.store.posts[postId].comments.push(req.body);
        }
        // If post id exists, but no comments yet,
        // add the comment by adding the comments property to the
        // req.store object
        else {
            req.store.posts[postId].comments = [req.body];
        }
        commentId = req.store.posts[postId].comments.length - 1;
        res.status(201).send({
            id: commentId
        });
    },
    updateComment(req, res) {
      let postId = req.params.postID;
      let commentId = req.params.commentID;
      try {
          if (postId > (req.store.posts.length - 1) || postId < 0) {
              throw "Id is out of range.";
          }
      } catch (err) {
          myLogger.warn('404: Comment not updated. Post Id is out of range. Post does not exist.');
          return res.status(404).send({
              error: err
          });
      }
      try {
          if ( !('comments' in req.store.posts[postId]) || (commentId >  req.store.posts[postId].comments.length - 1) || commentId < 0) {
              throw "Comment id is out of range";
          }
      } catch (err) {
          myLogger.warn('404: Comment not updated. Comment Id is out of range. Comment does not exist.');
          return res.status(404).send({
              error: err
          });
        }
      req.store.posts[postId].comments[commentId]= req.body;
      res.status(200).send ({ id: parseInt(commentId)});
    },
    removeComment(req, res) {
      let postId = req.params.postID;
      let commentId = req.params.commentID;
      try {
          if (postId > (req.store.posts.length - 1) || postId < 0) {
              throw "Id is out of range.";
          }
      } catch (err) {
          myLogger.warn('404: Comment not deleted. Post Id is out of range. Post does not exist.');
          return res.status(404).send({
              error: err
          });
      }
      try {
          if ( !('comments' in req.store.posts[postId]) || (commentId >  req.store.posts[postId].comments.length - 1) || commentId < 0) {
              throw "Comment id is out of range";
          }
      } catch (err) {
          myLogger.warn('404: Comment not updated. Comment Id is out of range. Comment does not exist.');
          return res.status(404).send({
              error: err
          });
        }
        req.store.posts[postId].splice(commentId, 1);
        myLogger.info('Comment deleted.');
        res.status(200).send({
            id: commentId
        });
    }
};
