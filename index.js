// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const fs = require("fs");
const { promiseHooks } = require("v8");

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

// Function to generate correct license badge

function badgeGenerator(projectLicense) {
    if (projectLicense === "MIT License") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (projectLicense === "GNU License") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    } else if (projectLicense === "Mozilla Public License 2.0") {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
    } else if (projectLicense === "BSD 3-Clause License") {
        return "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
    } else if (projectLicense === "Apache 2.0 License") {
        return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    }
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    let badge = badgeGenerator(data.license[0]);
    let readme = 
`
<div align="center">
    <h3 align="center">${data.title}</h3>

${badge}
</div>

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

## Installation

${data.installation}

## Usage

${data.usage}

## Contributions

${data.contributions}

## Tests

${data.tests}

## License

${data.license} used for this project. Please refer to repo for more information.

## Questions

For any questions you have, please do not hesitate to reach out to me. 

- Github Username: ${data.user}
- Email: ${data.email}`

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
                choices: ["MIT License", "GNU License", "Mozilla Public License 2.0", "BSD 3-Clause License", "Apache 2.0 License"],
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
            writeToFile("SAMPLE_README.md", responses)
        })
}

// Function call to initialize app
init();
