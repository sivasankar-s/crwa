import { Link } from "react-router-dom";

export const Sidebar =() => {
    return (
        <div>
         <aside className="bg-gradient-to-b from-blue-600 to-blue-400 text-white w-40 p-4 transition-transform transform hover:scale-105">
      <ul>
        <li className="mb-6">
          <Link to="/createPost" className="text-lg font-semibold hover:text-blue-200">
            Create Post
          </Link>
        </li>
        <li>
          <Link to="/logout" className="text-lg font-semibold hover:text-red-200">
            Log Out
          </Link>
        </li>
      </ul>
    </aside>
        </div>
    )
}