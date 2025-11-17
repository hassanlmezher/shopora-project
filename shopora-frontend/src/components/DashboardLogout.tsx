import logo from "../images/Logo.png";
import ThemeToggle from "./ThemeToggle";
import women from "../images/women.png";
import shirt from "../images/shirt.png";
import ItemCard from "./ItemCard";
import { catalogue } from "../data/catalogue";
import home from "../images/home.png";
import search from "../images/search.png";
import categories from "../images/categories.png";
import price from "../images/price.png";
import login from "../images/login.png";
import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState, useEffect } from "react";
import type { ChangeEvent, FocusEvent as ReactFocusEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import useDashboardLayout from "../hooks/useDashboardLayout";
import useNotificationStore, { EMPTY_USER_SHOP_ITEMS } from "../store/useNotificationStore";


function getUpdatedCatalogue() {
    return catalogue.map(item => {
        const savedReviews = localStorage.getItem(`reviews-${item.name}-${item.namee}`);
        if (savedReviews) {
            const parsedReviews = JSON.parse(savedReviews);
            return { ...item, reviews: parsedReviews };
        }
        return item;
    });
}

const ALL_CATEGORIES = "All Categories";

const categoryOptions = [ALL_CATEGORIES, "Shirts", "Headphones", "Shoes"] as const;

const priceValues = catalogue.map(item => item.priceValue);
const priceBounds = {
    min: Math.min(...priceValues),
    max: Math.max(...priceValues)
};

function DashboardLogout() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<(typeof categoryOptions)[number]>(ALL_CATEGORIES);
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: priceBounds.min, max: priceBounds.max });
    const [priceDraft, setPriceDraft] = useState({ min: priceBounds.min.toString(), max: priceBounds.max.toString() });
    const [isPriceExpanded, setIsPriceExpanded] = useState(false);
    const [updatedCatalogue, setUpdatedCatalogue] = useState(getUpdatedCatalogue());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const priceContainerRef = useRef<HTMLDivElement | null>(null);
    const minPriceInputRef = useRef<HTMLInputElement | null>(null);
    const maxPriceInputRef = useRef<HTMLInputElement | null>(null);
    const isDesktopLayout = useDashboardLayout();
    const acceptedRequestItems = useNotificationStore((state) => {
        const acceptedRequest = state.requests.find((request) => request.status === "accepted");
        return acceptedRequest ? acceptedRequest.items : EMPTY_USER_SHOP_ITEMS;
    });

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const handleMobileNavigate = (path: string) => {
        closeMobileMenu();
        navigate(path);
    };

    useEffect(() => {
        const handleReviewsUpdate = () => {
            setUpdatedCatalogue(getUpdatedCatalogue());
        };

        window.addEventListener('reviewsUpdated', handleReviewsUpdate);

        return () => {
            window.removeEventListener('reviewsUpdated', handleReviewsUpdate);
        };
    }, []);

    const catalogueWithCreatorItems = useMemo(() => {
        if (!acceptedRequestItems.length) {
            return updatedCatalogue;
        }
        const creatorItems = acceptedRequestItems.map((item) => ({
            image: item.image || shirt,
            name: item.name,
            namee: item.namee,
            price: item.price,
            priceValue: item.priceValue,
            description: item.description,
            ratings: item.ratings || "(0)",
            by: item.by,
            category: item.category || "Creator",
            reviews: item.reviews ?? [],
        }));
        return [...updatedCatalogue, ...creatorItems];
    }, [updatedCatalogue, acceptedRequestItems]);

    const dynamicPriceBounds = useMemo(() => {
        const allPrices = catalogueWithCreatorItems.map((item) => item.priceValue);
        if (!allPrices.length) {
            return priceBounds;
        }
        return {
            min: Math.min(...allPrices),
            max: Math.max(...allPrices),
        };
    }, [catalogueWithCreatorItems]);

    useEffect(() => {
        setPriceRange((prev) => {
            const updated = {
                min: Math.min(prev.min, dynamicPriceBounds.min),
                max: Math.max(prev.max, dynamicPriceBounds.max),
            };
            if (updated.min === prev.min && updated.max === prev.max) {
                return prev;
            }
            return updated;
        });
    }, [dynamicPriceBounds]);

    const filteredItems = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();
        return catalogueWithCreatorItems.filter(item => {
            const haystack = `${item.name} ${item.namee} ${item.description} ${item.by} ${item.category}`.toLowerCase();
            const matchesSearch = !normalized || haystack.includes(normalized);
            const matchesPrice = item.priceValue >= priceRange.min && item.priceValue <= priceRange.max;
            const matchesCategory = selectedCategory === ALL_CATEGORIES || item.category === selectedCategory;
            return matchesSearch && matchesPrice && matchesCategory;
        });
    }, [searchTerm, priceRange, selectedCategory, catalogueWithCreatorItems]);

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
        const clamped = Math.min(Math.max(base, dynamicPriceBounds.min), priceRange.max);
        setPriceRange(prev => (prev.min === clamped ? prev : { ...prev, min: clamped }));
        setPriceDraft(prev => (prev.min === clamped.toString() ? prev : { ...prev, min: clamped.toString() }));
    };

    const commitMaxPrice = () => {
        const numeric = Number(priceDraft.max);
        const base = Number.isNaN(numeric) ? priceRange.max : numeric;
        const clamped = Math.max(Math.min(base, dynamicPriceBounds.max), priceRange.min);
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

        if (numeric < dynamicPriceBounds.min || numeric > priceRange.max) {
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

        if (numeric > dynamicPriceBounds.max || numeric < priceRange.min) {
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
        <div className={`relative flex min-h-screen flex-col gap-6 bg-[#3B7CFF] px-4 pb-16 pt-6 text-white ${isMobileMenuOpen ? "overflow-hidden" : ""}`}>
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/10"
                        aria-label="Open mobile menu"
                    >
                        <span className="flex flex-col gap-1">
                            <span className="block h-0.5 w-6 rounded-full bg-white" />
                            <span className="block h-0.5 w-4 rounded-full bg-white" />
                            <span className="block h-0.5 w-6 rounded-full bg-white" />
                        </span>
                    </button>
                    <img className="w-24" src={logo} alt="logo" />
                </div>
                <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="rounded-2xl bg-white/20 px-4 py-2 text-sm font-semibold text-white"
                >
                    Log In
                </button>
                <ThemeToggle className="flex-shrink-0" />
            </div>
            </header>
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-black/60 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true">
                    <div className="mx-auto flex h-full w-full max-w-md flex-col rounded-3xl bg-white p-6 text-[#0B3D2E]">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-xl font-bold">Menu</p>
                            <button
                                type="button"
                                onClick={closeMobileMenu}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
                                aria-label="Close mobile menu"
                            >
                                <span className="relative block h-4 w-4">
                                    <span className="absolute inset-0 block h-0.5 w-full rotate-45 bg-[#0B3D2E]" />
                                    <span className="absolute inset-0 block h-0.5 w-full -rotate-45 bg-[#0B3D2E]" />
                                </span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => handleMobileNavigate('/stores')}
                                className="rounded-2xl bg-[#F4FFFA] px-4 py-3 text-left text-lg font-semibold text-[#3B7CFF]"
                            >
                                Stores
                            </button>
                            <button
                                type="button"
                                onClick={() => handleMobileNavigate('/DashboardLoggedIn')}
                                className="rounded-2xl bg-[#F4FFFA] px-4 py-3 text-left text-lg font-semibold text-[#3B7CFF]"
                            >
                                Dashboard
                            </button>
                            <button
                                type="button"
                                onClick={() => handleMobileNavigate('/login')}
                                className="rounded-2xl bg-[#3B7CFF] px-4 py-3 text-left text-lg font-semibold text-white"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <section className="rounded-3xl bg-linear-to-br from-[#7CA6FF] to-[#E3C59F] p-6 shadow-lg">
                <p className="text-3xl font-bold">Welcome to Shopora</p>
                <p className="text-2xl font-semibold">Find products you love</p>
                <button
                    className="mt-6 w-full rounded-2xl bg-white py-3 text-lg font-semibold text-[#DDC59E] transition duration-300 ease-in-out hover:bg-[#DDC59E] hover:text-white"
                    onClick={() => navigate('/stores')}
                >
                    Browse Stores
                </button>
            </section>
            <section className="space-y-4 rounded-3xl border border-white/30 bg-white/10 p-4 backdrop-blur-sm">
                <div>
                    <label className="text-sm font-semibold text-white/80">Search</label>
                    <div className="mt-2 flex items-center gap-3 rounded-2xl bg-white px-3 py-2">
                        <img className="w-5" src={search} alt="search" />
                        <input
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            type="search"
                            placeholder="Type to search..."
                            className="flex-1 bg-transparent text-sm font-semibold text-[#7CA6FF] placeholder-[#9DB7AA] focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-semibold text-white/80">Categories</label>
                    <select
                        value={selectedCategory}
                        onChange={(event) => handleCategorySelect(event.target.value as (typeof categoryOptions)[number])}
                        className="mt-2 w-full rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm font-semibold text-[#7CA6FF] focus:outline-none focus:ring-2 focus:ring-white"
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
                            min={dynamicPriceBounds.min}
                            max={dynamicPriceBounds.max}
                            className="mt-2 rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm font-semibold text-[#7CA6FF] focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-white/80">Max price</label>
                        <input
                            value={priceDraft.max}
                            onChange={handleMaxPriceChange}
                            onBlur={handleMaxPriceBlur}
                            type="number"
                            min={dynamicPriceBounds.min}
                            max={dynamicPriceBounds.max}
                            className="mt-2 rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm font-semibold text-[#7CA6FF] focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                </div>
            </section>
            <section className="space-y-4">
                {filteredItems.length > 0 ? (
                            <div className="grid place-items-center gap-6 sm:grid-cols-2">
                                {filteredItems.map(item => (
                                    <ItemCard
                                        key={item.id ?? `${item.name}-${item.namee}-${item.priceValue}`}
                                        image={item.image}
                                        images={item.images}
                                        name={item.name}
                                namee={item.namee}
                                price={item.price}
                                priceValue={item.priceValue}
                                description={item.description}
                                by={item.by}
                                reviews={item.reviews}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-2xl bg-white/20 p-6 text-center text-sm font-semibold text-white">
                        No items match your filters right now.
                    </p>
                )}
            </section>
            <div className="mt-auto hidden gap-3 sm:grid sm:grid-cols-2">
                <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#E6C79A] transition duration-300 ease-in-out hover:bg-[#E6C79A] hover:text-white"
                    onClick={() => navigate('/')}
                >
                    <img className="w-5" src={home} alt="home" />
                    Home
                </button>
                <button
                    className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white bg-transparent px-4 py-3 text-sm font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-[#8DB9FF]"
                    onClick={() => navigate('/login')}
                >
                    <img className="w-5" src={login} alt="login" />
                    Log In
                </button>
            </div>
        </div>
    );

        const renderDesktopLayout = () => (
        <div className="mx-auto flex max-w-[1400px] gap-8 px-8 py-10">
            <aside className="sticky top-8 flex h-fit w-72 flex-col gap-6 rounded-3xl bg-white/10 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur xl:w-80">
                <div className="rounded-2xl bg-white/10 px-4 py-4">
                    <p className="text-sm text-white/70">Explore Shopora</p>
                    <p className="text-2xl font-bold">Browse freely</p>
                </div>
                <nav className="flex flex-1 flex-col gap-4">
                    <button
                        className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left font-bold text-[#E6C79A] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                        onClick={() => navigate('/')}
                    >
                        <img className="w-6" src={home} alt="home logo" />
                        Home
                    </button>
                    <div
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${isSearchExpanded ? "bg-white text-[#7CA6FF] shadow-lg cursor-text" : "bg-white/10 text-white hover:bg-white/20 cursor-pointer"}`}
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
                                className="flex-1 bg-transparent text-base font-semibold text-[#7CA6FF] placeholder-[#9DB7AA] focus:outline-none"
                            />
                        ) : (
                            <span className="font-bold text-base">Search</span>
                        )}
                    </div>
                    <div
                        className={`relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${isCategoriesExpanded ? "bg-white text-[#7CA6FF] shadow-lg" : "bg-white/10 text-white hover:bg-white/20 cursor-pointer"}`}
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
                            <span className="whitespace-nowrap text-sm font-bold">
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
                                className="absolute left-0 top-full z-10 mt-2 w-full overflow-hidden rounded-2xl bg-white py-1 text-[#7CA6FF] shadow-xl ring-1 ring-[#CDE6D6]"
                                role="listbox"
                            >
                                {categoryOptions.map(option => {
                                    const isActive = option === selectedCategory;
                                    return (
                                        <li key={option}>
                                            <button
                                                type="button"
                                                className={`w-full px-4 py-2 text-left text-sm font-semibold transition-colors duration-150 ${isActive ? "bg-[#7CA6FF] text-white" : "hover:bg-[#F3FBF6]"}`}
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
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${isPriceExpanded ? "bg-white text-[#7CA6FF] shadow-lg cursor-text" : "bg-white/10 text-white hover:bg-white/20 cursor-pointer"}`}
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
                                    min={dynamicPriceBounds.min}
                                    max={dynamicPriceBounds.max}
                                    className="w-24 rounded-xl border border-[#CDE6D6] bg-white px-3 py-1 text-sm font-semibold text-[#7CA6FF] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7CA6FF]"
                                />
                                <span className="text-[#7CA6FF] font-semibold">-</span>
                                <input
                                    ref={maxPriceInputRef}
                                    value={priceDraft.max}
                                    onChange={handleMaxPriceChange}
                                    onBlur={handleMaxPriceBlur}
                                    onKeyDown={handlePriceInputKeyDown}
                                    type="number"
                                    min={dynamicPriceBounds.min}
                                    max={dynamicPriceBounds.max}
                                    className="w-24 rounded-xl border border-[#CDE6D6] bg-white px-3 py-1 text-sm font-semibold text-[#7CA6FF] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7CA6FF]"
                                />
                            </div>
                        ) : (
                            <span className="text-base font-bold">Price Range</span>
                        )}
                    </div>
                </nav>
                <button
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-[#DDC59E] transition hover:bg-white"
                    onClick={() => navigate('/login')}
                >
                    <img className="w-7" src={login} alt="login logo" />
                    Log In
                </button>
            </aside>
            <div className="flex flex-1 flex-col gap-6">
                <header className="flex items-center justify-between rounded-3xl bg-white px-8 py-5 shadow-lg">
                    <img className="w-32" src={logo} alt="logo" />
                    <ThemeToggle className="flex-shrink-0" />
                </header>
                <section className="rounded-3xl bg-white p-8 shadow-lg">
                    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#7CA6FF] to-[#E3C59F] px-6 py-8 text-white shadow-inner">
                        <div className="pointer-events-none absolute -right-10 bottom-0 hidden h-48 w-48 rounded-full bg-white/20 blur-3xl lg:block" aria-hidden="true" />
                        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end">
                            <div className="relative z-10 flex-1 space-y-3">
                                <p className="text-3xl font-bold md:text-4xl">Welcome to Shopora</p>
                                <p className="text-2xl font-semibold md:text-3xl">Find products you love</p>
                                <button
                                    className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-lg font-semibold text-[#DDC59E] transition hover:bg-white/90"
                                    onClick={() => navigate('/stores')}
                                >
                                    Browse Stores
                                </button>
                            </div>
                            <div className="relative flex flex-1 items-end justify-end">
                                <img className="w-40 max-w-full drop-shadow-2xl sm:w-48 absolute bottom-[-60px] lg:w-70" src={women} alt="happy shopper illustration" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        {filteredItems.length > 0 ? (
                            <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
                                {filteredItems.map(item => (
                                    <ItemCard
                                        key={item.id ?? `${item.name}-${item.namee}-${item.priceValue}`}
                                    image={item.image}
                                    images={item.images}
                                    name={item.name}
                                        namee={item.namee}
                                        price={item.price}
                                        priceValue={item.priceValue}
                                        description={item.description}
                                        by={item.by}
                                        reviews={item.reviews}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="rounded-2xl bg-[#F3FBF6] py-12 text-center text-[#7CA6FF]">
                                No items match your filters right now.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );

  return (
    <div className="min-h-screen bg-[#3B7CFF]">
        {isDesktopLayout ? renderDesktopLayout() : renderMobileLayout()}
    </div>
  )
}

export default DashboardLogout
