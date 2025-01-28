import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import BackButton from "./BackButton";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Post = ({ title, content }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post: ", error);
      }
    };
    fetchPost();
  }, [id]);

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete post: ", await response.json());
      }
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  if (!post && !title && !content) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <BackButton text="Back" />
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            {user.id == post.ownerId && (
              <div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  Edit Post
                </button>
                <button
                  onClick={(e) => {
                    deletePost(e);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Delete Post
                </button>
              </div>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <img
          className="w-full h-auto rounded-lg shadow-md"
          src={post.thumbnail}
          alt="Post Thumbnail"
        />
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      <CommentSection />
    </div>
  );
};

export default Post;
