# Start
- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 3000
- Write request handlers for /test, /hello
- Install nodemon and update package.json script

- Initialize git
- .gitignore
- Create a remote repo in github
- Push all your code in remote repo
- Play with routes and route extensions ex: /test, /hello, /hello/2
- Order of the route matter a lot
- Install Postman app and make a workspace/collection => test API call
- Write logic to handle GET, POST, PATCH and DELETE API Calls and test them on Postman
- Explore routing and use of ?, +, (), * in the routes
- Use of regex in routes /a/, /.*fly$/
- Reading the Query Params in the routes
- Reading the Dynamic routes

- Create multiple route handler, Play with the code
- next()
- next function and errors along with res.send()
- aap.use("/routes", rH1, [rH2, rH3], rH4, rH5)
- What is Middleware? Why do we need it?
- How express.js basically handles requests behiend the scene?
- Difference between app.use & app.all
- Write a dummy middleware for admin
- Write a dummy middleware for user

- Create afree cluster on MongoDB official website
- Install mongoose library
- Connect your application to the Database "connection-url/devTinder"
- Call the connectDB function and connect to database before starting application on port
- Create auserSchema & user model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try & catch

- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic  to receive the data from the end user
- API - get user by email ID
- API - Feed API - GET /feed - get all te users from the database
- API - Get user by ID
- Create a Delete user API
- Difference between PATCH & PUT
- API - update a user
- Explore the Mongoose documentation for Model methods
- What are options in a  Model.findOneAndUpdate method, explore more about it
- API - Update the user with emailID

- Explore SchemaType options from the documentation
- Add required, unique, lowercase, trim, min, max, minLength & maxLength
- Add default
- Create a custom validation function for Gender
- Improve the Db Schema - Pul all the appropiate validations on each field in Schema
- Add the timestamps to the User Schema

- Add API label validation on PATCH request & Signup POST API
- DATA Sanitization - Add API validation for each fields
- Install validator
- Explore validator library function and use validator function for password, email and photoUrl
- NEVER TRUST the req.body

- Validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user with encrypted password
- Create a /login API
- Validate the /login data
- Compare password and throw error if email or password is invalid

- Install cookie-parse
- just send  a dummy cookie to user
- Create a GET /profile API and check if you get cookie back
- Install jsonwebtoken
- In /login API, after email & password validation, create a JWT token and send it to the user inside cookie
- Read the cookie inside your profile APIand find the logged-in user details