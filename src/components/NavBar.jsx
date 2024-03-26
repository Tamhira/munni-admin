import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = ({ sidebarState, setSidebarState }) => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="text-lg">
        Welcome!{" "}
        <span className="text-blue-500 font-[500]">
          Munni Welfare Super Admin
        </span>
      </div>
      <div onClick={() => setSidebarState((cur) => !cur)} className="lg:hidden">
        {sidebarState ? <FaBars size={24} /> : <FaTimes size={24} />}
      </div>
    </div>
  );
};

export default NavBar;
