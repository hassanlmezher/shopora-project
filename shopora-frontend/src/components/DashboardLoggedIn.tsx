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
import { useNavigate } from 'react-router-dom'
import cart from "../images/cart.png"
import logout from "../images/logout.png"
import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent as ReactFocusEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import useCartStore from "../store/useCartStore";
import useDashboardLayout from "../hooks/useDashboardLayout";

const catalogue = [
    {
        image: headphones,
        name: "Wirless",
        namee: "Headphones",
        price: "$199",
        priceValue: 199,
        description: "A perfect balance of high-fidelity audio",
        ratings: "(123)",
        by: "Ali's shop",
        category: "Headphones"
    },
    {
        image: tShirt,
        name: "Metalica",
        namee: "T-shirt",
        price: "$299",
        priceValue: 299,
        description: "A high quality clothes brand.",
        ratings: "(101)",
        by: "Hassan's shop",
        category: "Shirts"
    },
    {
        image: shoes,
        name: "Travis",
        namee: "Nike shoes",
        price: "$399",
        priceValue: 399,
        description: "Crafted for comfort. Designed for confidence.",
        ratings: "(211)",
        by: "Dani's shop",
        category: "Shoes"
    }
];

const ALL_CATEGORIES = "All Categories";

const categoryOptions = [ALL_CATEGORIES, "Shirts", "Headphones", "Shoes"] as const;

const priceValues = catalogue.map(item => item.priceValue);
const priceBounds = {
    min: Math.min(...priceValues),
    max: Math.max(...priceValues)
};

