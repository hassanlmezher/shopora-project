import { useNavigate } from 'react-router-dom';
import welcomepic from "../images/welcome.png"

function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative flex min-h-screen flex-col mt-[-100px] overflow-hidden bg-[#8DB9FF] text-white">
      <div className="pointer-events-none absolute left-1/2 top-[10%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl md:w-[600px] md:h-[600px]" />
      <div className="relative z-10 flex flex-1 flex-col items-center gap-10 px-6 py-16 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-20">
        <div className="flex flex-1 flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <div className="space-y-3">
            <p className="text-5xl font-extrabold drop-shadow-sm sm:text-6xl md:text-7xl xl:text-8xl">
              Shop
            </p>
            <p className="text-5xl font-extrabold drop-shadow-sm sm:text-6xl md:text-7xl xl:text-8xl lg:pl-8">
              smart.
            </p>
            <p className="text-3xl font-semibold text-white/90 sm:text-4xl md:text-5xl lg:pl-20">
              Live better.
            </p>
          </div>
          
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button
              onClick={handleGetStarted}
              className="w-full max-w-[220px] rounded-3xl bg-white py-4 text-lg font-bold text-[#8DB9FF] transition duration-300 ease-in-out hover:bg-black hover:text-white sm:text-xl"
            >
              Get started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full max-w-[220px] rounded-3xl border-2 border-white py-4 text-lg font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-[#8DB9FF] sm:text-xl"
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-white/20 blur-2xl sm:-inset-10" />
            <img
              className="relative w-full max-w-xs drop-shadow-xl sm:max-w-md lg:max-w-xl xl:max-w-2xl"
              src={welcomepic}
              alt="welcome illustration"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
