// app/login/page.tsx
"use client";

// Removed import { useRouter } from "next/navigation"; as it's not available in this environment.
import React, { useState } from "react";

// Placeholder for AuthContext, replace with your actual AuthContext if needed
// For the purpose of making this code runnable in a standalone React immersive,
// I'm creating a mock AuthContext. In your Next.js app, ensure you have
// a proper AuthContext setup that exports `useAuth`.
const mockAuthContext = {
  login: (user: any) => {
    console.log("Mock login called with user:", user);
    // In a real app, this would set user state, tokens, etc.
  },
};
const useAuth = () => mockAuthContext; // Mock useAuth for standalone demo

// MessageBox component to replace native alert()
const MessageBox = ({ message, onClose, type = 'error' }: { message: string; onClose: () => void; type?: 'error' | 'success' }) => {
  if (!message) return null;

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  const hoverBgColor = type === 'error' ? 'hover:bg-red-600' : 'hover:bg-green-600';
  const ringColor = type === 'error' ? 'focus:ring-red-500' : 'focus:ring-green-500';
  const title = type === 'error' ? 'Erro de Login' : 'Sucesso!';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`${bgColor} ${hoverBgColor} text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 ${ringColor} focus:ring-opacity-50`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() { // Renamed to App for Canvas compatibility
  const { login } = useAuth();
  // Removed useRouter as it's not applicable in this environment.
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for custom error message
  const [successMessage, setSuccessMessage] = useState(""); // State for custom success message

  /**
   * Handles the login process by sending a POST request to the backend.
   * @param {string} nome - The username to send for login.
   */
  const handleLogin = async (nome: string) => {
    setLoading(true); // Set loading to true while the request is in progress
    setErrorMessage(""); // Clear any previous error messages
    setSuccessMessage(""); // Clear any previous success messages

    try {
      // Send a POST request to the backend login endpoint
      const res = await fetch("/users/login", { // Ensure this URL matches your backend route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }), // Send the username in the request body as JSON
      });

      // Check if the response was successful (status code 2xx)
      if (!res.ok) {
        // If not successful, parse the error response from the backend
        const errorData = await res.json();
        // Throw an error with the backend's error message, or a default one
        throw new Error(errorData.error || "Erro desconhecido ao fazer login.");
      }

      // Parse the successful response as JSON
      const user = await res.json();
      console.log("Login successful:", user);

      // Call the login function from AuthContext to update global auth state
      login(user);

      // Display a success message instead of redirecting
      // In a real Next.js app, router.push('/') would be here.
      setSuccessMessage(`Login bem-sucedido para: ${user.nome}!`);

    } catch (err: any) {
      // Catch any errors during the fetch or JSON parsing
      console.error("Login failed:", err);
      // Set the error message state to display in the MessageBox
      setErrorMessage(err.message || "Ocorreu um erro ao tentar fazer login.");
    } finally {
      // Always set loading to false after the request completes, regardless of success or failure
      setLoading(false);
    }
  };

  // Function to close the message box
  const closeMessageBox = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)]">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Login</h2>
        <p className="text-gray-600 mb-8">Escolha como deseja entrar:</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleLogin("João Artesão")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin mr-2">⚙️</span>
            ) : (
              "Entrar como Vendedor"
            )}
          </button>
          <button
            onClick={() => handleLogin("Maria Cliente")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin mr-2">⚙️</span>
            ) : (
              "Entrar como Cliente"
            )}
          </button>
        </div>
      </div>

      {/* Custom Message Box for displaying errors */}
      <MessageBox message={errorMessage} onClose={closeMessageBox} type="error" />
      <MessageBox message={successMessage} onClose={closeMessageBox} type="success" />
    </div>
  );
}
