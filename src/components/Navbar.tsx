import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "./SearchOverlay";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/" className="font-display text-xl lg:text-2xl font-semibold tracking-wide text-foreground">
              AURELIO COUTURE
            </Link>

            <div className="hidden lg:flex items-center gap-8 text-sm font-body font-medium tracking-wide uppercase text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
              <Link to="/collections" className="hover:text-foreground transition-colors">Collections</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="p-2 text-foreground hover:text-accent transition-colors"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} />
              </button>
              <button
                className="relative p-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(true)}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4 text-sm font-body font-medium tracking-wide uppercase">
                <Link to="/" className="py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" className="py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                <Link to="/collections" className="py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
                <Link to="/about" className="py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>About</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
