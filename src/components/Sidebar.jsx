import { Link } from "react-router-dom";
import { PageRoutes } from "../routes";
import { useLocation } from "react-router-dom";

const Sidebar = ({ sidebarState }) => {
  const path = useLocation().pathname;

  return (
    <div
      className={`${
        sidebarState && "max-lg:-translate-x-full"
      } z-10 transition-transform max-lg:shadow-lg fixed bg-white h-full grid w-64 grid-row-minmax p-6`}
    >
      <div className="text-2xl uppercase font-bold mb-8 cb">Munni welfare</div>
      <div className="grid content-start gap-6">
        {PageRoutes.map((page, index) => (
          <Link
            to={page.path}
            className={`flex items-center gap-3 transition-colors hover:text-blue-500 ${
              path == page.path && "text-blue-500"
            }`}
            key={index}
          >
            {page.icon} {page.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
