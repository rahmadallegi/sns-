import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";


const navItems = [
  { label: "Home", path: "/" },
  { label: "Who We Are", path: "/who-we-are" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Clients", path: "/clients" },
  { label: "Contact", path: "/contact" },

];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SNS" className="h-auto w-48 object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:text-primary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>



        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="flex flex-col px-4 py-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${location.pathname === item.path
                  ? "text-primary-foreground bg-primary"
                  : "text-foreground hover:text-primary"
                  }`}
              >
                {item.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
