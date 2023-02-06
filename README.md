# Overview
Plant Parenthood is a social media-style application designed for plant lovers to share and connect. This app is built with a React frontend and a Ruby-on-Rails backend, and utilizes active storage and Amazon S3 for image hosting.

Running the Application
The application can be accessed at [here](https://plant-parenthood-social.onrender.com).

If running locally: 
To run the backend of this application, run the following commands in a terminal: bundle install (to install dependencies) rails db:seed (to seed database) rails s (to run rails server)

To run the frontend of this application, run the following commands in a separate terminal: npm install --prefix client (to install dependencies) npm start --prefix client (to start React server)

# Features and How to Use

## Login/Signup
Users can login to their account by using their previously created username and password. If users do not have an account, they can create one via the signup page. Logging in directs to the main page of all Plant Parenthood users' posts.
## Creating a New Post
Users can create a new post by selecting the "Create New Post" button at the top of their home or profile page. Users can upload an image in the form of PNG or JPEG attachments, as well as add a caption and category. Upon submission, the new post will be added to the home page.
## Posts
An individual post can be viewed by selecting the "View Post" button on any post from the home or profile pages. Users can edit and delete their own posts, as well as like or unlike a post by clicking the heart icon. Users can also add a comment, or view all comments for a post.
Additionally, posts can be sorted by category on the home or profile pages by selecting an option from the dropdown.
## Profiles
Users can navigate to the "My Profile" page to view their own posts and profile information; here, they can edit their bio.
Other users' profile pages can also be viewed by clicking their username on any post from the home page.

## Logout
Users can logout by clicking the respective icon, and will be redirected to the login page.

# Technologies Used

React
Tailwind CSS
Ruby-on-Rails
Amazon S3
