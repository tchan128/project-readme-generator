// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const fs = require("fs");

// TODO: Create an array of questions for user input
const questions = [
    "What is the title of your project?",
    "Please describe your project (what is it, your motivation, why it's build, what problem it solves). ",
    "Please provide installation instructions to your project.",
    "How do you use the project? Think about what outputs are expected, how to use it, and what we can use the project for.",
    "Add any contributions/credits when creating this project.",
    "What testing was done for the project, and how should users test the project?",
    "Please choose a license for this project.",
    "What is your github username?",
    "What is your email address?",
];

const question_names = ["title", "description", "installation", "usage", "contributions", "tests", "license", "user", "email",];
        

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    let readme = 
`<h3 align="center">${data.title}</h3>

<details>
<summary>Table of Contents</summary>
<ol>
    <li><a href="#description">Description</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#tests">Tests</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#questions">Questions</a></li>
</ol>
</details>

## Description

${data.description}

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

${data.installation}

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

${data.usage}

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributions

${data.contributions}

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Tests

${data.tests}

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

${data.license}

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Questions

For any questions you have, please do not hesitate to reach out to me. 

Github Username: ${data.user}
Email: ${data.email}

<p align="right">(<a href="#readme-top">back to top</a>)</p>`

    fs.writeFile(fileName, readme, (error) =>
    error ? console.error(error) : console.log(data))
}

// TODO: Create a function to initialize app
function init() {
    const userPrompts = [];
    for (let i = 0; i < question_names.length; i++) {
        if (i === 6) {
            const p = 
            {
                type: "checkbox",
                choices: ["MIT", "GNU", "Mozilla Public License 2.0", "GNU GPL v3", "BSD 3-Clause License", "Apache 2.0 License"],
                message: questions[i],
                name: question_names[i],
            }
            userPrompts.push(p);
        } else {
        const p = 
        {
            type: "input",
            message: questions[i],
            name: question_names[i],
        }
        userPrompts.push(p);
        }
    }

    inquirer
        .prompt (userPrompts)
        .then((responses) => {
            writeToFile("README.md", responses)
        })
}

// Function call to initialize app
init();
