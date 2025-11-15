import { useNavigate } from "react-router-dom";

function WelcomeCreate() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#8DB9FF] px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-base font-semibold text-[#1F3B2F] shadow-md transition hover:bg-[#f0fff7]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 text-[#1F3B2F]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>

        <div className="mt-6 flex flex-1 flex-col rounded-[2.5rem] bg-white px-6 py-20 text-center shadow-xl  sm:px-10 sm:py-12 md:px-16 md:py-16">
          <div className="space-y-1">
            <p className="text-4xl font-bold text-[#8DB9FF] sm:text-5xl md:text-6xl">Create</p>
            <p className="text-4xl font-bold text-[#8DB9FF] sm:text-5xl md:text-6xl">Your own</p>
            <p className="text-5xl font-bold text-[#8DB9FF] sm:text-6xl md:text-7xl">Shop!</p>
          </div>

          <div className="mt-10 flex w-full flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/shopForm")}
              className="w-full max-w-xs rounded-[999px] bg-[#8DB9FF] px-5 py-3 text-lg font-semibold text-white transition hover:bg-[#53b785] sm:text-xl"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCreate;
