import minus from "../images/minus.png";
import plus from "../images/plus.png";
import useCartStore, { type CartLineItem } from "../store/useCartStore";

interface CartCardProps {
    item: CartLineItem;
    onRemove?: (item: CartLineItem) => void;
}

const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}`;

function CartCard({ item, onRemove }: CartCardProps) {
    const increment = useCartStore((state) => state.incrementQuantity);
    const decrement = useCartStore((state) => state.decrementQuantity);
    const removeItem = useCartStore((state) => state.removeItem);

    const handleIncrement = () => {
        increment(item.id);
    };

    const handleDecrement = () => {
        if (item.quantity === 1) {
            return;
        }
        decrement(item.id);
    };

    const handleRemove = () => {
        removeItem(item.id);
        onRemove?.(item);
    };

    const displayName = `${item.name} ${item.namee}`.trim();
    const lineTotal = item.price * item.quantity;

    return (
        <div className="flex flex-col gap-4 rounded-2xl border-2 border-[#6D6D6D]/60 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
                <img
                    className="w-20 rounded-xl object-cover"
                    src={item.image}
                    alt={displayName}
                />
                <div className="space-y-1">
                    <p className="font-bold text-xl text-[#6D6D6D]">
                        {displayName}
                    </p>
                    <p className="text-base font-semibold text-[#6D6D6D]">
                        {formatCurrency(item.price)}
                    </p>
                    <p className="text-xs text-[#6D6D6D]">{item.by}</p>
                    <button
                        type="button"
                        className="text-xs font-semibold text-[#FF6B6B] transition hover:text-[#c84a4a]"
                        onClick={handleRemove}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-end gap-6">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="rounded-full bg-[#F0F0F0] p-2 transition hover:bg-[#E0E0E0] disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={handleDecrement}
                        aria-label={`Decrease quantity of ${displayName}`}
                        disabled={item.quantity === 1}
                    >
                        <img className="w-4" src={minus} alt="" />
                    </button>
                    <p className="text-2xl font-bold text-[#333]">
                        {item.quantity}
                    </p>
                    <button
                        type="button"
                        className="rounded-full bg-[#F0F0F0] p-2 transition hover:bg-[#E0E0E0]"
                        onClick={handleIncrement}
                        aria-label={`Increase quantity of ${displayName}`}
                    >
                        <img className="w-4" src={plus} alt="" />
                    </button>
                </div>
                <p className="text-2xl font-bold text-[#8DB9FF]">
                    {formatCurrency(lineTotal)}
                </p>
            </div>
        </div>
    );
}

export default CartCard;
