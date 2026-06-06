import { Bell, ChevronDown, LogOut, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user.fullName
    ? user.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-neutral-200 flex px-8 py-4 justify-between items-center relative">
      <h1 className="font-bold text-neutral-950 text-xl leading-7">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-white border border-neutral-200 flex px-3 py-2 items-center gap-2 w-64">
          <Search className="size-4 text-neutral-500" />
          <input
            className="bg-transparent outline-none text-sm leading-5 w-full"
            placeholder="Search..."
          />
        </div>
        <div className="relative">
          <Bell className="size-5 text-neutral-500" />
          <span className="size-4 font-semibold rounded-full bg-[#e7000b] text-neutral-50 text-[9px] flex absolute -right-1 -top-1 justify-center items-center">
            3
          </span>
        </div>
        <div className="relative">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="size-8 font-semibold rounded-full bg-neutral-100 text-neutral-900 text-xs flex justify-center items-center">
              {initials}
            </div>
            <ChevronDown className="size-4 text-neutral-500" />
          </div>
          {showDropdown && (
            <div className="absolute right-0 top-10 bg-white border border-neutral-200 rounded-lg shadow-lg w-44 py-1 z-50">
              <div className="px-3 py-2 border-b border-neutral-100">
                <p className="font-semibold text-sm text-neutral-900">{user.fullName}</p>
                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}