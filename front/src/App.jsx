import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Post from "./components/Post.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Register from "./components/Register.jsx";
import PostCreate from "./components/PostCreate.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-post" element={<PostCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
