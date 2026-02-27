import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-8">Privacy Policy</h1>
          <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Information We Collect</h2>
              <p>We collect personal information you provide when placing an order, creating an account, or contacting us — including your name, email, shipping address, and payment details.</p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
              <p>Your information is used to process orders, provide customer support, send order updates, and improve our services. We never sell your personal data to third parties.</p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Cookies</h2>
              <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences in your browser settings.</p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Data Security</h2>
              <p>We implement industry-standard security measures to protect your data. All transactions are encrypted using SSL technology.</p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Contact</h2>
              <p>For privacy-related inquiries, reach us at privacy@maison.com.</p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
