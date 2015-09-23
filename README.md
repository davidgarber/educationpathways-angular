# educationpathways-angular
"educationpathways-angular" is an AngularJS-based app to visualize education data.  

## What can I do with this thing?
Well, so far not much.  It does make requests to the EchoNW API, and it will give you options to select the various search criteria that the API allows, but there's no graphics or visualizations in place yet.  

## Installation
In order to install this project, do the following:

1. Install Node.js, which is used primarily to download other components of the system.  See https://nodejs.org/en/ for information on how to install.
2. Clone this repository using the URL provided by Github.
3. Navigate to the directory into which you cloned this project, and type the following:

npm install 

This will install a number of different tools used as part of this project.  One of the packages installed during this step is Bower, a package manager; Bower MUST be installed in order for the other installation steps to succeed.

4. From the same directory, use the "bower install" command to install packages using Bower.  This will install AngularJS and other packages necessary for the system to run.
5. Install a simple Node.js based web server using the command "npm install -g http-server".  This will allow you to run the application locally.
6. Use the command "http-server <install-dir>/app" to start the web server.  The string "<install-dir>/app" references the "app" subdirectory of the directory into which you cloned this project.
7. In your browser, go to "http://localhost:8080".

When you're ready to stop the web server, just go to the window it's running in and hit Ctrl-C.

## Why do I have to go through this long, drawn-out installation process?
Trust me, it's better than including all this stuff with the app.  Sorry.

## How can I help?
Well, first of all I fully admit that I am not an AngularJS or JavaScript guru.  If you look through the code and see things that could be done differently/better, I'd love to hear from you.

Key areas where you can contribute:
-- STYLING.  Besides not being an AngularJS or JavaScript guru, I'm also not much of a CSS guru either.  But hey, if you want server-side stuff done, I'm your guy.
-- visualizations (D3 or otherwise)
-- error handling
-- test cases (well, maybe)
-- other stuff you want to do!
