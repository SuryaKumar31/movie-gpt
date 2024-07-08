import { useDispatch, useSelector } from "react-redux"
import logo from "../assets/logo.png"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { addUser, removeUser } from "../utils/userSlice"

const Header = () => {
  const user = useSelector(store => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user

        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL
        }))

        navigate("/browse")

      } else {
        dispatch(removeUser())
        navigate("/")
      }
    });
  }, [])


  return (
    <header className="absolute bg-gradient-to-b from-black border border-green-600 flex justify-between w-full">
      <img src={logo} alt="logo" className="w-56" />

      {user && <div className="flex items-center">
        <img src={user?.photoURL} alt="logo" className="w-20 h-20 rounded-full" />
        <button onClick={handleSignOut} className="bg-red-500 px-5 py-2 rounded ml-2 text-black font-semibold">Sign out</button>
      </div>}

    </header>
  )
}

export default Header