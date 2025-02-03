import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && user.status === "ADMIN" ? (
        <div>
          <h1>Hi, Admin!</h1>
          <div>All Users</div>
          <div>All Posts</div>
        </div>
      ) : (
        <div>Not authorized.</div>
      )}
    </>
  );
};

export default Dashboard;
