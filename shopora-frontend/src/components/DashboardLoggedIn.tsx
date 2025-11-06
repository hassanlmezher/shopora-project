import logo from "../images/Logo.png"
import lightMode from "../images/lightMode.png"
import women from "../images/women.png"
import ItemCard from "./ItemCard";
import headphones from "../images/headphones.png"
import tShirt from "../images/t-shirt.png"
import shoes from "../images/shoes.png"
import home from "../images/home.png"
import search from "../images/search.png"
import settings from "../images/settings.png"
import categories from "../images/categories.png"
import price from "../images/price.png"
import login from "../images/login.png"
import { useNavigate } from 'react-router-dom'
import cart from "../images/cart.png"
import logout from "../images/logout.png"



function DashboardLogout() {
    const navigate = useNavigate();
    const items = [
        {
            image: headphones,
            name: "Wirless",
            namee: "Headphones",
            price: "$199",
            description: "A perfect balance of high-fidelity audio",
            ratings: "(123)",
            by: "Ali's shop"
        },
        {
            image: tShirt,
            name: "Metalica",
            namee: "T-shirt",
            price: "$199",
            description: "A high quality clothes brand.",
            ratings: "(101)",
            by: "Hassan's shop"
        },
        {
            image: shoes,
            name: "Travis",
            namee: "Nike shoes",
            price: "$199",
            description: "Crafted for comfort. Designed for confidence.",
            ratings: "(211)",
            by: "Dani's shop"
        }
    ];
  return (
    <div className="bg-[#5AB688] h-230 pt-5 ">
        <div className="bg-white mr-5 rounded-2xl flex justify-between items-center pl-5 pr-10 h-19">
            <img className="w-30" src={logo} alt="logo" />
            <img className="w-9 absolute right-40" src={cart} alt="cart icon" />
            <img className="w-[40px] h-[40px]" src={lightMode} alt="" />
        </div>
        <div className="absolute bg-white w-290 h-fit pb-20 right-5 top-20 pl-20">
            <div className="bg-linear-to-b from-[#5DBC8C] to-[#E3C59F] w-250 h-50 mt-10">
                <img className="w-80 absolute top-[-11px] right-40" src={women} alt="women" />
                <p className="text-white text-5xl font-bold absolute top-15 left-40">Check out</p>
                <p className="text-white text-4xl font-bold absolute top-30 left-45">All available</p>
                <button className="bg-white text-[#DDC59E] text-2xl font-bold rounded-2xl w-35 h-12 absolute top-45 left-70 transition duration-300 ease-in-out hover:bg-[#DDC59E] hover:text-white hover:border-1 hover:border-amber-50" onClick={() => navigate('/stores')}>Stores</button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-13 ml-[-50px]">
                {items.map(item => <ItemCard key={item.namee} image={item.image} name={item.name} namee={item.namee} price={item.price} description={item.description} ratings={item.ratings} by={item.by}/>)}
            </div>
        </div>
        <div className="pt-16 pl-2 flex flex-col justify-center  gap-8 fixed top-20 left-0">
            <button className="flex gap-4 p-4 items-center bg-white w-44 h-11 rounded-2xl">
                <img className="w-6" src={home} alt="home logo" />
                <p className="text-[#E6C79A] font-bold text-[16px]">Home</p>
            </button>
            <button className="flex gap-4 p-4 items-center w-44 text-white font-bold text-[16px] h-11 rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-[#E6C79A]">
                <img className="w-6" src={search} alt="search logo" />
                Search
            </button>
            <button className="flex text-white text-[15px] font-bold gap-4 p-4 items-center w-44 h-11 rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-[#E6C79A]">
                <img className="w-6" src={categories} alt="categories logo" />
                Categories
            </button>
            <button className="flex  p-2.5 items-center w-44 h-11 rounded-2xl text-white font-bold text-[16px]  transition duration-300 ease-in-out hover:bg-white hover:text-[#E6C79A]">
                <img className="w-8" src={price} alt="price range logo" />
                Price Range
            </button>
            <button className="flex gap-4 p-3 items-center w-44 h-11 rounded-2xl text-white text-[16px] font-bold transition duration-300 ease-in-out hover:bg-white hover:text-[#E6C79A]" onClick={() => navigate('/settings')}>
                <img className="w-6"  src={settings} alt="settings logo" />
                Settings
            </button>
            <button className="flex gap-2 p-5 ml-1 h-15 mt-3 items-center border-2 text-white font-bold text-[17px] border-[#DDC59E] w-38 rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-[#DDC59E] hover:w-42 hover:border-none" onClick={() => navigate('/login')}>
                <img className="w-8" src={logout} alt="login logo" />
                Log Out
            </button>
            
        </div>
      
    </div>
  )
}

export default DashboardLogout
