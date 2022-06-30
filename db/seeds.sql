USE track_my_team_db;

INSERT INTO department(name)
VALUES
("HR"),
("Technology"),
("Design");

INSERT INTO role(title, salary, department_id)
VALUES
("Head of People", 95000, 1),
("Teach Lead", 165000, 2),
("Full Stack Dev", 135000, 2),
("UX Designer", 110000, 3),
("Graphic Designer", 90000, 3);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Gus", "Burton", 1, NULL),
("Spencer", "Shawn", 2, 1),
("Jules", "OHarah", 3, 1),
("Henry", "Spencer", 3, 2);


