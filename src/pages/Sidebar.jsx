import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";



export const Sidebar =() => {

  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("logged out")
    }).catch((error) => {
      // An error happened.
      console.log("not able to login")
    });
    if(!auth){
      navigate('/')
      console.log("Logged out")
    }
  }

    return (
    //     <div>
    //      <aside className="bg-gradient-to-b from-blue-600 to-blue-400 text-white w-40 p-4 transition-transform transform hover:scale-105">
    //   <ul>
    //     <li className="mb-6">
    //       <Link to="/createPost" className="text-lg font-semibold hover:text-blue-200">
    //         Create Post
    //       </Link>
    //     </li>
    //     <li>
    //       <button onClick={logOut}>
    //       <Link to="/" className="text-lg font-semibold hover:text-red-200">
    //         Log Out
    //       </Link>
    //       </button>
          
    //     </li>
    //   </ul>
    // </aside>
    //     </div>
    <div>
      {/* Logo or App Name */}
      <div className="text-white text-2xl font-semibold mb-14">
        Crime Alert
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-2 mb-10">
         
          <li className="mb-5">
            <Link to="/createPost"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Create Post
            </Link>
          </li>
          <li className="mb-5">
            <button onClick={logOut}>
            <Link to="/"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Log Out
            </Link>
            </button>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      {/* <div className="text-gray-400 text-sm mt-4">
        &copy; 2023 Crime Alert
      </div> */}
    </div>
    )
}