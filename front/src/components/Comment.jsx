import { useState } from "react";

const Comment = ({
  comment,
  handleEdit,
  handleDelete,
  isAuthenticated,
  showAuthor,
  user,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.content);

  const handleSave = async () => {
    await handleEdit(comment.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="border-b pb-4">
      <p className="font-bold text-gray-700">
        {showAuthor(comment.user.username, comment.user.email)}
      </p>
      {isEditing ? (
        <textarea
          className="w-full p-2 border rounded-lg"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p className="text-gray-600 mt-1">{comment.content}</p>
      )}
      <p className="text-sm text-gray-400 mt-1">
        {comment.createdAt.slice(0, 10)}
      </p>
      {isAuthenticated && comment.userId === user.id && (
        <div className="mt-2 flex justify-center space-x-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="text-green-500">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
