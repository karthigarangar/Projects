import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number and link to follow your package in real time." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay." },
  { q: "Can I cancel or modify my order?", a: "Orders can be modified or cancelled within 2 hours of placement. After that, the order enters processing and cannot be changed." },
  { q: "Do you ship internationally?", a: "Yes! We ship to over 50 countries. International shipping rates and delivery times are calculated at checkout." },
  { q: "How do I care for my items?", a: "Each product comes with specific care instructions on its label. Generally, we recommend gentle washing and air drying for clothing items." },
  { q: "What if my item is defective?", a: "If you receive a defective item, contact us within 14 days and we'll send a replacement or issue a full refund at no extra cost." },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-8">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-body text-left text-foreground">{faq.q}</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
