import { useNavigate } from "react-router-dom";
import stars from "../images/5stars.png"
import useAuthStore from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";


interface ProductItem {
  image: string;
  name: string;
  namee: string;
  price: string;
  priceValue: number;
  description: string;
  ratings: string;
  by: string;
}

function ItemCard({image, name, namee, price, priceValue, description, ratings, by}: ProductItem) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addItem({
      id: `${name}-${namee}`,
      image,
      name,
      namee,
      by,
      price: priceValue,
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <img className="mx-auto w-32 sm:w-36" src={image} alt={`${name} ${namee}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-bold text-[#333]">{name}</p>
          <p className="text-lg font-semibold text-[#555]">{namee}</p>
        </div>
        <p className="text-xl font-bold text-[#5DBC8C]">{price}</p>
      </div>
      <p className="text-sm text-gray-500 sm:text-base">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="w-20 sm:w-24" src={stars} alt="rating" />
          <span className="text-sm text-gray-500">{ratings}</span>
        </div>
        <p className="text-sm font-semibold text-gray-600">{by}</p>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          className="w-full rounded-2xl bg-[#5DBC8C] px-4 py-3 text-sm font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <button className="w-full rounded-2xl border-2 border-[#5DBC8C] px-4 py-3 text-sm font-bold text-[#5DBC8C] transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black" onClick={() => navigate('/details')}>
          Details
        </button>
      </div>
    </div>
  )
}

export default ItemCard
