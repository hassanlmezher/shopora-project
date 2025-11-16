import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from "./components/Welcome";
import DashboardLogout from "./components/DashboardLogout";
import DashboardLoggedIn from "./components/DashboardLoggedIn"
import Login from "./components/Login";
import Stores from "./components/Stores";
import StoreItems from "./components/StoreItems";
import Favorites from "./components/Favorites";
import Signup from "./components/Signup";
import ProfilePage from './components/ProfilePage';
import Cart from './components/Cart';
import Details from './components/Details';
import ShopForm from './components/ShopForm';
import AdminDashboard from './components/AdminDashboard';
import AdminDetails from './components/AdminDetails';
import AdminNotifications from './components/AdminNotifications';
import UserNotifications from './components/UserNotifications';
import RequestConfirmation from './components/RequestConfirmation';
import UserShop from './components/UserShop';
import ItemForm from './components/ItemForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<DashboardLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:shopId" element={<StoreItems />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/DashboardLoggedIn" element={<DashboardLoggedIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<Details />} />
        <Route path="/shopForm" element={<ShopForm />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/stores/:storeId" element={<AdminDetails />} />
        <Route path="/notifications/user" element={<UserNotifications />} />
        <Route path="/notifications/admin" element={<AdminNotifications />} />
        <Route path="/admin/requests/:requestId" element={<RequestConfirmation />} />
        <Route path="/my-shop" element={<UserShop />} />
        <Route path="/itemform" element={<ItemForm />} />
      </Routes>
    </Router>
  );
}

export default App
