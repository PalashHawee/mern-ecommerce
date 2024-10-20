import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";

const AdminHeader = ({ setOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 py- bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center bg-purple-900 text-white hover:text-black rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

// Add prop validation
AdminHeader.propTypes = {
  setOpen: PropTypes.func.isRequired, // setOpen should be a required function
};

export default AdminHeader;
