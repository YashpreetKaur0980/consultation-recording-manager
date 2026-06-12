"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(
  localStorage.getItem("users") || "[]"
);

const matchedUser = users.find(
  (user: any) =>
    user.email === email &&
    user.password === password
);

    if (matchedUser) {
    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem(
    "loggedInUser",
    JSON.stringify(matchedUser)
  );

    alert(`Welcome ${matchedUser.fullName}!`);

    router.push("/");
} else {
  alert("Invalid Email or Password");
  }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 text-white flex-col justify-center px-16">
        <div>
          <div className="text-7xl mb-6">🎙️</div>

          <h1 className="text-5xl font-bold leading-tight">
            Consultation
            <br />
            Recording Manager
          </h1>

          <p className="mt-6 text-indigo-100 text-lg leading-8">
            Securely manage consultation recordings,
            track statuses, review notes, and access
            all records from one centralized dashboard.
          </p>

          <div className="mt-10 space-y-4 text-indigo-100">
            <div>✓ Consultation Tracking</div>
            <div>✓ Dashboard Analytics</div>
            <div>✓ CSV Export</div>
            <div>✓ Secure Authentication</div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3 lg:hidden">
              🎙️
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-xl p-3 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-3">
              Demo Credentials
            </h3>

            <p className="text-gray-600">
              Email: admin@gmail.com
            </p>

            <p className="text-gray-600">
              Password: admin123
            </p>
          </div>
          
          <p className="text-center mt-6 text-gray-600">
           Don't have an account?{" "}
           <a
           href="/register"
           className="text-indigo-600 font-semibold hover:underline"
           >
           Create Account
           </a>
           </p>

          <p className="text-center text-gray-400 text-sm mt-8">
            Secure access to consultation records
          </p>
        </div>
      </div>
    </main>
  );
}