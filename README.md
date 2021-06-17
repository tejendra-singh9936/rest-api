# rest-api
using node.js , express.js and mongodb

 start the server => npm start
 
 baseUrl=http://localhost:8080
 
---------------------------------------------------- Create a new User ------------------------------------------------------------------------------------
method= POST ,
url=/api/user ,
action=add new user ,
complete url=http://localhost:8080/api/user


---------------------------------------------------- Update an Existing User ------------------------------------------------------------------------------------
 method= PUT  ,
 url=/api/user/:id ,
action=update the user with given id ,
complete url=http://localhost:8080/api/user/60cb4d90bc41031f6829fed3


---------------------------------------------------- Delete an User------------------------------------------------------------------------------------
method= DELETE ,
url=/api/user/:id ,
action=delete an existing user ,
complete url=http://localhost:8080/api/user/60cb4d90bc41031f6829fed3


---------------------------------------------------- Get all Users ------------------------------------------------------------------------------------
method= GET ,
url=/api/user ,
action=get all users ,
complete url=http://localhost:8080/api/user

-------------------------------------Get all Users sorted by createdAt timestamp----------------------------------------------------------------------
method= GET,
url=/api/user/:pagenumber ,
action=get all users ,
complete url=http://localhost:8080/api/user/1   OR    http://localhost:8080/api/user/2 .......

---------------------------------------Get all Users sorted by  their distance from coordinates passed in the query param of the Endpoint----------
method= GET ,
url=/api/user ,
action=get all users ,
complete url =http://localhost:8080/api/user?lat=17.3850&long=78.4867

 
 
