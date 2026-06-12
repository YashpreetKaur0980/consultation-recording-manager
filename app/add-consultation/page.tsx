"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddConsultation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [formData, setFormData] = useState({
    clientName: "",
    astrologerName: "",
    consultationDate: "",
    duration: "",
    notes: "",
    status: "Pending",
  });
  useEffect(() => {
  if (editId) {
    const consultations = JSON.parse(
      localStorage.getItem("consultations") || "[]"
    );

    const consultationToEdit = consultations.find(
      (item: any) => item.id === Number(editId)
    );

    if (consultationToEdit) {
      setFormData({
        clientName: consultationToEdit.clientName,
        astrologerName: consultationToEdit.astrologerName,
        consultationDate: consultationToEdit.consultationDate,
        duration: consultationToEdit.duration,
        notes: consultationToEdit.notes,
        status: consultationToEdit.status,
      });
    }
  }
}, [editId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const existingConsultations = JSON.parse(
    localStorage.getItem("consultations") || "[]"
  );

  if (editId) {
    const updatedConsultations = existingConsultations.map(
      (item: any) =>
        item.id === Number(editId)
          ? {
              ...item,
              ...formData,
            }
          : item
    );

    localStorage.setItem(
      "consultations",
      JSON.stringify(updatedConsultations)
    );

    alert("Consultation Updated Successfully!");
  } else {
    const newConsultation = {
      id: Date.now(),
      ...formData,
    };

    existingConsultations.push(newConsultation);

    localStorage.setItem(
      "consultations",
      JSON.stringify(existingConsultations)
    );

    alert("Consultation Saved Successfully!");
  }

  router.push("/");
};

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">
           {editId
           ? "Edit Consultation"
           : "Add New Consultation"}
          </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium">
              Client Name
            </label>

            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter client name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Astrologer Name
            </label>

            <input
              type="text"
              name="astrologerName"
              value={formData.astrologerName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter astrologer name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Consultation Date
            </label>

            <input
              type="date"
              name="consultationDate"
              value={formData.consultationDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Duration (minutes)
            </label>

            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="e.g. 30"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Upload Recording
            </label>

            <input
              type="file"
              accept="audio/*"
              className="w-full border rounded-lg p-3"
            />

            <p className="text-sm text-gray-500 mt-1">
              Demo Version: Audio file is not stored permanently.
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Notes
            </label>

            <textarea
              rows={4}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter consultation notes..."
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            {editId
            ? "Update Consultation"
            : "Save Consultation"}
          </button>
        </form>
      </div>
    </main>
  );
}