import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, addDoc } from "firebase/firestore";


export const Register= () => {

    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phn, setPhn] = useState(0);

    

    const registerButton = async () => {
        event.preventDefault();
        console.log(fname)
        console.log(email)
        console.log(password)
        console.log(phn)

        try {
          await createUserWithEmailAndPassword(auth, email, password);
          const user = auth?.currentUser;
          // user.displayName = fname;
          // user.phoneNumber = phn;

          // updateProfile(user, {displayName: fname});
          // updateProfile(user, {phoneNumber: phn});

          // updateCurrentUser(auth, user);

          const collectionRef = collection(db, "users");

          await addDoc(collectionRef, {
            fullName: fname,
            phoneNo: phn,
            userId: user.uid
          })



          console.log(auth?.currentUser?.email);
          
        } catch (err) {
          console.error(err)
        }
        

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name" type="text" placeholder="Full Name" onChange={(event) => {setFname(event.target.value)}} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="email" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">Mobile Number</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobile" type="tel" placeholder="Mobile Number" onChange={(event) => {setPhn(event.target.value)}}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" onClick={registerButton}>
              Register
            </button>
            <Link to='/' >
            <button className="inline-block align-baseline font-sm text-blue-500 hover:text-blue-800">
              Login
            </button>
            </Link>
            
          </div>
        </form>
      </div>
    </div>
    )
}