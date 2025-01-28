import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import BackButton from "./BackButton";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Post = ({ title, content }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

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

  if (!post && !title && !content) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackButton text={"Back"} />
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user.email}!</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
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
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <img className="post-image" src={post.thumbnail}></img>
      <p>{post.content}</p>
      <CommentSection />
    </div>
  );
};

export default Post;
