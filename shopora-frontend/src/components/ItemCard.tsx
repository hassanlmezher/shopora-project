import stars from "../images/5stars.png"


interface ProductItem {
  image: string;        
  name: string;          
  namee: string;          
  price: string;        
  description: string;    
  ratings: string;       
  by: string;             
}

function ItemCard({image, name, namee, price, description, ratings, by}: ProductItem) {
  return (
    <div className="shadow-lg shadow-gray-500 flex flex-col justify-center items-center p-4">
      <img className="w-40" src={image} alt="item image" />
      <p className="absolute top-118 ml-22 font-bold">{price}</p>
      <p className="text-2xl font-bold ml-[-30px] ">{name}</p>
      <p className="text-2xl font-bold ml-13">{namee}</p>
      <p className="text-gray-500">{description}</p>
      <img className="w-30 ml-[-50px]" src={stars} alt="stars ratings" />
      <p className="text-gray-400 absolute top-148 ml-30">{ratings}</p>
      <p className="ml-55 text-gray-600 font-bold mt-[-13px]">{by}</p>
      <div className="flex justify-center items-center gap-5 mt-7">
        <button className="bg-[#5DBC8C] text-white font-bold w-40 h-10 rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-2 hover:border-black">Add to cart</button>
        <button className="bg-white border-2 border-[#5DBC8C] text-[#5DBC8C] font-bold w-35 h-11 rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-2 hover:border-black">Details</button>
      </div>


      

    </div>
  )
}

export default ItemCard
