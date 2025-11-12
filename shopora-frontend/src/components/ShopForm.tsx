import { useNavigate } from "react-router-dom";


function ShopForm() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#65CD99] h-screen px-20">
      <div className="pt-10 flex w-full max-w-5xl flex-col gap-10">
        <button
            type="button"
            onClick={() => navigate("/welcome-create")}
            className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
        >
            Back
        </button>
       </div>
       <div className="bg-white w-[100%] rounded-3xl h-[80%] flex flex-col justify-center gap-5 items-center mt-5">
         <p className="text-gray-400 font-bold text-3xl">Ask the admin for a permission</p>
         <input type="text" className="bg-gray-300 w-[50%] p-3 mt-5 rounded-2xl text-gray-700" placeholder="Shop title.." />
         <input type="text" className="bg-gray-300 w-[50%] p-3 flex items-start h-40 rounded-2xl text-gray-700" placeholder="Shop description.."/>
         <input type="text" className="bg-gray-300 w-[50%] p-3 rounded-2xl text-gray-700" placeholder="Phone number.."/>
         <button className="bg-[#65CD99] text-white font-bold py-3 px-10 rounded-2xl transition hover:bg-white hover:border-2 hover:border-[#65CD99] hover:text-[#65CD99]">Submit</button>
       </div>
    </div>
  )
}

export default ShopForm
