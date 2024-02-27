async function main() {
    const inquirer = await import('inquirer').then(module => module.default);
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

    async function init() {
        console.log("Please build your team");

        const managerAnswers = await inquirer.prompt([
            { type: 'input', name: 'name', message: "What is the team manager's name?" },
            { type: 'input', name: 'id', message: "What is the team manager's ID?" },
            { type: 'input', name: 'email', message: "What is the team manager's email?" },
            { type: 'input', name: 'officeNumber', message: "What is the team manager's office number?" }
        ]);

        const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
        teamMembers.push(manager);

        await addTeamMembers();
    }

    async function addTeamMembers() {
        const { nextStep } = await inquirer.prompt({
            type: 'list',
            name: 'nextStep',
            message: 'What would you like to do next?',
            choices: ['Add Engineer', 'Add Intern', 'Finish building my team']
        });

        switch (nextStep) {
            case 'Add Engineer':
                const engineerAnswers = await inquirer.prompt([
                    { type: 'input', name: 'name', message: "What is the engineer's name?" },
                    { type: 'input', name: 'id', message: "What is the engineer's ID?" },
                    { type: 'input', name: 'email', message: "What is the engineer's email?" },
                    { type: 'input', name: 'github', message: "What is the engineer's GitHub username?" }
                ]);
                const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
                teamMembers.push(engineer);
                break;

            case 'Add Intern':
                const internAnswers = await inquirer.prompt([
                    { type: 'input', name: 'name', message: "What is the intern's name?" },
                    { type: 'input', name: 'id', message: "What is the intern's ID?" },
                    { type: 'input', name: 'email', message: "What is the intern's email?" },
                    { type: 'input', name: 'school', message: "What is the intern's school?" }
    ]);
    const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
    teamMembers.push(intern);
    break;
            case 'Finish building my team':
                generateHTML();
                return;
        }

        await addTeamMembers();

    function generateHTML() {
        const htmlContent = render(teamMembers);
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, htmlContent);
        console.log('Team profile page generated successfully!');
    }

//application starts here
    init().catch(console.error);
}
}
main().catch(console.error);