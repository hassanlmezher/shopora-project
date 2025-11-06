interface StoreItem {
  image: string;  
  name: string                  
}

function StoreCard({image, name} : StoreItem) {
  return (
    <div className="border-1 border-[#939393] flex flex-col justify-center items-center pt-5">
        <p className="bg-[#F7F0E0] p-5 px-15 rounded-br-3xl rounded-t-3xl">{name}</p>
        <img className="w-35 mt-5" src={image} alt="store logo" />
      
    </div>
  )
}

export default StoreCard
