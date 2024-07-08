import Header from "./Header"
import banner from "../assets/banner.jpg"
import { useRef, useState } from "react"
import { checkValidate } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { USER_AVATAR } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  // toggleBtn
  const toggleBtn = () => {
    setIsSignInForm(!isSignInForm)
  }

  // handleSubmit
  const handleSubmit = () => {
    const nameValue = isSignInForm ? "" : name.current.value
    const message = checkValidate(nameValue, email.current.value, password.current.value, isSignInForm)
    setErrorMessage(message)

    if (message) return;

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          //update user name and pic
          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_AVATAR
          }).then(() => {
            //dispatch
            const { uid, email, displayName, photoURL } = auth.currentUser
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL
            }))

            // navigate("/browse")
          }).catch((error) => {
            setErrorMessage(error.message)
          });

          console.log(user);
          alert("Wohoo! Successfully Account Created!")

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} ${errorMessage}`)
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          alert("Successfully Logged In!")
          // navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} ${errorMessage}`)
        });
    }

  }

  return (
    <section className="rounded w-full h-screen relative">
      <Header />
      <img src={banner} alt="banner" className="w-full h-full object-cover" />
      {/* form  */}
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <h1 className="font-bold text-4xl"> {isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input type="text" ref={name} placeholder="Name" className="login-input" />}
        <input type="email" ref={email} className="login-input" placeholder="Email" />
        <input type="password" ref={password} className="login-input" placeholder="Password" />
        <p className="text-red-500 font-semibold">{errorMessage}</p>
        <button className="login-btn" onClick={handleSubmit}> {isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="text-center font-semibold">OR</p>
        <div onClick={toggleBtn}>
          {isSignInForm ?
            <p>New to MovieGPT? <span className="underline text-red-500 cursor-pointer">Sign Up</span> </p> :
            <p>Already Member? <span className="underline text-red-500 cursor-pointer">Sign In</span></p>
          }
        </div>
      </form>
    </section>
  )
}

export default Login