import Post from "./Post";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
          setRecentPost({ title: data[0].title, content: data[0].content });
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Tis the home page!
      </h1>
      <div className="space-y-6">
        <section className="bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold">Most recent post</h2>
          <Post
            title={recentPost.title}
            content={recentPost.content.slice(0, 40)}
          />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Previous posts</h2>
          <div className="space-y-4">
            {allPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-md shadow-sm hover:shadow-md"
              >
                <Link to={`/post/${post.id}`}>
                  <h4 className="text-xl font-medium">{post.title}</h4>
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
