import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [text, setText] = useState("");

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

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: text,
          }),
        }
      );
      if (response.ok) {
        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment]);
        setText("");
      } else {
        console.error("Failed to post comment: ", await response.json());
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  const handleEdit = (id) => {};

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        console.log("Comment deleted successfully");
      } else {
        console.error("Failed to delete comment: ", await response.json());
      }
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
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
            {isAuthenticated && comment.userId === user.id && (
              <div className="mt-2 flex justify-center space-x-4">
                <button
                  onClick={() => handleEdit(comment.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        {isAuthenticated ? (
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none
            focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Write a comment..."
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          ></textarea>
        ) : (
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="You must log in to write a comment."
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            disabled
          ></textarea>
        )}
        <button
          onClick={postComment}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
