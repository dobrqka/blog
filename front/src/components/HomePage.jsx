import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PostThumbnail from "./PostThumbnail";
import { AuthContext } from "../contexts/AuthContext.jsx";

const HomePage = () => {
  const [recentPost, setRecentPost] = useState({ title: "", content: "" });
  const [allPosts, setAllPosts] = useState([]);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts?limit=1&sort=desc`
        );
        const data = await response.json();
        if (data.length > 0) {
          setRecentPost({ ...data[0] });
        }
      } catch (error) {
        console.error("Error fetching the most recent post: ", error);
      }
    };
    fetchRecentPost();
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
        const data = await response.json();
        if (data.length > 0) {
          setAllPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen space-y-10">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
          Welcome to the Blog
        </h1>
        {isAuthenticated ? (
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <h2 className="text-lg font-medium text-gray-700">
              Welcome, {user.email}!
            </h2>
            <button
              onClick={logout}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Logout
            </button>
            <Link to="/new-post">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                New Post
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
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
      </header>

      <main className="space-y-10">
        {/* Most Recent Post Section */}
        <section className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Most Recent Post
          </h2>
          <Link to={`/post/${recentPost.id}`} className="block">
            <PostThumbnail
              title={recentPost.title}
              content={recentPost.content.slice(0, 40)}
              thumbnail={recentPost.thumbnail}
            />
          </Link>
        </section>

        {/* Previous Posts Section */}
        <section className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Previous Posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                <Link to={`/post/${post.id}`}>
                  <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                    {post.title}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
