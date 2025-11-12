function AdminShopCard() {
  return ( 
    <div className="shadow-lg rounded-2xl shadow-[#65CD99] h-60 w-60 bg-[#65CD99] flex flex-col justify-center items-center gap-8">
      <p className="text-white font-bold text-4xl">Hassan's</p>
      <p className="text-white font-bold text-4xl mt-[-20px]">Shop</p>
      <button className="bg-white text-[#65CD99] font-bold rounded-2xl p-3 px-10 transition duration-300 ease-in-out hover:bg-black hover:border-2 hover:border-white">Details</button>
    </div>
  )
}

export default AdminShopCard
