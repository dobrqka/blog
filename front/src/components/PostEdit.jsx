import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PostEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { defThumbnail, defTitle, defContent } = state || {};

  const [thumbnail, setThumbnail] = useState(defThumbnail || "");
  const [title, setTitle] = useState(defTitle || "");
  const [content, setContent] = useState(defContent || "");
  const [error, setError] = useState(null);

  const editPost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content,
            thumbnail,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("Post edit successful:", data);
        navigate("/");
      } else {
        setError(data.message || "Post edit failed");
      }
    } catch (error) {
      console.error("Error editing post: ", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Post</h2>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={(e) => {
            editPost(e);
          }}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Post
        </button>
      </form>
    </div>
  );
};

export default PostEdit;
