import Empty from "@/components/Empty";
import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useStudents from "./hooks/useStudents";

const GRADES = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"];
const DEPARTMENTS = [
  "computer science",
  "information systems",
  "information technology",
];

function StudentsPage() {
  const { students, isFetchingStudents } = useStudents();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const filteredStudents = students?.filter((student) => {
    const gradeFilter = searchParams.get("grade") || "all";
    const departmentFilter = searchParams.get("department") || "all";

    const matchSearch =
      student.full_name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());

    const matchGrade =
      gradeFilter === "all" ||
      student.grade?.toLowerCase() === gradeFilter.toLowerCase();

    const matchDepartment =
      departmentFilter === "all" ||
      student.department?.toLowerCase() === departmentFilter.toLowerCase();

    return matchSearch && matchGrade && matchDepartment;
  });

  const studentsCount = filteredStudents?.length;

  const columns = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "grade", label: "Grade" },
    { key: "department", label: "Department" },
    { key: "exams_count", label: "Exams" },
    { key: "average_score", label: "Avg Score", render: (v) => `${v}%` },
    { key: "highest_score", label: "Highest", render: (v) => `${v}%` },
    { key: "pass_rate", label: "Pass Rate", render: (v) => `${v}%` },
  ];

  if (isFetchingStudents) return <Loader />;

  if (!students?.length) return <Empty message='No Students Found' />;

  return (
    <div className='bg-bg flex min-h-screen flex-col gap-6'>
      <div>
        <h1 className='font-display text-text text-2xl font-semibold'>
          Students List
        </h1>
        {/* <p className='text-text-muted mt-1 text-sm'>
          Browse and filter your students
        </p> */}
        <p className='text-text-muted mt-1 text-sm'>
          {studentsCount} {studentsCount === 1 ? "student" : "students"} found
        </p>
      </div>
      <div className={`flex items-center gap-2 sm:gap-4`}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type='search'
          className={`bg-surface-2 p-md text-text text-md w-10/12 flex-1 rounded-md font-medium sm:w-9/12`}
          placeholder={`Search By Name`}
        />
        <select
          onChange={(e) => {
            e.target.value === "all"
              ? searchParams.delete("grade")
              : searchParams.set("grade", e.target.value);
            setSearchParams(searchParams);
          }}
          className='bg-surface-2 p-md text-text w-2/12 rounded-md text-base font-medium'
        >
          <option value='all'>All Grades</option>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => {
            e.target.value === "all"
              ? searchParams.delete("department")
              : searchParams.set("department", e.target.value);
            setSearchParams(searchParams);
          }}
          className='bg-surface-2 p-md text-text w-2/12 rounded-md text-base font-medium'
        >
          <option value='all'>All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {filteredStudents.length > 0 ? (
        <GenericTable columns={columns} data={filteredStudents} />
      ) : (
        <Empty message='No Students Found' />
      )}
    </div>
  );
}

export default StudentsPage;
