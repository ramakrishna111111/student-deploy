import React, { useState } from "react";

const Courses = ({ courses, setCourses }) => {
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!name.trim()) {
      alert("Course name cannot be empty.");
      return;
    }

    if (courses.some((c) => c.name === name && c.id !== editId)) {
      alert("Course already exists.");
      return;
    }

    if (editId !== null) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, name } : c))
      );
      setEditId(null);
    } else {
      setCourses((prev) => [...prev, { id: Date.now(), name }]);
    }

    setName("");
  };

  const handleEdit = (course) => {
    setEditId(course.id);
    setName(course.name);
  };

  const handleDelete = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    if (editId === id) {
      setEditId(null);
      setName("");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Courses</h2>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Course Name"
          className="border px-3 py-2 rounded flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {courses.map((course) => (
          <li
            key={course.id}
            className="flex justify-between items-center border-b pb-1"
          >
            <span>{course.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(course)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
