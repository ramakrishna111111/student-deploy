import React, { useState } from "react";
import CourseType from "./components/CourseType";
import Courses from "./components/Courses";
import Offerings from "./components/Offerings";
import Registration from "./components/Registration";


const App = () => {
  const [courses, setCourses] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [offerings, setOfferings] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Student Registration System
        </h1>

        <CourseType
          courseTypes={courseTypes}
          setCourseTypes={setCourseTypes}
          offerings={offerings}
          setOfferings={setOfferings}
        />

        <Courses
          courses={courses}
          setCourses={setCourses}
          offerings={offerings}
          setOfferings={setOfferings}
        />

        <Offerings
          courses={courses}
          courseTypes={courseTypes}
          offerings={offerings}
          setOfferings={setOfferings}
        />

        <Registration
          offerings={offerings}
          courseTypes={courseTypes}
          courses={courses}
        />
      </div>
    </div>
  );
};

export default App;
