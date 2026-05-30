import { motion } from 'motion/react';

const galleryItems = [
  {
    title: "Transport Trucks",
    image: "https://images.unsplash.com/photo-1601584115168-9bfb2c86443c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Warehouses",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Cargo Handling",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Logistics Operations",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Goods Delivery",
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c50a18?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Fleet Management",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800"
  }
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-ktc-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-4"
          >
            Operational Infrastructure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ktc-text-muted text-lg max-w-2xl mx-auto"
          >
            A glimpse into our robust logistics network and world-class fleet.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-ktc-bg-section"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ktc-bg-primary via-ktc-bg-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-10 h-1 bg-ktc-accent-primary mb-3 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <h3 className="text-xl font-heading font-bold text-white tracking-wide">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
