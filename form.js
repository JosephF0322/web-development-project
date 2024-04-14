//set up for node js
const express = require('express');
const fs = require("fs");

const app = express();
const port = 3000;


/*
I couldn't get the other pages to even work so we are just working with the bones.

function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    var fsCallback = function(error, data) {
        if(error) throw error;

        res.writeHead(200);
        res.write(data);
        res.end();
    }

    switch(path) {
        case '/subpage':
            doc = fs.readFile(__dirname + '/About.html', fsCallback);
        break;
		case '/Contact':
			doc = fs.readFile(__dirname + '/Contact.html', fsCallback)
		break;
        default:
            doc = fs.readFile(__dirname + '/index.html', fsCallback);
        break;
    }
}
*/

app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/Contact.html'); // send HTML file on GET request
});

app.post('/submit-form', (req, res) => {
    // access form data
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	var why = req.body.why; 

	//put all the form data into a fun little format
	var contact = "Hey! " + fname + " " + lname + " wants to contact you about ' " + why + "' " + " You can get back to them at " + email + "\n"
	
	//creates and appends the little blurb onto a log (supposedly server side that can store the user's info)
	//could be more in depth
	fs.appendFile('contactList.log', contact, err => {
		if (err) {
			console.error(err);
		  } else {
			// done!
		  }
	});
	
	//send the person to a final page that says their form is submitted successfully
	res.send("Thank you " + fname + " " + lname + " your form is successfully 'submitted' please go back!");
});

//makes sure the server is running
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});