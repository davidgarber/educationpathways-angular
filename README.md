# educationpathways-angular
"educationpathways-angular" is an AngularJS-based app to visualize education data.  

## What can I do with this thing?
So far there's only one chart - 'Participation by path'.  This allows you to visualize participation in each path ('HXX', 'HG4B', etc.) by gender, ethnicity, etc.

I still need to add some logic to re-interpret the 'H...' strings as something people will understand, and resize the graphic based on the number of valid search values.

## Installation
In order to install this project, do the following:

1. Install Node.js, which is used primarily to download other components of the system.  See https://nodejs.org/en/ for information on how to install.
2. Clone this repository using the URL provided by Github.
3. Navigate to the directory into which you cloned this project, and type the following:

npm install 

This will install a number of different tools used as part of this project, including "bower", a package manager.  Once the npm install completes a "bower install" step will start to install the remaining dependencies.

4. Install a simple Node.js based web server using the command "npm install -g http-server".  This will allow you to run the application locally.
5. Use the command "http-server &lt;install-dir&gt;/app" to start the web server.  The string "&lt;install-dir&gt;/app" references the "app" subdirectory of the directory into which you cloned this project.
6. In your browser, go to "http://localhost:8080".

When you're ready to stop the web server, just go to the window it's running in and hit Ctrl-C.

## Why do I have to go through this long, drawn-out installation process?
Trust me, it's better than including all this stuff with the app.  Sorry.

## How can I help?
Well, first of all I fully admit that I am not an AngularJS or JavaScript guru.  If you look through the code and see things that could be done differently/better, I'd love to hear from you.

Key areas where you can contribute:
* STYLING.  Besides not being an AngularJS or JavaScript guru, I'm also not much of a CSS guru either.  But hey, if you want server-side stuff done, I'm your guy.
* visualizations (D3 or otherwise)
* error handling
* test cases (well, maybe)
* performance optimizations (this will be an ongoing thing, I'm sure)
* incorporating other data sources in so that they can be merged with the data from EchoNW.  Not sure exactly how much of this we can do yet...
* other stuff you want to do!
