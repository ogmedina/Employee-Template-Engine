//Brings in file information from script files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//Required modules for program to run
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//Team is an array that builds the answers from the responses
let team = [];
//Output Directory file and path. This goes to the output folder, and creates an html called team
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//This is the htmlrenderer and is from another file
const render = require("./lib/htmlRenderer");

//This is the main function that asks through inquirer what role the user would like to add, and then 
//based on the response is then sent to the appropriate inquirer questions
function newTeam() {
    inquirer.prompt([
        {
            type: "list",
            message: "What role would you like to add to your team?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Done!"
            ],
            name: "role"   

        }]).then(function(response){
            if (response.role === "Manager"){
                newManager();
            } else if (response.role === "Engineer"){
                newEngineer();
            } else if (response.role === "Intern"){
                newIntern();
            } else if (response.role === "Done!"){ //When the user is done, the file is written with the team array and the render html function
                fs.writeFileSync(outputPath, render(team), "utf-8");
                console.log("File written! Please check the output folder for the completed html")
            } else {
                console.log("Error with responses, please check data");
            } 
        });
}

newTeam();

//This is the function for a New Manager, it asks questions using inquirer
function newManager() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your manager\'s name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is your manager\'s id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is your manager\'s email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is your manager\'s office number?',
            name: 'officeNumber',
        }    
    ]).then(function(response){
        //Once the responses are collected they are pushed to the array of team as a New Manager
        team.push(new Manager(response.name, response.id, response.email, response.officeNumber));
        //Then the function goes back to the main question
        newTeam();
    })
}

//This is the function for a New Engineer, it asks questions using inquirer
function newEngineer(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your engineer\'s name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is your engineer\'s id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is your engineer\'s email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is your engineer\'s GitHub username?',
            name: 'github',
        }
    ]).then(function(response){
        //Once the responses are collected they are pushed to the array of team as a New Engineer
        team.push(new Engineer(response.name, response.id, response.email, response.github));
        //Then the function goes back to the main question
        newTeam();
    });
}
//This is the function for a New Intern, it asks questions using inquirer
function newIntern(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your intern\'s name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is your intern\s id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is your intern\'s email?',
            name: 'email',   
        },
        {
            type: 'input',
            message: 'What is your intern\'s school?',
            name: 'school'        
        } 
    ]).then(function(response){
        //Once the responses are collected they are pushed to the array of team as a New Intern
        team.push(new Intern(response.name, response.id, response.email, response.school));
        //Then the function goes back to the main question
        newTeam();
    });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
