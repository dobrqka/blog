import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Post from "./components/Post.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route paht="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
