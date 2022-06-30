const mySQL = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");
const utils = require("util");
const connection = require("./db/connection");

// setting default department array
const departments = [];

function trackMyTeam() {
  inquirer
    .prompt({
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View team departments",
        "View team roles",
        "View team employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update current employee role",
        "Quit",
      ],
    })
    .then((res) => {
      switch (res.choices) {
        case "View team departments":
          viewTeamDepts();
          break;

        case "View team roles":
          viewTeamRoles();
          break;

        case "View team employees":
          viewTeamEmps();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Quit":
          console.log("Ready to leave?");
          connection.end();
          break;
      }
    });
}

// Functionality to view team departments

function viewTeamDepts() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    //viewDepartment();
    trackMyTeam();
  });
}

// Functionality to view team roles

function viewTeamRoles() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    trackMyTeam();
  });
}

// Functionality to view team employees

function viewTeamEmps() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(employees);
    trackMyTeam();
  });
}

// Function to add in a new department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Add your new department: ",
        validate: (responses) => {
          if (responses) {
            return true;
          } else {
            console.log("Enter your new department name.");
          }
        },
      },
    ])
    .then((responses) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: responses.department,
        },
        (error) => {
          if (error) throw error;
          console.log(`New Department ${responses.department} added!`);
          trackMyTeam();
        }
      );
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name",
      },

      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name",
      },

      {
        type: "input",
        name: "role_id",
        message: "Enter the Employee's role ID",
      },

      {
        type: "input",
        name: "manager_id",
        message: "Enter the Employee's manager id",
      },
    ])
    .then((responses) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: responses.first_name,
          last_name: responses.last_name,
          role_id: responses.role_id,
          manager_id: responses.manager_id,
        },
        (error) => {
          if (error) throw error;
          console.log("New employee ${responses.employee} added!");
          trackMyTeam();
        }
      );
    });
  const selectRole = "SELECT * FROM employee, role";
  connection.query(selectRole, (error, results) => {
    if (error) throw error;
    console.table(results);
  });
}

// adding in function to add new role

function addRole() {
  console.log("new role");
  const chooseDepartment = deptId.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Enter the title of your new role",
        validate: (responses) => {
          if (responses) {
            return true;
          } else {
            console.log("The title of role is needed");
          }
        },
      },

      {
        type: "input",
        name: "salary",
        message: "Enter salary of new role",
        validate: (responses) => {
          if (responses) {
            return true;
          } else {
            console.log("Salary required!");
          }
        },
      },

      {
        type: "list",
        name: "department",
        message: "Which department does this role belong to?",
        choices: chooseDepartment,
        validate: (responses) => {
          if (responses) {
            return true;
          } else {
            console.log("error");
          }
        },
      },
    ])
    .then((responses) => {
      connection.query(
        `INSERT INTO role SET ?`,
        {
          title: responses.role,
          salary: responses.salary,
          department_id: responses.department,
        },
        (error) => {
          if (error) throw error;
          console.log(`New role ${responses.role} added!`);
          viewTeamRoles();
          trackMyTeam();
        }
      );
    });
}

// Creating function to update a team employee's info ** not functional atm

function updateEmpRole(empRole, empId) {
  let updateRole = connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [empRole, empId],
    function (err, role) {
      if (err) throw err;
    }
  );
  updateEmpRole();
}

// Function to view team departments
function viewTeamDepts() {
  connection.query("SELECT * FROM department", (error, data) => {
    if (error) throw error;
    console.table(data);
    //viewDepartment();
    trackMyTeam();
  });
}

// Function to view team roles
function viewTeamRoles() {
  connection.query("SELECT * FROM role", (error, data) => {
    if (error) throw error;
    console.table(data);
    trackMyTeam();
  });
}

// function to view all team employees
function viewTeamEmps() {
  connection.query("SELECT * FROM employee", (error, data) => {
    if (error) throw error;
    console.table(data);
    trackMyTeam();
  });
}

const deptId = [];

// modifying query instance to populate child records from departments

function populate() {
  connection.query("SELECT name FROM department", (error, data) => {
    if (error) throw error;
    for (let i = 0; i < data.length; i++) {
      departments.push(data[i].name);
    }
    console.log(departments);
  });
  deptId.length = 0;
  connection.query("SELECT * FROM department", (error, data) => {
    if (error) throw error;
    for (let i = 0; i < data.length; i++) {
      deptId.push(data[i]);
    }
    console.log(deptId);
  });
};

populate();
trackMyTeam();
