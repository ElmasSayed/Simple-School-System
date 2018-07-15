use simpleschoolsystem;

-- skipped to insert manually the tid for each student. Instead did this to automatically insert it since i already had the gid in students and teachers table.
-- insert into teacherstudents
SELECT distinct tid,sid
FROM students
LEFT JOIN teachers ON teachers.gid = students.gid
ORDER BY sid;
        
 select * from teacherstudents;   
 
 -- -----------------------same done here below too
 -- insert into teachergrades
SELECT tid,gid
FROM teachers
ORDER BY tid;