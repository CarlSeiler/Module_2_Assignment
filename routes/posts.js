// posts.js
// 2018-06-08
// CRUD functions for posts
const myLogger = require('winston');

module.exports = {
    getPosts(req, res) {
        myLogger.info('Posts retrieved.');
        // myLogger.info(JSON.stringify(req.store) + '\n');
        // Returns entire post store JSON object, not just post array
        res.status(200).send(req.store);
    },
    addPost(req, res) {
        let newPost = req.body;
        req.store.posts.push(newPost);
        let postId = req.store.posts.length - 1;
        myLogger.info('Post added.');
        res.status(201).send({
            id: postId
        });
    },
    updatePost(req, res) {
        let postId = req.params.id;
        myLogger.info('Preparing to update.');
        try {
            if (postId > (req.store.posts.length - 1) || postId < 0) {
                throw "Id is out of range";
            }
        } catch (err) {
            myLogger.warn('404: Post not updated. Id is out of range');
            return res.status(404).send({
                error: err
            });
            // this should end it
        }
        req.store.posts[postId] = req.body;
        myLogger.info('Post updated.');
        res.status(200).send({
            id: postId
        });
    },
    removePost(req, res) {
        let postId = req.params.id;
        myLogger.info('Preparing to delete.');
        try {
            if (postId > (req.store.posts.length - 1) || postId < 0) {
                throw "Id is out of range";
            }
        } catch (err) {
            myLogger.warn('404: Post not deleted. Id is out of range');
            return res.status(404).send({
                error: err
            });
            // this should end it
        }
        req.store.posts.splice(postId, 1);
        myLogger.info('Post deleted.');
        res.status(200).send({
            id: postId
        });

    }
};
