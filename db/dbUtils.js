// calling function to view department and query current table
function viewTeamDepts() {
    connection.query('SELECT * FROM department', (error, data) => {
        if (error) throw error
        console.table(dept);
        trackMyTeam();
    });
}

// calling function to view team role and query current table

function viewTeamRoles() {
    connection.query('SELECT * FROM employee', (error, data) => { 
        if (error) throw error
        console.table(roles)
        trackMyTeam();
    });
}

// calling function to view team employees and query current table

function viewTeamEmps() {
    connection.query('SELECT * FROM employee', (error, data) => {
        if (error) throw error 
        console.table(employees)
        trackMyTeam();
    });
}