import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostThumbnail from "./PostThumbnail";

const HomePage = () => {
  const [recentPost, setRecentPost] = useState({ title: "", content: "" });
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/posts?limit=1&sort=desc"
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
        const response = await fetch("http://localhost:3000/api/posts");
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
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
        Welcome to the Blog
      </h1>
      <div className="space-y-10">
        <section className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Most Recent Post
          </h2>
          <Link to={`/post/${recentPost.id}`} className="block">
            <PostThumbnail
              title={recentPost.title}
              content={recentPost.content.slice(0, 40)}
            />
          </Link>
        </section>
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
      </div>
    </div>
  );
};

export default HomePage;
