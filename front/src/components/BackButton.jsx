import { Link } from "react-router-dom";

const BackButton = ({ text }) => {
  return (
    <div>
      <Link to={"/"}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          {text}
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
