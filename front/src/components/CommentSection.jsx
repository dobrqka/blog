import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import Comment from "./Comment";

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

  const handleEdit = async (commentId, newText) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${id}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newText }),
        }
      );

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: newText }
              : comment
          )
        );
      } else {
        console.error("Failed to edit comment: ", await response.json());
      }
    } catch (error) {
      console.error("Error editing comment: ", error);
    }
  };

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
          <Comment
            key={comment.id}
            comment={comment}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isAuthenticated={isAuthenticated}
            showAuthor={showAuthor}
            user={user}
          />
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
