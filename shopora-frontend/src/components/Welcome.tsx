import { useNavigate } from 'react-router-dom';
import welcomepic from "../images/welcome.png"

function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#65CD99] h-screen ">
      <p className="text-white text-8xl font-bold absolute top-20 left-40">Shop</p>
      <p className="text-white text-8xl font-bold absolute top-45 left-45">smart.</p>
      <p className="text-white text-5xl font-bold absolute top-80 left-60">Live better.</p>
      <button onClick={handleGetStarted} className="bg-white text-black text-2xl font-bold w-[220px] h-[70px] rounded-3xl absolute top-110 left-60 transition duration-300 ease-in-out hover:bg-black hover:text-white">Get started</button>
      <img className="w-130 absolute right-30 top-2" src={welcomepic} alt="welcome pic" />
    </div>
  )
}

export default Welcome
