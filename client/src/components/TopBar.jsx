import React from "react";
import { Phone, MapPin, Store, Mail } from "lucide-react";

const TopBar = () => {
  return (
    <div className=" border-b border-gray-200 bg-white hidden sm:block">
      {/* Top Bar*/}
      <div className="flex mx-auto sm:px-4 px-2 justify-between items-center py-2 text-sm">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-1 hover:text-indigo-600">
            <Phone size={18} />
            <span>+1 234 567 890</span>
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-indigo-600">
            <Mail size={18} />
            <span>support@store.com</span>
          </a>
        </div>
        <div className="flex items-center sm:gap-6 gap-3">
          <a
            title="Track Order"
            href="#"
            className="hover:text-indigo-600 flex gap-1 items-center">
            <MapPin size={18} />{" "}
            <span className="max-sm:hidden">Track Order</span>
          </a>
          <a
            title="Store Locator"
            href="#"
            className="hover:text-indigo-600 flex gap-1 items-center">
            <Store size={18} />{" "}
            <span className="max-sm:hidden">Store Locator</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
