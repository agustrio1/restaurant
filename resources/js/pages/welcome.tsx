import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Button 
} from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';
import {
  ChevronRight,
  Menu,
  Star,
  Clock,
  Award,
  MapPin,
  Phone,
  Calendar
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    // Check if user has admin or staff role
    const hasAdminAccess = auth.user && (auth.user.role === 'admin' || auth.user.role === 'staff');

    // Handle navbar show/hide on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollPosition(currentScrollY);
            
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Fade in animation for sections
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <>
            <Head title="RestoKu - Kuliner Terbaik">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600|playfair-display:700" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC] font-['instrument-sans']">
                {/* 🔹 Navbar */}
                <motion.header 
                    className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md dark:bg-[#0a0a0a]/90 shadow-sm transition-all duration-300 ${scrollPosition > 50 ? 'py-3' : 'py-5'}`}
                    animate={{ y: showNav ? 0 : -100 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="container mx-auto px-6 flex justify-between items-center">
                        <Link href="/">
                            <h1 className="text-2xl font-bold flex items-center">
                                <span className="text-3xl mr-2">🍽️</span> 
                                <span className="bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">RestoKu</span>
                            </h1>
                        </Link>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="#about" className="hover:text-amber-500 transition duration-200">Tentang</Link>
                            <Link href="#menu" className="hover:text-amber-500 transition duration-200">Menu</Link>
                            <Link href="#testimoni" className="hover:text-amber-500 transition duration-200">Testimoni</Link>
                            <Link href="#contact" className="hover:text-amber-500 transition duration-200">Kontak</Link>
                            
                            {auth.user ? (
                                <>
                                    {hasAdminAccess && (
                                        <Button asChild variant="default" className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600">
                                            <Link href={route('dashboard')}>
                                                Dashboard
                                            </Link>
                                        </Button>
                                    )}
                                    <Button asChild variant="ghost">
                                        <Link href={route('profile.edit')}>
                                            Profil
                                        </Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button asChild variant="outline">
                                        <Link href={route('login')}>
                                            Log in
                                        </Link>
                                    </Button>
                                    <Button asChild variant="default" className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600">
                                        <Link href={route('register')}>
                                            Register
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </nav>
                        
                        {/* Mobile Navigation */}
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[80%] sm:w-[350px] bg-white dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-gray-800">
                                <div className="h-full flex flex-col py-6">
                                    <h2 className="text-2xl font-bold mb-8 flex items-center">
                                        <span className="text-3xl mr-2">🍽️</span> 
                                        <span className="bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">RestoKu</span>
                                    </h2>
                                    <nav className="flex flex-col space-y-4">
                                        <Link href="#about" className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 hover:text-amber-500 transition-colors">
                                            Tentang <ChevronRight className="h-4 w-4" />
                                        </Link>
                                        <Link href="#menu" className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 hover:text-amber-500 transition-colors">
                                            Menu <ChevronRight className="h-4 w-4" />
                                        </Link>
                                        <Link href="#testimoni" className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 hover:text-amber-500 transition-colors">
                                            Testimoni <ChevronRight className="h-4 w-4" />
                                        </Link>
                                        <Link href="#contact" className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 hover:text-amber-500 transition-colors">
                                            Kontak <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </nav>
                                    <div className="mt-auto space-y-3">
                                        {auth.user ? (
                                            <>
                                                {hasAdminAccess && (
                                                    <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600">
                                                        <Link href={route('dashboard')}>
                                                            Dashboard
                                                        </Link>
                                                    </Button>
                                                )}
                                                <Button asChild variant="outline" className="w-full">
                                                    <Link href={route('profile.edit')}>
                                                        Profil
                                                    </Link>
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button asChild variant="outline" className="w-full">
                                                    <Link href={route('login')}>
                                                        Log in
                                                    </Link>
                                                </Button>
                                                <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600">
                                                    <Link href={route('register')}>
                                                        Register
                                                    </Link>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </motion.header>

                {/* 🔹 Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center pt-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="container mx-auto relative z-10 px-6">
                        <motion.div 
                            className="max-w-3xl mx-auto text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['playfair-display']">
                                Nikmati Hidangan Terbaik di RestoKu
                            </h2>
                            <p className="mt-3 text-lg md:text-xl text-white/90 mb-8">
                                Pengalaman kuliner yang tak terlupakan dengan cita rasa autentik
                            </p>
                            <motion.div 
                                className="flex flex-col sm:flex-row justify-center gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white px-8">
                                    <Link href="#menu">
                                        Lihat Menu
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 px-8">
                                    <Link href="#reservasi">
                                        Reservasi Sekarang
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                    
                    {/* Scroll indicator */}
                    <motion.div 
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </motion.div>
                </section>

                {/* 🔹 About Us */}
                <section id="about" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#101010]">
                    <div className="container mx-auto">
                        <motion.div 
                            className="text-center max-w-3xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeInUp}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-['playfair-display']">Tentang Kami</h3>
                            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-6"></div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                RestoKu didirikan dengan filosofi sederhana: menyajikan makanan berkualitas tinggi dengan bahan-bahan segar pilihan dan layanan terbaik. Kami percaya bahwa makanan yang baik dapat menyatukan orang dan menciptakan momen berharga.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mt-12">
                                <motion.div 
                                    className="text-left"
                                    variants={fadeInUp}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h4 className="text-2xl font-semibold mb-4">Visi Kami</h4>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Menjadi destinasi kuliner terdepan yang menghadirkan pengalaman bersantap yang tak terlupakan dan menjadi bagian dari momen istimewa dalam hidup pelanggan kami.
                                    </p>
                                </motion.div>
                                <motion.div 
                                    className="text-left"
                                    variants={fadeInUp}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h4 className="text-2xl font-semibold mb-4">Nilai Kami</h4>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li>✓ Kualitas tanpa kompromi</li>
                                        <li>✓ Pelayanan yang ramah dan profesional</li>
                                        <li>✓ Inovasi dalam setiap hidangan</li>
                                        <li>✓ Keberlanjutan dan tanggung jawab sosial</li>
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 🔹 Testimoni Section */}
                <section id="testimoni" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-[#101010] dark:to-[#0a0a0a]">
                    <div className="container mx-auto">
                        <motion.div 
                            className="text-center max-w-3xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeInUp}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-['playfair-display']">Testimoni Pelanggan</h3>
                            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-6"></div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Apa kata pelanggan kami tentang pengalaman mereka di RestoKu?
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div 
                                    className="p-6 border rounded-lg shadow-md"
                                    variants={fadeInUp}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        "Makanan di RestoKu sangat lezat! Pelayanan yang ramah dan suasana yang nyaman membuat pengalaman bersantap kami tak terlupakan."
                                    </p>
                                    <p className="font-semibold">- Sarah J.</p>
                                </motion.div>
                                <motion.div 
                                    className="p-6 border rounded-lg shadow-md"
                                    variants={fadeInUp}
                                    transition={{ delay: 0.4 }}
                                >
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        "RestoKu adalah tempat favorit saya untuk berkumpul dengan teman-teman. Menu yang bervariasi dan rasa yang luar biasa!"
                                    </p>
                                    <p className="font-semibold">- Andi K.</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 🔹 Contact Section */}
                <section id="contact" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-[#101010] dark:to-[#0a0a0a]">
                    <div className="container mx-auto">
                        <motion.div 
                            className="text-center max-w-3xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeInUp}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-['playfair-display']">Kontak Kami</h3>
                            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-6"></div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Kami selalu siap membantu Anda. Silakan hubungi kami melalui informasi di bawah ini.
                            </p>
                            <ul className="text-lg text-gray-600 dark:text-gray-300">
                                <li>Email: info@restoku.com</li>
                                <li>Telepon: (021) 123-4567</li>
                                <li>Alamat: Jl. Makanan No. 1, Jakarta</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 🔹 Footer */}
                <footer className="py-6 bg-gray-800 text-white">
                    <div className="container mx-auto text-center">
                        <p>&copy; {new Date().getFullYear()} RestoKu. All rights reserved.</p>
                        <div className="mt-2">
                            <Link href="/privacy" className="text-gray-400 hover:text-white">Kebijakan Privasi</Link> | 
                            <Link href="/terms" className="text-gray-400 hover:text-white"> Syarat dan Ketentuan</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}