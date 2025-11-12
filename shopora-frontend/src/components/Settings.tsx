import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import profile from "../images/profile.png";
import heart from "../images/heart.png";
import cartt from "../images/cartt.png";
import create from "../images/create.png";

function Settings() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const cards = [
    {
      image: heart,
      title: "Favorites",
      description: "View all of your favorited items!",
      action: () => navigate("/favorites"),
    },
    {
      image: cartt,
      title: "Cart history",
      description: "Review previous orders and saved carts.",
      action: () => navigate("/cart"),
    },
    {
      image: create,
      title: "Create your shop",
      description: "Launch a storefront and start selling on Shopora.",
      action: () => navigate("/welcome-create"),
    },
  ];

  return (
    <div className="mx-auto mt-6 flex w-full max-w-5xl flex-col gap-10 px-4">
      <button
        type="button"
        onClick={() => (isLoggedIn ? navigate("/DashboardLoggedIn") : navigate("/dashboard"))}
        className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
      >
        Back
      </button>
      <div className="flex flex-col items-center gap-4">
        <img className="w-32 sm:w-36 md:w-40" src={profile} alt="profile" />
        <p className="text-xl font-bold text-[#1F3B2F] sm:text-2xl">Hassan Mezher</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const clickable = Boolean(card.action);
          return (
            <button
              key={card.title}
              type="button"
              onClick={card.action}
              disabled={!clickable}
              className={`flex flex-col items-center gap-4 rounded-3xl bg-[#65CD99] px-6 py-8 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg ${
                clickable ? "" : "cursor-not-allowed opacity-75"
              }`}
            >
              <img className="w-16 sm:w-20" src={card.image} alt={card.title} />
              <div className="space-y-1">
                <p className="text-lg font-semibold text-white">{card.title}</p>
                <p className="text-sm text-white/90">{card.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;
