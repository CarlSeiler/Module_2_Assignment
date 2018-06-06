// posts.js
// 2018-06-06
// Description:
const myLogger = require('winston');

module.exports = {
    getPosts(req, res, postStore) {
        myLogger.info('Posts retrieved.');
        myLogger.info(JSON.stringify(postStore));
        res.status(200).send(postStore);
    },
    addPost(req, res, postStore) {
        let newPost = req.body;
        postStore.posts.push(newPost);
        let postId = postStore.posts.length - 1;
        myLogger.info('Post added.');
        res.status(201).send({ id: postId });
    },
    updatePost(req, res, postStore) {
		let postId = req.params.id;
        myLogger.info('Preparing to update.');
        try {
            if (postId > (postStore.posts.length - 1) || postId < 0) {
                throw "Id is out of range";
            }
        } catch (err) {
			myLogger.warn ('404: Post not updated. Id is out of range');
            return res.status(404).send({
                error: err
            });
            // this should end it
        }
        postStore.posts[postId] = req.body;
        myLogger.info('Post updated.');
        res.status(200).send({
            id: postId
        });
    },
    removePost(req, res, postStore) {
		let postId = req.params.id;
		myLogger.info('Preparing to delete.');
        try {
            if (postId > (postStore.posts.length - 1) || postId < 0) {
                throw "Id is out of range";
            }
        } catch (err) {
			myLogger.warn ('404: Post not deleted. Id is out of range');
            return res.status(404).send({
                error: err
            });
            // this should end it
        }
        postStore.posts.splice(postId, 1); 
        myLogger.info('Post deleted.');
        res.status(200).send({
            id: postId
        });
        myLogger.info('removePost route requested');
    }
};
