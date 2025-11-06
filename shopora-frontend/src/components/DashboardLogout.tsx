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
import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent as ReactFocusEvent, KeyboardEvent as ReactKeyboardEvent } from "react";

const catalogue = [
    {
        image: headphones,
        name: "Wirless",
        namee: "Headphones",
        price: "$199",
        priceValue: 199,
        description: "A perfect balance of high-fidelity audio",
        ratings: "(123)",
        by: "Ali's shop"
    },
    {
        image: tShirt,
        name: "Metalica",
        namee: "T-shirt",
        price: "$299",
        priceValue: 299,
        description: "A high quality clothes brand.",
        ratings: "(101)",
        by: "Hassan's shop"
    },
    {
        image: shoes,
        name: "Travis",
        namee: "Nike shoes",
        price: "$399",
        priceValue: 399,
        description: "Crafted for comfort. Designed for confidence.",
        ratings: "(211)",
        by: "Dani's shop"
    }
];

const priceValues = catalogue.map(item => item.priceValue);
const priceBounds = {
    min: Math.min(...priceValues),
    max: Math.max(...priceValues)
};

function DashboardLogout() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: priceBounds.min, max: priceBounds.max });
    const [isPriceExpanded, setIsPriceExpanded] = useState(false);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const priceContainerRef = useRef<HTMLDivElement | null>(null);
    const minPriceInputRef = useRef<HTMLInputElement | null>(null);
    const maxPriceInputRef = useRef<HTMLInputElement | null>(null);

    const filteredItems = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();
        return catalogue.filter(item => {
            const haystack = `${item.name} ${item.namee} ${item.description} ${item.by}`.toLowerCase();
            const matchesSearch = !normalized || haystack.includes(normalized);
            const matchesPrice = item.priceValue >= priceRange.min && item.priceValue <= priceRange.max;
            return matchesSearch && matchesPrice;
        });
    }, [searchTerm, priceRange]);

    const expandSearch = () => {
        if (isSearchExpanded) {
            return;
        }

        setIsSearchExpanded(true);
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 0);
    };

    const handleSearchBlur = () => {
        if (!searchTerm.trim()) {
            setIsSearchExpanded(false);
        }
    };

    const handleSearchContainerKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (isSearchExpanded) {
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            expandSearch();
        }
    };

    const handleSearchInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            setSearchTerm("");
            setIsSearchExpanded(false);
            setTimeout(() => {
                searchInputRef.current?.blur();
            }, 0);
        }
    };

    const expandPrice = () => {
        if (isPriceExpanded) {
            return;
        }

        setIsPriceExpanded(true);
        setTimeout(() => {
            minPriceInputRef.current?.focus();
        }, 0);
    };

    const handlePriceContainerClick = () => {
        if (!isPriceExpanded) {
            expandPrice();
        }
    };

    const handlePriceContainerKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (isPriceExpanded) {
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            expandPrice();
        }
    };

    const handlePriceBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
        const nextFocus = event.relatedTarget as Node | null;
        if (nextFocus && priceContainerRef.current?.contains(nextFocus)) {
            return;
        }
        setIsPriceExpanded(false);
    };

    const handlePriceInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            setIsPriceExpanded(false);
            setTimeout(() => {
                priceContainerRef.current?.focus();
            }, 0);
        }
    };

    const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = Number(event.target.value);
        if (Number.isNaN(nextValue)) {
            return;
        }

        setPriceRange(prev => {
            const clamped = Math.max(priceBounds.min, Math.min(nextValue, prev.max));
            if (clamped === prev.min) {
                return prev;
            }
            return { ...prev, min: clamped };
        });
    };

    const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = Number(event.target.value);
        if (Number.isNaN(nextValue)) {
            return;
        }

        setPriceRange(prev => {
            const clamped = Math.min(priceBounds.max, Math.max(nextValue, prev.min));
            if (clamped === prev.max) {
                return prev;
            }
            return { ...prev, max: clamped };
        });
    };
  return (
    <div className="bg-[#5AB688] h-230 pt-5 ">
        <div className="bg-white mr-5 rounded-2xl flex justify-between items-center pl-5 pr-10 h-19">
            <img className="w-30" src={logo} alt="logo" />
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
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <ItemCard key={item.namee} image={item.image} name={item.name} namee={item.namee} price={item.price} description={item.description} ratings={item.ratings} by={item.by}/>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No items match your filters right now.</p>
                )}
            </div>
        </div>
            <div className="pt-16 pl-2 flex flex-col justify-center  gap-8 fixed top-20 left-0">
            <button className="flex gap-4 p-4 items-center bg-white w-44 h-11 rounded-2xl">
                <img className="w-6" src={home} alt="home logo" />
                <p className="text-[#E6C79A] font-bold text-[16px]">Home</p>
            </button>
            <div
                className={`flex items-center gap-3 h-11 rounded-2xl px-4 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5AB688] ${isSearchExpanded ? "w-72 bg-white text-[#5DBC8C] shadow-lg cursor-text" : "w-44 text-white hover:bg-white hover:text-[#E6C79A] cursor-pointer"}`}
                onClick={expandSearch}
                onFocus={expandSearch}
                onKeyDown={handleSearchContainerKeyDown}
                role="button"
                tabIndex={0}
                aria-expanded={isSearchExpanded}
            >
                <img className="w-6" src={search} alt="search logo" />
                {isSearchExpanded ? (
                    <input
                        ref={searchInputRef}
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onBlur={handleSearchBlur}
                        onKeyDown={handleSearchInputKeyDown}
                        onClick={(event) => event.stopPropagation()}
                        type="search"
                        placeholder="Type to search..."
                        className="flex-1 bg-transparent font-bold text-[#5DBC8C] placeholder-[#9DB7AA] focus:outline-none"
                    />
                ) : (
                    <span className="font-bold text-[16px]">Search</span>
                )}
            </div>
            <button className="flex text-white text-[15px] font-bold gap-4 p-4 items-center w-44 h-11 rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-[#E6C79A]">
                <img className="w-6" src={categories} alt="categories logo" />
                Categories
            </button>
            <div
                ref={priceContainerRef}
                className={`flex items-center gap-3 h-11 rounded-2xl px-4 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5AB688] ${isPriceExpanded ? "w-80 bg-white text-[#5DBC8C] shadow-lg cursor-text" : "w-44 text-white hover:bg-white hover:text-[#E6C79A] cursor-pointer"}`}
                onClick={handlePriceContainerClick}
                onFocus={expandPrice}
                onBlur={handlePriceBlur}
                onKeyDown={handlePriceContainerKeyDown}
                role="button"
                tabIndex={0}
                aria-expanded={isPriceExpanded}
                aria-label="Filter by price range"
            >
                <img className="w-8" src={price} alt="price range logo" />
                {isPriceExpanded ? (
                    <div
                        className="flex w-full items-center gap-2"
                        onClick={preventContainerClickPropagation}
                        role="group"
                        aria-label="Price range inputs"
                    >
                        <input
                            ref={minPriceInputRef}
                            value={priceRange.min}
                            onChange={handleMinPriceChange}
                            onKeyDown={handlePriceInputKeyDown}
                            type="number"
                            min={priceBounds.min}
                            max={priceBounds.max}
                            className="w-24 rounded-xl border border-[#CDE6D6] bg-white px-3 py-1 text-sm font-semibold text-[#5DBC8C] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5DBC8C]"
                        />
                        <span className="text-[#5DBC8C] font-semibold">-</span>
                        <input
                            ref={maxPriceInputRef}
                            value={priceRange.max}
                            onChange={handleMaxPriceChange}
                            onKeyDown={handlePriceInputKeyDown}
                            type="number"
                            min={priceBounds.min}
                            max={priceBounds.max}
                            className="w-24 rounded-xl border border-[#CDE6D6] bg-white px-3 py-1 text-sm font-semibold text-[#5DBC8C] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5DBC8C]"
                        />
                    </div>
                ) : (
                    <span className="font-bold text-[16px]">Price Range</span>
                )}
            </div>
            <button className="flex gap-4 p-5 ml-1 h-15 mt-3 items-center border-2 text-white font-bold text-[18px] border-[#DDC59E] w-38 rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-[#DDC59E] hover:w-42 hover:border-none" onClick={() => navigate('/login')}>
                <img className="w-8" src={login} alt="login logo" />
                Log In
            </button>
            
        </div>
      
    </div>
  )
}

export default DashboardLogout
