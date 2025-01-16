import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "./BackButton";

const Post = ({ title, content }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
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
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      <BackButton />
    </div>
  );
};

export default Post;
