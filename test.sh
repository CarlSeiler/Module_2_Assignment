# Fill with data
curl -H "Content-Type: application/json" -X POST -d '{"name": "(1) Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"
curl -H "Content-Type: application/json" -X POST -d '{"name": "(2) 10 ES6 Features of whatever. ", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"
curl -H "Content-Type: application/json" -X POST -d '{"name": "(3) Groovy things whatever. ", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"
curl -H "Content-Type: application/json" -X POST -d '{"name": "(4) Top 4 ES6 Components of whatever. ", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts" -iv
#pause for tester human
echo
read -p "Press any key to continue... " -n1 -s
echo
# Update:
curl -H 'Content-Type: application/json' -X PUT -d '{"name": "3 - Groovier Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts/2" -iv
# Get all:
curl "http://localhost:3000/posts" -iv
#pause for tester human
echo
read -p "Press any key to continue... " -n1 -s
echo
#Add a record with single comment:
#curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": "", "comments": [ {"text": "This is a comment"} ]}'  "http://localhost:3000/posts"
#Add a comment to an existing post--should work whether other comments exist or not:
curl -H "Content-Type: application/json" -X POST -d '{"text": "This is a comment"}'  "http://localhost:3000/posts/0/comments"
#Display comments for existing post:
curl "http://localhost:3000/posts/0/comments"
#Update a record comment:
curl -H "Content-Type: application/json" -X PUT -d '{"text": "This is a replacement comment"}'  "http://localhost:3000/posts/0/comments/0" -iv
#Delete a comment:
curl -H "Content-Type: application/json" -X DELETE "http://localhost:3000/posts/0/comments/0"
#Delete a post:
curl -H "Content-Type: application/json" -X DELETE "http://localhost:3000/posts/0" -iv
#pause for tester human
echo
read -p "Press any key to continue... " -n1 -s
echo
# Get all
curl "http://localhost:3000/posts" -iv
echo
