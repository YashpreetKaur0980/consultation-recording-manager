"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Consultation = {
  id: number;
  clientName: string;
  astrologerName: string;
  consultationDate: string;
  duration: string;
  notes: string;
  status: string;
};

export default function Home() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    router.push("/login");
    return;
  }
   
  const loggedInUser = JSON.parse(
  localStorage.getItem("loggedInUser") || "{}"
);

setUserName(loggedInUser.fullName || "");
  const savedConsultations = JSON.parse(
    localStorage.getItem("consultations") || "[]"
  );

  setConsultations(savedConsultations);
}, [router]);
  const totalCount = consultations.length;

  const pendingCount = consultations.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCount = consultations.filter(
    (item) => item.status === "Completed"
  ).length;

  const reviewedCount = consultations.filter(
    (item) => item.status === "Reviewed"
  ).length;

  const flaggedCount = consultations.filter(
    (item) => item.status === "Flagged"
  ).length;

  const filteredConsultations = consultations.filter((item) =>
  item.clientName
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
  const deleteConsultation = (id: number) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this consultation?"
  );

  if (!confirmDelete) return;

  const updatedConsultations = consultations.filter(
    (item) => item.id !== id
  );

  setConsultations(updatedConsultations);

  localStorage.setItem(
    "consultations",
    JSON.stringify(updatedConsultations)
  );
};
const exportToCSV = () => {
  if (consultations.length === 0) {
    alert("No consultations available to export.");
    return;
  }

  const headers = [
    "Client Name",
    "Astrologer Name",
    "Date",
    "Duration",
    "Status",
    "Notes",
  ];

  const rows = consultations.map((item) => [
    item.clientName,
    item.astrologerName,
    item.consultationDate,
    item.duration,
    item.status,
    item.notes,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "consultations.csv";

  link.click();
};

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white px-8 py-5 shadow">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Consultation Recording Manager
            </h1>

            <p className="text-indigo-100 mt-1">
              Manage and track consultation recordings efficiently
            </p>
            {userName && (
            <p className="text-indigo-200 mt-2">
            Welcome back, {userName} 👋
            </p>
     )}
          </div>

          <div className="flex gap-3">
          <Link
          href="/add-consultation"
          className="bg-white text-indigo-600 px-5 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
          + Add Consultation
          </Link>

          <div className="relative">
  <button
    onClick={() => setShowDropdown(!showDropdown)}
    className="bg-white text-indigo-600 px-5 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
  >
    Welcome, {userName || "User"} 👋 ▼
  </button>

  {showDropdown && (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
      <div className="px-4 py-3 border-b">
        <p className="font-semibold text-gray-800">
          {userName}
        </p>
      </div>

      <button
  onClick={() => {
    alert(`Logged in as: ${userName}`);
  }}
  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700 flex items-center gap-3"
>
  <span>👤</span>
  <span>My Profile</span>
</button>

      <button
  onClick={() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    router.push("/login");
  }}
  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3"
>
  <span>🚪</span>
  <span>Logout</span>
  </button>
  </div>
  )}
</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Total Consultations</p>
            <h2 className="text-4xl font-bold mt-2">
              {totalCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Pending</p>
            <h2 className="text-4xl font-bold mt-2">
              {pendingCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Completed</p>
            <h2 className="text-4xl font-bold mt-2">
              {completedCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Reviewed</p>
            <h2 className="text-4xl font-bold mt-2">
              {reviewedCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Flagged</p>
            <h2 className="text-4xl font-bold mt-2">
              {flaggedCount}
            </h2>
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="mt-10 bg-white rounded-xl shadow">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold">
              Recent Consultations
            </h2>
            <input
              type="text"
              placeholder="Search by client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-80"
            />

            <div className="flex gap-3">
            <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
            Export CSV
            </button>

            <Link
            href="/add-consultation"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
           >
           Add New
           </Link>
         </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Client</th>
                  <th className="text-left p-4">Astrologer</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Duration</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {consultations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-6 text-center text-gray-500"
                    >
                      No consultations added yet.
                    </td>
                  </tr>
                ) : (
                  filteredConsultations.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-4">
                        {item.clientName}
                      </td>

                      <td className="p-4">
                        {item.astrologerName}
                      </td>

                      <td className="p-4">
                        {item.consultationDate}
                      </td>

                      <td className="p-4">
                        {item.duration} mins
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Reviewed"
                              ? "bg-blue-100 text-blue-700"
                              : item.status === "Flagged"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                      <div className="flex gap-2">
                      <Link
                      href={`/add-consultation?id=${item.id}`}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                      >
                      Edit
                      </Link>

                      <button
                      onClick={() => deleteConsultation(item.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                      >
                    Delete
                    </button>
                    </div>
                    </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}