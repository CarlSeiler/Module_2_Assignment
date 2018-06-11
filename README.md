# RESTful Blog API
## A project for [Indroduction to NodeJS](https://courses.edx.org/courses/course-v1:Microsoft+DEV283x+1T2018/courseware/1e95019f-b0fe-1ae9-fcf4-4e35d66aa371/50a265d9-ebaa-af4a-2ced-b569e840bb28/?child=first "Microsoft: DEV283x - Introduction to NodeJS") Course at edX

### Module 2, Assignment Lab

Additional requirements:

1. nodeJS
2. npm
3. package [_node-dev_](https://www.npmjs.com/package/node-dev "node-dev") (usually installed globally)

How to install:

1. clone package
2. run _npm install_ in the resulting directory.

How to run:

1. run _npm start_
2. test by using _curl_ or use _bash test.sh_

#### Observations, design, and description

1. Program _server.js_ was modeled on the pattern of the earlier lab
in Module 2. Required packages are specified as **const**'s at the top.
Node package _express_ is used, also used is _body-parser_ which was the only
one required as a minimum in the problem specifications.  Also used are
_morgan_ and _errorhandler_ as previously described in the Module 2 lab. The only
node package not previously seen is the [_winston_](https://www.npmjs.com/package/winston)
 package which is a different,
general logger, which is primarily used for console logging in this case.
_Winston_ can also be used to record activity to files based on a particular
[logging levels](https://www.npmjs.com/package/winston#using-logging-levels "Winston logging levels"),
but that feature is not used here.

2. The goal was to put all of the primary CRUD functions of the program
into the directory ./routes, and have the _server.js_ call the functions
based on the routes.  Essentially, this meant there should be only
eight functions, and each of those should call the code found in either
./routes/comments.js or ./routes/posts.js depending on the route.

```javascript
const routes = require('./routes');
```
This imports the functions found in ./routes/index.js.

```javascript
const app = express();
const posts = routes.posts_;
const comments = routes.comments_;
```

This establishes the express instance for later starting via app.listen. I
had a little trouble telling where things were coming from, so I named the
exported module functions in the index.js file with a trailing underscore.  This
allowed me to better picture this in my mind. I could see that the
const posts referred to the routes.posts_ exported by the index.js file in ./routes.
This just helped me picture it better.

```javascript
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(errorHander());
```

This middleware was set up just as in the previous lab.

```javascript
let store = {};
store.posts = [];
```

This sets up the in-memory store.  Note that later, I would find I would not
be able to exactly match the store structure, as the
model given by the instructor for the comments was an array of the form:

```
[
      text: 'Cruel…..var { house, mouse} = No type optimization at all',
      text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
      text: '(p1,p2)=>{ … } ,i understand this ,thank you !'      
]
```

That was difficult to replicate given the fact that I wanted to be able to
return the items in JSON via the API.  So, I modified the comments structure to
be an array of objects, trusting this comment from the instructor:

* Use an in-memory store with the structure _similar_ to this:

I took the keyword here to be "similar," and my structure is
similar.

Here are the 8 endpoints:

```javascript
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

```

They all simply call the methods imported from ./routes/index.js.  Originally,
I modified the methods found there to include the __store__ in their call.
After watching the video and what others had done, I was able to modify this
to keep from having to do this by adding properties to the req object.

### Additional problems encountered, challenges and testing

As previously mentioned, one challenge was getting the data structure
to match the model given.  Eventually, as I said, I abandoned that. The final
structure looks more like:

```javascript
let store = {
  posts: [
    {name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: [
      { text: "Cruel…..var { house, mouse} = No type optimization at all"},
      { text: "I think you’re undervaluing the benefit of ‘let’ and ‘const’."},
      { text: "(p1,p2)=>{ … } ,i understand this ,thank you !"}      
    ]
    }
  ]
};
```

At first I was concerned that there were duplicate keys in the comments, but
after some reading, I found that while duplicate keys are not recommended,
they are not strictly prohibited.  Since we would be referring to each by their
index, it would not be a problem.

I tried to add some error checking (see the code in updatePost() and removePost(),
for example).  Originally, I was thinking that calling an updated on a
post item whose index did not exist would throw an error that I could catch,
but it did not.  As a result, I had to throw my own errors based on whether
particular indices existed.  I kept the try-catch pattern, however.

Once the data structure had been established and the error checking was in place,
it was merely a matter of following the patterns used on the lab to implement
the CRUD features.

#### Testing

I included a test script which hits most the features.  As mentioned at the top
of this file, the user can test using:

```
bash test.sh
```

GET, PUT, and DELETE return *200* if successful.  POST returns *201*. When
POSTing, the response is:

```
{"id": n}
```

Where _n_ is the id of the index of the item just added, either post or comment.

GET for /posts returns:

```
{"posts": [{post1}, {post2}, {post3}, ...{postn} ]}
```

GET for /posts/:postId/comments returns:

```
{"comments": [{"text": comment1},{"text": comment2},{"text": comment3},  ...{ "text": commentn} ]}
```

If a comment or post does not exist, GET, PUT, and DELETE will
return *404* and a response in the form:

```
{ "error": errmsg}
```

where errmsg is the error message encountered.
