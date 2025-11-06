import logo from "../images/Logo.png"
import lightMode from "../images/lightMode.png"

function Header() {
  return (
    <div className="bg-white mr-5 rounded-2xl flex justify-between items-center pl-5 pr-10 h-19">
        <img className="w-30" src={logo} alt="logo" />
        <img className="w-[40px] h-[40px]" src={lightMode} alt="" />
    </div>
  )
}

export default Header
