const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

const managerAnswers = await inquirer.prompt([
    { type: 'input', name: 'name', message: "What is the team manager's name?" },
    { type: 'input', name: 'id', message: "What is the team manager's ID?" },
    { type: 'input', name: 'email', message: "What is the team manager's email?" },
    { type: 'input', name: 'officeNumber', message: "What is the team manager's office number?" }
]);

const engineerAnswers = await inquirer.prompt([
    { type: 'input', name: 'name', message: "What is the engineer's name?" },
    { type: 'input', name: 'id', message: "What is the engineer's ID?" },
    { type: 'input', name: 'email', message: "What is the engineer's email?" },
    { type: 'input', name: 'github', message: "What is the engineer's GitHub username?" }
]);

const internAnswers = await inquirer.prompt([
    { type: 'input', name: 'name', message: "What is the intern's name?" },
    { type: 'input', name: 'id', message: "What is the intern's ID?" },
    { type: 'input', name: 'email', message: "What is the intern's email?" },
    { type: 'input', name: 'school', message: "What is the intern's school?" }
]);

function generateHTML() {
    const htmlContent = render(teamMembers);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, htmlContent);
    console.log('Team profile page generated successfully!');
}
