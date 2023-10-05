import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { getDoc, doc, getDocs, collection, addDoc } from "firebase/firestore";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginButton = async () => {
        event.preventDefault();
        console.log(email)
        console.log(password)

        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log(auth?.currentUser?.email)

          const userRef = collection(db, "users");
          const docData = await getDocs(userRef);

          let name;
          let phone;

          const filteredData = docData.docs.map((doc) => ({...doc.data(), id: doc.id}))
          console.log(filteredData)

          filteredData.forEach((doc) => {
            if(doc.userId == auth.currentUser.uid){
              name = doc.fullName;
              phone = doc.phoneNo;
            }
          })

          console.log(name);
          console.log(phone);

          // notification.success({
          //   message: "Logged In Successfully"
          // })
          if(auth){
            alert("Logged In Successful")
            navigate('/home')
          }
          
        } catch (err) {
          console.error(err)
        }

    }


    ////////// Removed
    const onGoogleSignIn = async () => {
      try {
        const result = await signInWithRedirect(auth, googleProvider);
        const user = result.user;
        // await addDoc(collectionRef, {
        //   fullName: fname,
        //   phoneNo: phn,
        //   userId: user.uid
        // })

        // console.log(auth?.currentUser?.displayName);
        const collectionRef = collection(db, "users");

          await addDoc(collectionRef, {
            fullName: user.displayName,
            phoneNo: user.phoneNumber,
            userId: user.uid
          })

          let name;
          let phone;

          const filteredData = docData.docs.map((doc) => ({...doc.data(), id: doc.id}))
          console.log(filteredData)

          filteredData.forEach((doc) => {
            if(doc.userId == auth.currentUser.uid){
              name = doc.fullName;
              phone = doc.phoneNo;
            }
          })

          console.log(name);
          console.log(phone);

        
      } catch (err) {
        console.error(err)
      }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
  <div className="bg-white p-8 rounded-lg shadow-md w-96">
    <h2 className="text-2xl font-semibold mb-6">Login</h2>
    <form>
      <div className="mb-4">
        <label className = "block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email" type="email" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}}/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" >Password</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit" onClick={loginButton}>
          Sign In
        </button>

      {//Sign in with Google
}

      {/* <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded flex items-center space-x-2 focus:outline-none focus:ring focus:border-blue-300"
        onClick={onGoogleSignIn}>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 48 48"
        className="fill-current text-blue-600"
      >
        <path m="https://www.google.com/imgres?imgurl=https%3A%2F%2Ffreesvg.org%2Fimg%2F1534129544.png&tbnid=H-Zt4EVV-a_P_M&vet=12ahUKEwjz1ZrX4quBAxWc2zgGHQPFBRIQMygBegQIARBQ..i&imgrefurl=https%3A%2F%2Ffreesvg.org%2F1534129544&docid=TY2bWxXSom9gaM&w=600&h=600&q=google%20logo%20icon%20svg&ved=2ahUKEwjz1ZrX4quBAxWc2zgGHQPFBRIQMygBegQIARBQ" />
      </svg> 
      <span>Sign In with Google</span>
    </button> */}


        <Link to="/register">
        <button className="inline-block align-baseline font-sm text-blue-500 hover:text-blue-800" >
          New User? Register
        </button>
        </Link>
        
      </div>
    </form>
  </div>
</div>

    )
}