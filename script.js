const inquirer = require('inquirer');
const fs = require('fs');
const Handlebars = require('handlebars');

Handlebars.registerHelper('getName', function() {
  // compute the name property here
  return name;
});


class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
  
    getName() {
      return this.name;
    }
  
    getId() {
      return this.id;
    }
  
    getEmail() {
      return this.email;
    }
  
    getRole() {
      return "Employee";
    }
  }
  
  class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
      super(name, id, email);
      this.officeNumber = officeNumber;
    }
  
    getRole() {
      return "Manager";
    }
  }
  
  class Engineer extends Employee {
    constructor(name, id, email, github) {
      super(name, id, email);
      this.github = github;
    }
  
    getGithub() {
      return this.github;
    }
  
    getRole() {
      return "Engineer";
    }
  }
  
  class Intern extends Employee {
    constructor(name, id, email, school) {
      super(name, id, email);
      this.school = school;
    }
  
    getSchool() {
      return this.school;
    }
  
    getRole() {
      return "Intern";
    }
  }
  
 
const teamMembers = [];

// Prompt for manager information
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is the manager's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the manager's ID?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the manager's email address?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the manager's office number?",
    },
    {
      type: "list",
      name: "addMore",
      message: "Would you like to add another team member?",
      choices: ["Engineer", "Intern", "No, I'm done"],
    },
  ])
  .then((answers) => {
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    teamMembers.push(manager);
    if (answers.addMore === "Engineer") {
      // Prompt for engineer information
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
          },
          {
            type: "input",
            name: "id",
            message: "What is the engineer's ID?",
          },
          {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
          },
          {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
          },
          {
            type: "list",
            name: "addMore",
            message: "Would you like to add another team member?",
            choices: ["Engineer", "Intern", "No, I'm done"],
          },
        ])
        .then((answers) => {
          const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
          );
          teamMembers.push(engineer);
          if (answers.addMore === "Intern") {
            // Prompt for intern information
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "name",
                  message: "What is the intern's name?",
                },
                {
                  type: "input",
                  name: "id",
                  message: "What is the intern's ID?",
                },
                {
                  type: "input",
                  name: "email",
                  message: "What is the intern's email address?",
                },
                {
                  type: "input",
                  name: "school",
                  message: "What is the intern's school?",
                },
              ])
              .then((answers) => {
                const intern = new Intern(
                  answers.name,
                  answers.id,
                  answers.email,
                  answers.school
                );
                teamMembers.push(intern);
                console.log(teamMembers);
              });
          } else {
            console.log(teamMembers);
          }
        });
    } else if (answers.addMore === "Intern") {
        // Prompt for intern information
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is the intern's name?",
            },
            {
              type: "input",
              name: "id",
              message: "What is the intern's ID?",
            },
            {
              type: "input",
              name: "email",
              message: "What is the intern's email address?",
            },
            {
              type: "input",
              name: "school",
              message: "What is the intern's school?",
            },
          ])
          .then((internAnswers) => {
            const intern = new Intern(
              internAnswers.name,
              internAnswers.id,
              internAnswers.email,
              internAnswers.school
            );
            teamMembers.push(intern);
            console.log("Intern added successfully!");
            addMoreMembers();
          });
      } else {
        // Generate HTML page
        generateHTML(teamMembers);
      }
      
     
      
      // read the Handlebars template file
const templateHtml = fs.readFileSync('template.html', 'utf8');

// compile the Handlebars template
const template = Handlebars.compile(templateHtml);
      
      // generate the HTML content using the template and data
      const html = template({ teamMembers });
      
      // write the HTML content to a file named 'team.html'
      fs.writeFile('team.html', html, (err) => {
        if (err) throw err;
        console.log('The HTML file has been saved!');
      });
      
    });