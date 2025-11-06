import logo from "../images/Logo.png"
import lightMode from "../images/lightMode.png"

function Header() {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-sm">
        <img className="w-20 max-w-[120px] sm:w-24 lg:w-28" src={logo} alt="logo" />
        <img className="h-10 w-10" src={lightMode} alt="toggle theme" />
    </div>
  )
}

export default Header
