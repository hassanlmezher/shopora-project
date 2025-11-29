import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrderStore, { type Order } from "../store/useOrderStore";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateOrders = () => {
      const allOrders = useOrderStore.getState().getAllOrders();
      setOrders(allOrders);
    };

    updateOrders();

    const interval = setInterval(updateOrders, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateOrderTotal = (order: Order) => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-[#3B7CFF] pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/DashboardLoggedIn')}
            className="flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-white">Order History</h1>
        </div>

        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="rounded-3xl bg-white shadow-lg overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#6A857C]">Order #{order.id.split('-')[1]}</p>
                      <p className="text-lg font-semibold text-[#1F3B2F]">
                        {formatDate(order.orderedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status === 'delivered' ? 'Delivered' : 'Pending'}
                      </span>
                      <span className="text-xl font-bold text-[#3B7CFF]">
                        ${calculateOrderTotal(order).toFixed(2)}
                      </span>
                      <span className={`transform transition-transform ${expandedOrders.has(order.id) ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                {expandedOrders.has(order.id) && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="space-y-4 pt-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-[#F4F7F6] p-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-[#1F3B2F]">{item.name}</p>
                            <p className="text-sm text-[#6A857C]">{item.namee}</p>
                            <p className="text-sm text-[#6A857C]">by {item.by}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#3B7CFF]">${item.price.toFixed(2)}</p>
                            <p className="text-sm text-[#6A857C]">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center">
              <p className="text-xl font-semibold text-[#1F3B2F]">No orders yet</p>
              <p className="mt-2 text-[#6A857C]">Your order history will appear here once you make a purchase.</p>
              <button
                type="button"
                onClick={() => navigate('/DashboardLoggedIn')}
                className="mt-6 rounded-full bg-[#3B7CFF] px-6 py-3 text-white transition hover:bg-[#2D5BA3]"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
