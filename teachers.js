const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});


pool.query(`
SELECT DISTINCT(teachers.name) as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests on assistance_requests.teacher_id = teachers.id
JOIN students on students.id = assistance_requests.student_id
JOIN cohorts on cohorts.id = students.cohort_id
WHERE cohorts.name = '${process.argv[2]}'
ORDER BY teachers.name;
`)
.then(res => {
  res.rows.forEach(res => {
    console.log(`${process.argv[2]}:${res.teacher}`);
  })
});