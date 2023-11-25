# AutoFinder

## Description

This was my final project of my web programming 2 class, it was a group project. Me and my 2 other teammates had a passion
for cars so we decided to create a car review website to have centralized in depth unbiased reviews of every car you could think of

## Key Capabilities

Store a database of cars used as reference for reviews​
Users that will be able to post new reviews, while also being able to view their own information and posts.​
Posts that will concern a particular car, while having a title, content, a score associated to the car and also the type of post it is (rant,tuning,review,etc.) 

## Usage

Step 1: Open the backend folder in VS Code
Step 2: Create a .env file in the backend and copy paste the content below
Step 3: Open the frontend folder in a seperate VS Code window
Step 4: Open the terminal of the backend VS Code window and type npm i
Step 5: Open the terminal of the frontend VS Code window and type npm i
Step 6: Type in the backend terminal npm start, once the installation is completed
Step 7: Type in the frontend terminal npm start, once the installation is completed
Step 8: Use the website

Non-Standard Modules for Frontend: js-cookie, jquery,flowbite
Non-Standard Modules for backend: bcrypt,cookie-parser, uuid

For the .env File: 

MONGODB_PWD="foqjoj-denMe0-morged"
URL_PRE ="mongodb+srv://mongoose:"
URL_POST="@webiiasg1.xz3pud8.mongodb.net/?retryWrites=true&w=majority"

## Contribution

I created the developpement plan of the project as well as being in charge of tracking the developpement of the project
I also worked on most of the backend and testing portion of the project (although not really usable) aswell as touched a
bit the front-end by creating and modified some page.

## Business Requirements

### Table 1 - Car Database

In a website such as ours, where the feature relies on car reviews/discussion by users that own the cars, it is primordial to have a dataset that contains all car makes and models and years which should be unique. The car database will also include a description for each car and a link to a image that will be used by the front end of the website. 

### Table 2 - User Database

Another table that is needed is the one for users. Since registered users are all able to post to the website/forum we have, it is important for each user to distinguish one from another. To do so, every user will have an unique identifier that will be their username, which would be a mandatory field. Furthermore the users table would have a password field, that will also be mandatory, while also have minimum requirements to make sure that the password put in is in valid format. The other fields that the user table would contain, since would be a one that would reference the cars they have, using the car ID generated. As of now, each user is allowed to have a maximum of two cars, so there would be two fields available to reference cars. Since the car ownership is about creating reviews about their cars, no duplicates are allowed amongst the two cars. Something that would also allow and improve the user experience would be storing basic information such as full name, birthday and gender, which would all be mandatory fields. One field that would be optional would be the user icon, since some people don’t need that level of personalization.

### Table 3 - Posts database

Being the heart of our product, the posts table must be complete enough to allow easy navigation for the users of our website. As such, the required fields would be a title, which is mandatory to give the post an early summary for the users to let them decide on whether they should or shouldn't decide to continue reading the post. This field would not be unique, since people could be giving vague titles. Another important field, mandatory, would be the content itself of the post. For reviews, a mandatory field would be a score, in order to give a numeric value to the car. Furthermore, the username of the one posting the post should also be referenced, in order to link one to another. This table would also contain and reference the car that it is talking about. And since this website would allow for discussions as it is mimicking a forum. 

### User interface requirements: 
⦁	A first time user must be able to create an account in a signup page.
⦁	An existing user is able to modify their information, which includes username and password.
⦁	A user can access an interface for creating a new post.
⦁	A search to filter out reviews based on the user’s criteria must be available.
⦁	A user can navigate and see posts. 

### Dependencies:
⦁	The car make, model and year from the car database will be used in the user table to determine the user’s car, in the posts database to determine the car being subject to criticism.
⦁	The username from the users database will be used in the posts database, to determine the author of the post.

## Application Features
### The Must-Haves:
⦁	Viewing the posts
⦁	Viewing a specific post
⦁	Creating an account
⦁	Editing the account information
⦁	Searching 
### The Nice-to-Have:
⦁	Dark mode
⦁	Photo gallery for the posts
⦁	Profile picture
⦁	Direct messaging between accounts
⦁	Account verification (Like Twitter, with the check mark)


