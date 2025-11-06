import { useNavigate } from 'react-router-dom';
import welcomepic from "../images/welcome.png"

function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-[#65CD99] px-6 py-12 text-white lg:flex-row lg:items-center lg:px-24 lg:py-16">
      <div className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        <div className="space-y-2">
          <p className="text-5xl font-bold sm:text-6xl lg:text-7xl xl:text-8xl">Shop</p>
          <p className="text-5xl font-bold sm:text-6xl lg:text-7xl xl:text-8xl">smart.</p>
          <p className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Live better.</p>
        </div>
        <button
          onClick={handleGetStarted}
          className="mt-4 w-full max-w-xs rounded-3xl bg-white py-4 text-lg font-bold text-black transition duration-300 ease-in-out hover:bg-black hover:text-white sm:text-xl lg:mt-10 lg:max-w-[220px] lg:py-[18px] lg:text-2xl"
        >
          Get started
        </button>
      </div>
      <img
        className="mt-10 w-full max-w-xs sm:max-w-sm lg:mt-0 lg:max-w-xl xl:max-w-2xl"
        src={welcomepic}
        alt="welcome illustration"
      />
    </div>
  )
}

export default Welcome
