import { useNavigate } from "react-router-dom";

function ShopForm() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-[#65CD99] px-4 pb-10 pt-6 sm:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <button
          type="button"
          onClick={() => navigate("/welcome-create")}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
        >
          Back
        </button>
        <div className="mt-6 flex flex-1 items-center justify-center">
          <div className="flex w-full flex-col items-center gap-5 rounded-3xl bg-white px-6 py-10 text-center shadow-xl sm:px-10 lg:px-16">
            <p className="text-2xl font-bold text-gray-400 sm:text-3xl">Ask the admin for a permission</p>
            <input
              type="text"
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
              placeholder="Shop title.."
            />
            <textarea
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
              placeholder="Shop description.."
              rows={5}
            />
            <input
              type="text"
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
              placeholder="Phone number.."
            />
            <button className="bg-[#65CD99] text-white font-bold py-3 px-10 rounded-2xl transition hover:bg-white hover:border-2 hover:border-[#65CD99] hover:text-[#65CD99]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopForm;
