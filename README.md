# Summary
A simple journal app that allows users to create and use accounts to access private journals. This app was created for Thinkful's Engineering Immersion program in order to practice building a full stack web application. The app idea and design is my own.

A live version of the site can be found [right here](https://capstone-journal-app.herokuapp.com/journal), and can be accessed with a demo account if you don't want to register.<br/>
Demo email: user@demo.com<br/>
Demo password: thinkfuldemoaccountei24<br/>

# Screenshots and additional information
The main landing page
![Screenshot of the main landing page](https://raw.githubusercontent.com/phelan97/journal-client/master/screenshots/landing-page.png)
<br/>
What the user sees when they log in for the first time
![Screenshot of the user's first login](https://raw.githubusercontent.com/phelan97/journal-client/master/screenshots/journal-main.png)
<br/>
One of the possible screens when adding an entry
![One of the possible screens when adding an entry](https://raw.githubusercontent.com/phelan97/journal-client/master/screenshots/add-post.png)

My goal is to eventually add additional features such as stat tracking, attachments, rich rext editing, and basic account options.

# Technical information
This repo holds the server side code. The server runs using Nodejs, and is powered by Express. The database uses Mongoose and MongoDB. Passport helps manage JWT authentication. Test are done with Mocha and Chai. The client side code providing access to this API lives [here](https://github.com/phelan97/journal-client)
