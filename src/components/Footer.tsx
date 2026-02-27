import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-16 mb-12">
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">AURELIO COUTURE</h3>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Elevating timeless design through masterful craftsmanship and enduring luxury since 2020.
            </p>
          </div>
          <div className=" ml-10">
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 text-primary-foreground/60">Shop</h4>
            <ul className="space-y-2 font-body text-sm text-primary-foreground/80">
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Clothing" className="hover:text-primary-foreground transition-colors">Clothing</Link></li>
              <li><Link to="/shop?category=Bags" className="hover:text-primary-foreground transition-colors">Bags</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-primary-foreground transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div >
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 text-primary-foreground/60">Company</h4>
            <ul className="space-y-2 font-body text-sm text-primary-foreground/80">
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/collections" className="hover:text-primary-foreground transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">Sustainability</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 text-primary-foreground/60">Support</h4>
            <ul className="space-y-2 font-body text-sm text-primary-foreground/80">
              <li><Link to="/shipping-returns" className="hover:text-primary-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/size-guide" className="hover:text-primary-foreground transition-colors">Size Guide</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="font-body text-xs text-primary-foreground/50 tracking-wider">
            © 2026 AURELIO COUTURE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
