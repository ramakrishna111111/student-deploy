import React, { useState } from "react";

const CourseType = ({ courseTypes, setCourseTypes }) => {
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!name.trim()) {
      alert("Course type name cannot be empty");
      return;
    }

    if (courseTypes.some((t) => t.name === name && t.id !== editId)) {
      alert("Course type already exists");
      return;
    }

    if (editId !== null) {
      setCourseTypes((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, name } : t))
      );
      setEditId(null);
    } else {
      setCourseTypes((prev) => [...prev, { id: Date.now(), name }]);
    }

    setName("");
  };

  const handleEdit = (type) => {
    setEditId(type.id);
    setName(type.name);
  };

  const handleDelete = (id) => {
    setCourseTypes((prev) => prev.filter((t) => t.id !== id));
    if (editId === id) {
      setEditId(null);
      setName("");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Course Types</h2>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Course Type Name"
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
        {courseTypes.map((type) => (
          <li
            key={type.id}
            className="flex justify-between items-center border-b pb-1"
          >
            <span>{type.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(type)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(type.id)}
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

export default CourseType;
