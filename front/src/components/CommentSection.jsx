import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${id}/comments`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };
    fetchComments();
  }, []);

  const showAuthor = (user, email) => {
    if (user !== "NULL") {
      return user;
    }
    return email;
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <p className="font-bold text-gray-700">
              {showAuthor(comment.user.username, comment.user.email)}
            </p>
            <p className="text-gray-600 mt-1">{comment.content}</p>
            <p className="text-sm text-gray-400 mt-1">
              {comment.createdAt.slice(0, 10)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Write a comment..."
        ></textarea>
        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
