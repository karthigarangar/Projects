import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sizes = [
  { size: "XS", chest: '32"', waist: '24"', hips: '34"' },
  { size: "S", chest: '34"', waist: '26"', hips: '36"' },
  { size: "M", chest: '36"', waist: '28"', hips: '38"' },
  { size: "L", chest: '38"', waist: '30"', hips: '40"' },
  { size: "XL", chest: '40"', waist: '32"', hips: '42"' },
];

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-4">Size Guide</h1>
          <p className="font-body text-muted-foreground mb-8">Use the chart below to find your perfect fit. Measurements are in inches.</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body">Size</TableHead>
                <TableHead className="font-body">Chest</TableHead>
                <TableHead className="font-body">Waist</TableHead>
                <TableHead className="font-body">Hips</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizes.map((row) => (
                <TableRow key={row.size}>
                  <TableCell className="font-body font-medium text-foreground">{row.size}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{row.chest}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{row.waist}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{row.hips}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;
