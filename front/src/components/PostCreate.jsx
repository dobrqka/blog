import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const PostCreate = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("null");
  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          thumbnail,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Post creation successful:", data);
        navigate("/");
      } else {
        setError(data.message || "Post creation failed");
      }
    } catch (error) {
      console.error("Error creating post: ", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a Post</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700"
          >
            URL to Image
          </label>
          <input
            type="text"
            id="thumbnail"
            onChange={(e) => {
              setThumbnail(e.target.value);
            }}
            value={thumbnail}
            placeholder="Enter image URL"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="heading"
            className="block text-sm font-medium text-gray-700"
          >
            Heading
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter heading"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            placeholder="Write your content here"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={(e) => {
            createPost(e);
          }}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
