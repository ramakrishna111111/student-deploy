import React, { useState } from "react";

const Registration = ({ offerings, courseTypes, courses }) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [studentName, setStudentName] = useState("");
  const [registrations, setRegistrations] = useState([]);

  const handleRegister = () => {
    if (!studentName.trim() || !selectedOffering) {
      alert("Please fill in all fields.");
      return;
    }

    setRegistrations((prev) => [
      ...prev,
      { id: Date.now(), name: studentName, offeringId: selectedOffering },
    ]);

    setStudentName("");
    setSelectedOffering("");
  };

  const getCourseName = (courseId) =>
    courses.find((c) => c.id === courseId)?.name || "";

  const getTypeName = (typeId) =>
    courseTypes.find((t) => t.id === typeId)?.name || "";

  const getFilteredOfferings = () =>
    offerings.filter((o) => o.typeId === Number(selectedType));

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Student Registration</h2>

      <div className="grid gap-4 md:grid-cols-3 mb-4">
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setSelectedOffering("");
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Course Type</option>
          {courseTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          value={selectedOffering}
          onChange={(e) => setSelectedOffering(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Offering</option>
          {getFilteredOfferings().map((o) => (
            <option key={o.id} value={o.id}>
              {getTypeName(o.typeId)} - {getCourseName(o.courseId)}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Register
      </button>

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Registered Students</h3>
        <ul className="space-y-2">
          {registrations.map((reg) => {
            const offering = offerings.find((o) => o.id === reg.offeringId);
            return (
              <li
                key={reg.id}
                className="border-b pb-1 text-sm text-gray-700 flex justify-between"
              >
                <span>
                  {reg.name} -{" "}
                  {getTypeName(offering?.typeId)} -{" "}
                  {getCourseName(offering?.courseId)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Registration;
