import logo from "../assets/logo.png"

const Header = () => {
  return (
    <header className="absolute bg-gradient-to-b from-black">
      <img src={logo} alt="logo" className="w-56" />
    </header>
  )
}

export default Header