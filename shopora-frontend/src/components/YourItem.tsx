import shirt from "../images/shirt.png"
import stars from  "../images/5stars.png"

function YourItem() {
  return (
    <div className="shadow-lg h-[420px] rounded-3xl shadow-gray-300 w-[22%] flex flex-col justify-center items-center">
      <img className="w-40" src={shirt} alt="" />
      <p className="font-bold ml-40 mt-1">$199</p>
      <div className="mr-20">
        <p className="font-bold text-[1.3rem]">Metalica</p>
        <p className="font-bold ml-5 text-[1.3rem]">T-shirt</p>
      </div>
      <p className="mt-2 text-sm">A perfect balance of high-fidelity audio</p>
      <div className="flex justify-center items-center gap-3">
        <img className="w-30" src={stars} alt="reviews stars" />
        <p className="text-sm mb-2 text-gray-600">(123)</p>
      </div>
      <div className="flex justify-center items-center gap-5 ">
        <button className="bg-[#5AB688] text-white cursor-pointer h-10 w-28 rounded-2xl hover:bg-white hover:border-2  hover:border-[#5AB688] hover:text-[#5AB688]">View Details</button>
        <button className="bg-white border-2 border-black cursor-pointer font-semibold text-black h-10 w-20 rounded-2xl hover:bg-black hover:text-white ">Remove</button>
      </div>
    </div>
  )
}

export default YourItem
