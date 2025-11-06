interface StoreItem {
  image: string;  
  name: string                  
}

function StoreCard({image, name} : StoreItem) {
  return (
    <div className="border-1 border-gray-300 w-70 rounded-3xl  flex flex-col justify-center items-center pt-5 pb-10">
        <p className="bg-[#F7F0E0] p-5 px-15 rounded-br-3xl rounded-t-3xl">{name}</p>
        <img className="w-35 mt-5" src={image} alt="store logo" />
        <button className="bg-[#EAEAEA] font-bold mt-8 w-30 h-10 transition duration-300 ease-in-out hover:bg-black hover:text-[#F7F0E0]">Explore</button>
    </div>
  )
}

export default StoreCard
