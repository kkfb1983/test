# Write your MySQL query statement below
SELECT
 d. NAME AS Department,
 temp. NAME AS Employee,
 temp.Salary AS Salary
FROM
 (
  SELECT
   e1.Id,
   e1. NAME,
   e1.Salary,
   e1.DepartmentId
  FROM
   Employee e1
  WHERE
   (
    SELECT
     count(DISTINCT(Salary))
    FROM
     Employee e2
    WHERE
     e1.DepartmentId = e2.DepartmentId
    AND e1.Salary <= e2.Salary
   ) <= 3
  ORDER BY
   e1.Salary DESC
 ) AS temp
JOIN Department d ON temp.DepartmentId = d.Id
ORDER BY
 d.Id,
 temp.Salary DESC;