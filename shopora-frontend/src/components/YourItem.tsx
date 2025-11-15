import { useNavigate } from "react-router-dom";
import shirt from ",,/images/shirt.png";
import starts from "../images/5stars.png";
import { type UserShopItem } from "../store/useNotificationStore";

interface YourItemProps {
    item: UserShopItem;
    onRemove?: () => void;
}

function YourItem({ item, onRemove }: YourItemProps) {
    const navigate = useNavigate();

    const hadnleDetails = () => {
        navigate("/details", { state: { ...item, returnPath: "/my-shop" } });
    };

    return(
        
    );
}