import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { categories } from "@/data/products";

const collectionImages: Record<string, string> = {
  Clothing: "src/assets/Clothes.jpg",
  Bags: "src/assets/bags.jpg",
  Shoes: "src/assets/shoes.jpg",
  Accessories: "src/assets/jwellery.jpg",
};

const Collections = () => {
  const displayCategories = categories.filter((c) => c !== "All");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-4">
            Collections
          </h1>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Browse our carefully curated collections, each designed with purpose and passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayCategories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-secondary"
              >
                <img
                  src={collectionImages[cat]}
                  alt={cat}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold text-primary-foreground tracking-wide">
                    {cat}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
