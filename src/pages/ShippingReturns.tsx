import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { motion } from "framer-motion";

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-8">Shipping & Returns</h1>

          <div className="space-y-8 font-body text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Shipping</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Free standard shipping on all orders over $150.</li>
                <li>Standard shipping (5–7 business days): $8.</li>
                <li>Express shipping (2–3 business days): $18.</li>
                <li>International shipping available — rates calculated at checkout.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Returns</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Returns accepted within 30 days of delivery.</li>
                <li>Items must be unworn, unwashed, and with original tags attached.</li>
                <li>Free return shipping on domestic orders.</li>
                <li>Refunds processed within 5–7 business days after we receive the item.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Exchanges</h2>
              <p>We offer free exchanges for different sizes or colors. Contact us at support@maison.com to initiate an exchange.</p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingReturns;
