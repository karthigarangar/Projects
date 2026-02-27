import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-6">
            About AURELIO COUTURE
          </h1>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Founded in 2020, AURELIO COUTURE was created with a vision to craft timeless pieces 
            that honour the art of true craftsmanship. We believe in exceptional quality over excess,
            collaborating with skilled artisans and consciously sourced materials to create designs
            that endure beyond trends and stand the test of time.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Every piece in our collection is thoughtfully conceived and ethically crafted. 
            From sourcing the finest Italian leathers to the meticulous hand-finishing of every 
            detail, intention and precision guide every step of our process.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            Our purpose is to offer a refined wardrobe of lasting essentials for modern 
            living — pieces that remain relevant, effortless, and enduring.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
