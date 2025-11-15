import { useNavigate } from "react-router-dom";
import profile from "../images/profile.png";

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-[32px] bg-white p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("/DashboardLoggedIn")}
            className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:border-gray-400 hover:bg-slate-50"
          >
            Back to dashboard
          </button>
          <p className="text-sm font-semibold text-slate-500">Personal information</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <img className="w-32 rounded-[24px] shadow-md" src={profile} alt="profile" />
          <p className="text-3xl font-bold text-slate-900">Hassan Mezher</p>
          <p className="text-sm text-slate-500">hassan.mezher@example.com</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Seller rating</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">4.8 / 5</p>
            <p className="text-xs text-slate-500">Based on recent reviews</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Notifications</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">2 pending</p>
            <p className="text-xs text-slate-500">Review incoming requests</p>
          </div>
        </div>

        <div className="grid gap-4 rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-600">
          <p>This is a placeholder for your profile page. Use the drawer to manage your storefront or your account.</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