function DashboardLoggedIn() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<(typeof categoryOptions)[number]>(ALL_CATEGORIES);
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: priceBounds.min, max: priceBounds.max });
    const [priceDraft, setPriceDraft] = useState({ min: priceBounds.min.toString(), max: priceBounds.max.toString() });
    const [isPriceExpanded, setIsPriceExpanded] = useState(false);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const priceContainerRef = useRef<HTMLDivElement | null>(null);
    const minPriceInputRef = useRef<HTMLInputElement | null>(null);
    const maxPriceInputRef = useRef<HTMLInputElement | null>(null);
    const isDesktopLayout = useDashboardLayout();
    const totalCartItems = useCartStore(
        (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    const filteredItems = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();
        return catalogue.filter(item => {
            const haystack = `${item.name} ${item.namee} ${item.description} ${item.by} ${item.category}`.toLowerCase();
            const matchesSearch = !normalized || haystack.includes(normalized);
            const matchesPrice = item.priceValue >= priceRange.min && item.priceValue <= priceRange.max;
            const matchesCategory = selectedCategory === ALL_CATEGORIES || item.category === selectedCategory;
            return matchesSearch && matchesPrice && matchesCategory;
        });
    }, [searchTerm, priceRange, selectedCategory]);

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

    const toggleCategories = () => {
        setIsCategoriesExpanded((prev) => !prev);
    };

    const handleCategoriesBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
        const nextFocus = event.relatedTarget as Node | null;
        if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
            setIsCategoriesExpanded(false);
        }
    };

    const handleCategoriesKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            setIsCategoriesExpanded(false);
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleCategories();
        }
    };

    const handleCategorySelect = (option: (typeof categoryOptions)[number]) => {
        setSelectedCategory(option);
        setIsCategoriesExpanded(false);
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

    const commitMinPrice = () => {
        const numeric = Number(priceDraft.min);
        const base = Number.isNaN(numeric) ? priceRange.min : numeric;
        const clamped = Math.min(Math.max(base, priceBounds.min), priceRange.max);
        setPriceRange(prev => (prev.min === clamped ? prev : { ...prev, min: clamped }));
        setPriceDraft(prev => (prev.min === clamped.toString() ? prev : { ...prev, min: clamped.toString() }));
    };

    const commitMaxPrice = () => {
        const numeric = Number(priceDraft.max);
        const base = Number.isNaN(numeric) ? priceRange.max : numeric;
        const clamped = Math.max(Math.min(base, priceBounds.max), priceRange.min);
        setPriceRange(prev => (prev.max === clamped ? prev : { ...prev, max: clamped }));
        setPriceDraft(prev => (prev.max === clamped.toString() ? prev : { ...prev, max: clamped.toString() }));
    };

    const handlePriceBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
        const nextFocus = event.relatedTarget as Node | null;
        if (nextFocus && priceContainerRef.current?.contains(nextFocus)) {
            return;
        }
        commitMinPrice();
        commitMaxPrice();
        setIsPriceExpanded(false);
    };

    const handlePriceInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            commitMinPrice();
            commitMaxPrice();
            setIsPriceExpanded(false);
        }
    };

    const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        setPriceDraft(prev => ({ ...prev, min: nextValue }));

        if (nextValue === "") {
            return;
        }

        const numeric = Number(nextValue);
        if (Number.isNaN(numeric)) {
            return;
        }

        if (numeric < priceBounds.min || numeric > priceRange.max) {
            return;
        }

        setPriceRange(prev => ({ ...prev, min: numeric }));
    };

    const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        setPriceDraft(prev => ({ ...prev, max: nextValue }));

        if (nextValue === "") {
            return;
        }

        const numeric = Number(nextValue);
        if (Number.isNaN(numeric)) {
            return;
        }

        if (numeric > priceBounds.max || numeric < priceRange.min) {
            return;
        }

        setPriceRange(prev => ({ ...prev, max: numeric }));
    };

    const handleMinPriceBlur = () => {
        commitMinPrice();
    };

    const handleMaxPriceBlur = () => {
        commitMaxPrice();
    };

    const renderMobileLayout = () => (
        <div className="flex min-h-screen flex-col gap-6 bg-[#5AB688] px-4 pb-16 pt-6 text-white">
            <header className="flex items-center justify-between">
                <img className="w-24" src={logo} alt="logo" />
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="relative rounded-full bg-white/20 p-2"
                        aria-label="Go to cart"
                    >
                        <img className="w-7" src={cart} alt="cart" />
                        {totalCartItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#FF6B6B] px-1 text-xs font-bold text-white">
                                {totalCartItems}
                            </span>
                        )}
                    </button>
                    <img className="h-10 w-10 rounded-full bg-white/20 p-2" src={lightMode} alt="toggle theme" />
                </div>
            </header>
            <section className="rounded-3xl bg-gradient-to-br from-[#5DBC8C] to-[#E3C59F] p-6 shadow-lg">
                <p className="text-3xl font-bold">Check out</p>
                <p className="text-2xl font-semibold">All available</p>
                <button
                    className="mt-6 w-full rounded-2xl bg-white py-3 text-lg font-semibold text-[#DDC59E] transition duration-300 ease-in-out hover:bg-[#DDC59E] hover:text-white"
                    onClick={() => navigate('/stores')}
                >
                    Stores
                </button>
            </section>
            <section className="space-y-4 rounded-3xl bg-white/20 p-4 backdrop-blur-sm">
                <div>
                    <label className="text-sm font-semibold text-white/80">Search</label>
                    <div className="mt-2 flex items-center gap-3 rounded-2xl bg-white px-3 py-2">
                        <img className="w-5" src={search} alt="search" />
                        <input
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            type="search"
                            placeholder="Type to search..."
                            className="flex-1 bg-transparent text-sm font-semibold text-[#5DBC8C] placeholder-[#9DB7AA] focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-semibold text-white/80">Categories</label>
                    <select
                        value={selectedCategory}
                        onChange={(event) => handleCategorySelect(event.target.value as (typeof categoryOptions)[number])}
                        className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm font-semibold text-[#5DBC8C] focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        {categoryOptions.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-white/80">Min price</label>
                        <input
                            value={priceDraft.min}
                            onChange={handleMinPriceChange}
                            onBlur={handleMinPriceBlur}
                            type="number"
                            min={priceBounds.min}
                            max={priceBounds.max}
                            className="mt-2 rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm font-semibold text-[#5DBC8C] focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-white/80">Max price</label>
                        <input
                            value={priceDraft.max}
                            onChange={handleMaxPriceChange}
                            onBlur={handleMaxPriceBlur}
                            type="number"
                            min={priceBounds.min}
                            max={priceBounds.max}
                            className="mt-2 rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm font-semibold text-[#5DBC8C] focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                </div>
            </section>
            <section className="space-y-4">
                {filteredItems.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {filteredItems.map(item => (
                            <ItemCard
                                key={item.namee}
                                image={item.image}
                                name={item.name}
                                namee={item.namee}
                                price={item.price}
                                priceValue={item.priceValue}
                                description={item.description}
                                ratings={item.ratings}
                                by={item.by}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-2xl bg-white/20 p-6 text-center text-sm font-semibold text-white">
                        No items match your filters right now.
                    </p>
                )}
            </section>
            <div className="mt-auto flex flex-col gap-3">
                <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#E6C79A] transition duration-300 ease-in-out hover:bg-[#E6C79A] hover:text-white"
                    onClick={() => navigate('/DashboardLoggedIn')}
                >
                    <img className="w-5" src={home} alt="home" />
                    Home
                </button>
                <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#E6C79A] transition duration-300 ease-in-out hover:bg-[#E6C79A] hover:text-white"
                    onClick={() => navigate('/settings')}
                >
                    <img className="w-5" src={settings} alt="settings" />
                    Settings
                </button>
                <button
                    className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white bg-transparent px-4 py-3 text-sm font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-[#65CD99]"
                    onClick={() => navigate('/login')}
                >
                    <img className="w-5" src={logout} alt="logout" />
                    Log Out
                </button>
            </div>
        </div>
    );

    const renderDesktopLayout = () => (
        <div className="bg-[#5AB688] h-230 pt-5 ">
            <div className="bg-white mr-5 rounded-2xl flex items-center justify-between pl-5 pr-10 h-19 relative">
                <img className="w-30" src={logo} alt="logo" />
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => navigate('/cart')}
                            className="relative"
                            aria-label="Go to cart"
                        >
                            <img className="w-9" src={cart} alt="cart" />
                            {totalCartItems > 0 && (
                                <span className="absolute -bottom-1 -right-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#FF6B6B] px-1 text-xs font-bold text-white">
                                    {totalCartItems}
                                </span>
                            )}
                        </button>
                    </div>
                    <img className="w-[40px] h-[40px]" src={lightMode} alt="toggle theme" />
                </div>
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
                            <ItemCard
                                key={item.namee}
                                image={item.image}
                                name={item.name}
                                namee={item.namee}
                                price={item.price}
                                priceValue={item.priceValue}
                                description={item.description}
                                ratings={item.ratings}
                                by={item.by}
                            />
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
                <div
                    className={`relative flex items-center gap-3 h-11 rounded-2xl px-4 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5AB688] ${isCategoriesExpanded ? "w-56 bg-white text-[#5DBC8C] shadow-lg" : "w-44 text-white hover:bg-white hover:text-[#E6C79A] cursor-pointer"}`}
                    onClick={(event) => {
                        event.currentTarget.focus();
                        toggleCategories();
                    }}
                    onBlur={handleCategoriesBlur}
                    onKeyDown={handleCategoriesKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="listbox"
                    aria-expanded={isCategoriesExpanded}
                    aria-label="Filter by product category"
                >
                    <img className="w-6" src={categories} alt="categories logo" />
                    <div className="flex flex-1 items-center justify-between">
                        <span className="font-bold text-[15px] whitespace-nowrap">
                            {selectedCategory}
                        </span>
                        <svg
                            className={`h-3 w-3 transform transition-transform duration-200 ${isCategoriesExpanded ? "rotate-180" : ""}`}
                            viewBox="0 0 12 8"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M1 1.333 6 6.333 11 1.333"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    {isCategoriesExpanded && (
                        <ul
                            className="absolute left-0 top-full z-10 mt-2 w-full overflow-hidden rounded-2xl bg-white py-1 shadow-xl ring-1 ring-[#CDE6D6]"
                            role="listbox"
                        >
                            {categoryOptions.map(option => {
                                const isActive = option === selectedCategory;
                                return (
                                    <li key={option}>
                                        <button
                                            type="button"
                                            className={`w-full px-4 py-2 text-left text-sm font-semibold transition-colors duration-150 ${isActive ? "bg-[#5DBC8C] text-white" : "text-[#5DBC8C] hover:bg-[#F3FBF6]"}`}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleCategorySelect(option);
                                            }}
                                            role="option"
                                            aria-selected={isActive}
                                        >
                                            {option}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
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
                            onClick={(event) => event.stopPropagation()}
                            role="group"
                            aria-label="Price range inputs"
                        >
                            <input
                                ref={minPriceInputRef}
                                value={priceDraft.min}
                                onChange={handleMinPriceChange}
                                onBlur={handleMinPriceBlur}
                                onKeyDown={handlePriceInputKeyDown}
                                type="number"
                                min={priceBounds.min}
                                max={priceBounds.max}
                                className="w-24 rounded-xl border border-[#CDE6D6] bg-white px-3 py-1 text-sm font-semibold text-[#5DBC8C] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5DBC8C]"
                            />
                            <span className="text-[#5DBC8C] font-semibold">-</span>
                            <input
                                ref={maxPriceInputRef}
                                value={priceDraft.max}
                                onChange={handleMaxPriceChange}
                                onBlur={handleMaxPriceBlur}
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
    );

  return (
    <div className="min-h-screen bg-[#5AB688]">
        {isDesktopLayout ? renderDesktopLayout() : renderMobileLayout()}
    </div>
  )
}

export default DashboardLoggedIn
