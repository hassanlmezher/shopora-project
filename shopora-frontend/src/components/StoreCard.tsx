interface StoreItem {
  image: string;
  name: string;
  onExplore?: () => void;
}

function StoreCard({ image, name, onExplore }: StoreItem) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm">
      <p className="w-full rounded-br-3xl rounded-t-3xl bg-[#F7F0E0] py-3 text-lg font-semibold text-[#3D3D3D]">
        {name}
      </p>
      <img className="mt-6 w-32 sm:w-36" src={image} alt={`${name} logo`} />
      <button
        className="mt-8 w-full max-w-[140px] rounded-2xl bg-[#EAEAEA] py-2 font-bold transition duration-300 ease-in-out hover:bg-black hover:text-[#F7F0E0]"
        onClick={onExplore}
        type="button"
      >
        Explore
      </button>
    </div>
  );
}

export default StoreCard;
