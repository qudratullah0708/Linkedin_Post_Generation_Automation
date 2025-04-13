import React, { useState } from "react";

const CreateLinkedInPost = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleCreatePost = async () => {
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("http://localhost:9000/post_to_linkedin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers here, like Authorization if needed
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setStatus("success");
      setMessage(data.message || "Post successfully created!");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Create LinkedIn Post
      </h2>

      <button
        onClick={handleCreatePost}
        disabled={status === "loading"}
        className={`w-full px-4 py-2 rounded-lg text-white font-medium transition ${
          status === "loading"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {status === "loading" ? "Posting..." : "Generate & Post"}
      </button>

      {status === "success" && (
        <div className="mt-4 text-green-600 text-sm font-medium text-center">
          ✅ {message}
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 text-red-600 text-sm font-medium text-center">
          ❌ {message}
        </div>
      )}
    </div>
  );
};

export default CreateLinkedInPost;
