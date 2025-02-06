import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
        const data = await response.json();
        if (data.length > 0) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchAllPosts();
  }, [posts]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.length > 0) {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchAllUsers();
  }, [users]);

  const makeAdmin = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "ADMIN" }),
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? data : user))
        );
      }
    } catch (error) {
      console.error("Error changing user status.", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user.", error);
    }
  };

  return (
    <>
      {isAuthenticated && user.status === "ADMIN" ? (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Hi, Admin!</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">All Users</h2>
            {users.length > 0 ? (
              <ul className="space-y-2">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center p-3 bg-white rounded-lg shadow"
                  >
                    <span>{user.email}</span>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Change Password
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                      {user.status !== "ADMIN" && (
                        <button
                          onClick={() => makeAdmin(user.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">All Posts</h2>
            {posts.length > 0 ? (
              <ul className="space-y-2">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="flex justify-between items-center p-3 bg-white rounded-lg shadow"
                  >
                    <span>{post.title}</span>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Delete
                      </button>
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                        Show Comments
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts.</p>
            )}
          </div>
        </div>
      ) : (
        <div>Not authorized.</div>
      )}
    </>
  );
};

export default Dashboard;
