import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

export default function Layout() {
  return (
    <div className="min-h-screen bg-lab-bg text-lab-text">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:ml-56 pt-14 md:pt-0 pb-12 min-h-screen md:w-[calc(100%-14rem)] w-full"
      >
        <div className="md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
