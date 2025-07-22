import React, { useState } from "react";

const Offerings = ({ courses, courseTypes, offerings, setOfferings }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdateOffering = () => {
    if (!selectedCourse || !selectedType) {
      alert("Please select both course and course type");
      return;
    }

    const duplicate = offerings.some(
      (o) =>
        o.courseId === selectedCourse &&
        o.typeId === selectedType &&
        o.id !== editId
    );

    if (duplicate) {
      alert("This course offering already exists");
      return;
    }

    if (editId !== null) {
      setOfferings((prev) =>
        prev.map((o) =>
          o.id === editId
            ? { ...o, courseId: selectedCourse, typeId: selectedType }
            : o
        )
      );
      setEditId(null);
    } else {
      setOfferings((prev) => [
        ...prev,
        { id: Date.now(), courseId: selectedCourse, typeId: selectedType },
      ]);
    }

    setSelectedCourse("");
    setSelectedType("");
  };

  const handleEdit = (offering) => {
    setEditId(offering.id);
    setSelectedCourse(offering.courseId);
    setSelectedType(offering.typeId);
  };

  const handleDelete = (id) => {
    setOfferings((prev) => prev.filter((o) => o.id !== id));
    if (editId === id) {
      setEditId(null);
      setSelectedCourse("");
      setSelectedType("");
    }
  };

  const getCourseName = (id) => courses.find((c) => c.id === id)?.name || "";
  const getTypeName = (id) => courseTypes.find((t) => t.id === id)?.name || "";

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Course Offerings</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <select
          className="border px-3 py-2 rounded flex-1"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(Number(e.target.value))}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded flex-1"
          value={selectedType}
          onChange={(e) => setSelectedType(Number(e.target.value))}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddOrUpdateOffering}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {offerings.map((o) => (
          <li
            key={o.id}
            className="flex justify-between items-center border-b pb-1"
          >
            <span>
              {getTypeName(o.typeId)} - {getCourseName(o.courseId)}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(o)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(o.id)}
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

export default Offerings;
