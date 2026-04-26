import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, ShieldCheck, Zap, ChevronRight, CheckCircle, MapPin, Phone, ExternalLink, ArrowRight, Star, MessageCircle, Quote, Maximize2, Camera, Droplets, PenTool, Layers, Lock } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Deteksi scroll untuk efek glassmorphism header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // DAFTAR PRODUK (MASUKKAN LINK ANDA DI SINI)
  const products = [
    {
      id: 1,
      name: 'AREZO BOSCA',
      desc: 'Desain kompak dengan kompartemen luas untuk mobilitas tinggi.',
      price: 'IDR 89.000',
      image: 'image/bosxa.webp',
      specs: ['Material: Cordura Premium', 'Dimensi: 25 x 15 x 8 cm', 'Resleting anti air (Waterproof)', 'Tali strap tebal & adjustable'],
      // Ganti URL di bawah ini dengan link produk asli Anda
      shopeeLink: 'https://shopee.co.id/Arezo-Bosca-Mini-3in1-Anti-Bara-Tas-Pria-i.257211829.23081862670?extraParams=%7B%22display_model_id%22%3A217068938017%2C%22model_selection_logic%22%3A3%7D', 
      tiktokLink: 'https://vt.tokopedia.com/t/ZS9NU3oCrwo3p-OMO20/'
    },
    {
      id: 2,
      name: 'AREZO Hanging Wallet',
      desc: 'Tas pinggang tahan air untuk aktivitas outdoor dan riding.',
      price: 'IDR 57.000',
      image: 'image/hag.png',
      specs: ['Material: Bimo Waterproof', 'Dimensi: 35 x 12 x 5 cm', 'Terdapat slot earphone', 'Jahitan double bartex tangguh'],
      shopeeLink: 'https://shopee.co.id/Tas-Hp-Hanging-Wallet-Tas-Slempang-Handbag-Tas-Tangan-Arezo-i.257211829.15495916480?extraParams=%7B%22display_model_id%22%3A370829628200%2C%22model_selection_logic%22%3A3%7D',
      tiktokLink: 'https://vt.tokopedia.com/t/ZS9NU3vPAda7r-yNcRx/'
    },
    {
      id: 3,
      name: 'AREZO HEXA',
      desc: 'Simpel, elegan, material kokoh untuk esensial harian.',
      price: 'IDR 54.000',
      image: 'image/id-11134207-7qul0-liufg3fy15v103.webp',
      specs: ['Material: Kulit Sintetis (PU Leather)', 'Dimensi: 18 x 11 x 4 cm', 'Kompartemen utama dengan sekat', 'Desain minimalis modern'],
      shopeeLink: 'https://shopee.co.id/Arezo-Handbag-Hexa-Anti-Air-Multifungsi-Pria-Wanita-i.257211829.23047313265?extraParams=%7B%22display_model_id%22%3A98738373014%2C%22model_selection_logic%22%3A3%7D',
      tiktokLink: 'https://vt.tokopedia.com/t/ZS9NU3sRbTCSC-bXvmq/'
    },
    {
      id: 4,
      name: 'AREZO ZETA',
      desc: 'Tas slempang ZETA penambah kegantengan AREZO simple dan elegan.',
      price: 'IDR 40.000',
      image: 'image/id-11134207-8224w-mk8diddv42dk27.webp',
      specs: ['Material: Bahan cordura cotton', 'Dimensi: 20 x 15 x 5 cm', 'Tali webing kuat bisa di atur kepanjangannya', 'Sekat Torin'],
      shopeeLink: 'https://shopee.co.id/Slingbag-Pria-Tas-Slempang-Minibag-ZETA-Tas-Cowok-Pria-Wanita-Minibag-Waistbag-i.257211829.28362371014?extraParams=%7B%22display_model_id%22%3A246668307218%2C%22model_selection_logic%22%3A3%7D',
      tiktokLink: 'https://vt.tokopedia.com/t/ZS9NU3DMuwpaN-t5fQd/'
    },
    {
      id: 5,
      name: 'AREZO KENZI',
      desc: 'Tas selempang tangguh untuk membawa laptop dan perlengkapan kerja.',
      price: 'IDR 39.000',
      image: 'image/KENZI.webp',
      specs: ['Material: Cordura Nylon 1000D', 'Dimensi: 38 x 28 x 10 cm', 'Kompartemen laptop 15 inch', 'Tali pengaman tambahan untuk riding'],
      shopeeLink: 'https://shopee.co.id/KENZI-Tas-Slempang-Pria-Wanita-Sling-Bag-Hitam-Cowok-Polos-i.257211829.24115360514?extraParams=%7B%22display_model_id%22%3A217333058246%2C%22model_selection_logic%22%3A3%7D',
      tiktokLink: 'https://vt.tokopedia.com/t/ZS9NUTCQ4MKPd-Bd2xP/'
    },
    {
      id: 6,
      name: 'AREZO LUXIE',
      desc: 'Clutch bag multifungsi untuk mengorganisir barang bawaan kecil.',
      price: 'IDR 90.000',
      image: 'image/luxie.webp',
      specs: ['Material: Anti Bara', 'Dimensi: 23 x 5 x 13 cm', 'Tali menggunakan bahan nylon', 'Banyak sekat organizer di dalam'],
      shopeeLink: 'https://shopee.co.id/AREZO-Anti-Bara-Handbag-Luxe-3-in-one-Handbag-Pria-Slingbag-Pria-Waterproof-Hitam-i.257211829.22681860343?extraParams=%7B%22display_model_id%22%3A127718902233%2C%22model_selection_logic%22%3A3%7D',
      tiktokLink: 'https://vt.tokopedia.com/t/ZS9NUTYpPTVJK-pbd8H/'
    },
    {
      id: 7,
      name: 'AREZO STRIVE',
      desc: 'Premium waterproof tahan hujan, tahan air. 1 tas, 3 gaya: bisa jadi handbag, slingbag, dan waistbag. Bahan tebal dan premium.',
      price: 'IDR 79.000',
      image: 'image/strive.webp',
      specs: ['Material premium waterproof', 'Dimensi: 25x16x8 cm.', 'Compartement dalam: 1 ruang utama, 1 saku sedang.', '4 Slot kartu, 1 organizer jaring bersleting'],
      shopeeLink: 'https://shopee.co.id/Arezo-Strive-Multifungsi-Waterproof-Tas-Pria-Wanita-i.257211829.42653468881?extraParams=%7B%22display_model_id%22%3A265288452153%2C%22model_selection_logic%22%3A3%7D',
      tiktokLink: 'https://vt.tokopedia.com/t/ZS9NU3H1nC4sf-RhnBt/'
    },
    {
      id: 8,
      name: 'AREZO ELKANT',
      desc: 'Hand Bag Arezo Original Anti Air.',
      price: 'IDR 55.000',
      image: 'image/elkant.webp',
      specs: ['KUALITAS BAHAN BIMO PREMIUM DAN ANTI AIR', 'Dimensi: 22 cm x 5 x 14 cm', '4 saku multifungsi dibagian dalam', 'Bisa dipakai Handbag dan Slingbag'],
      shopeeLink: 'https://shopee.co.id/Hand-Bag-Arezo-Original-Anti-Air-Tas-Selempang-Tas-Selempang-Pria-Slingbag-Clutchbag-Waistbag-Hitam-i.257211829.13043032195?extraParams=%7B%22display_model_id%22%3A38805837817%2C%22model_selection_logic%22%3A2%7D',
      tiktokLink: 'https://vt.tokopedia.com/t/ZS9NUTUk5RwQJ-9KEV9/'
    }
  ];

  const galleryImages = [
    'image/model2.png',
    'image/model 3.png',
    'image/model 4.png',
    'image/model 5.png',
    'image/w2.png',
    'image/model6.webp'
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0f] font-sans text-gray-300 selection:bg-[#FFC800] selection:text-black overflow-x-hidden">
      
      {/* Global CSS Inject for Custom Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shootingStar {
          0% { transform: translateX(-50vw) translateY(-50vh) rotate(35deg); opacity: 0; }
          5% { opacity: 1; }
          20% { transform: translateX(150vw) translateY(150vh) rotate(35deg); opacity: 0; }
          100% { transform: translateX(150vw) translateY(150vh) rotate(35deg); opacity: 0; }
        }
        .comet {
          position: absolute;
          width: 250px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,200,0,0) 0%, rgba(255,200,0,0.8) 50%, rgba(255,255,255,1) 100%);
          border-radius: 50%;
          filter: drop-shadow(0 0 10px rgba(255,200,0,1));
          z-index: 5;
        }
        .c-1 { top: 10%; left: -20%; animation: shootingStar 6s linear infinite; }
        .c-2 { top: -10%; left: 30%; animation: shootingStar 8s linear infinite 2s; }
        .c-3 { top: 40%; left: -30%; animation: shootingStar 7s linear infinite 4s; }
        .c-4 { top: -20%; left: 60%; animation: shootingStar 9s linear infinite 1s; }
        .c-5 { top: 30%; left: 10%; animation: shootingStar 10s linear infinite 5s; }

        @keyframes textPulseGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.1); }
          50% { text-shadow: 0 0 20px rgba(255,200,0,0.8), 0 0 40px rgba(255,200,0,0.4), 0 0 80px rgba(255,200,0,0.2); }
        }
        .animate-text-pulse {
          animation: textPulseGlow 4s ease-in-out infinite;
        }
      `}} />

      {/* Dark Cinematic Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d0d0f]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="font-black text-3xl tracking-tighter text-white" style={{ fontFamily: 'Arial Rounded MT Bold, sans-serif' }}>
                AREZO Store<span className="text-[#FFC800]">.</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-12">
              {['home', 'products', 'services', 'about'].map((tab) => (
                <a 
                  key={tab}
                  href={`#${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 relative group ${
                    activeTab === tab ? 'text-[#FFC800]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute -bottom-2 left-1/2 w-1/2 h-0.5 bg-[#FFC800] transform -translate-x-1/2"></span>
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0d0d0f] flex flex-col items-center justify-center space-y-8 pt-20">
          {['home', 'products', 'services', 'about'].map((tab) => (
            <a 
              key={tab}
              href={`#${tab}`}
              onClick={() => {
                setActiveTab(tab);
                setIsMobileMenuOpen(false);
              }}
              className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[#FFC800]"
            >
              {tab}
            </a>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <main>
        
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-[#ee4d2d] to-[#FFC800] rounded-full blur-[100px] md:blur-[180px] opacity-40 pointer-events-none z-0"></div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-70">
            <div className="comet c-1"></div>
            <div className="comet c-2"></div>
            <div className="comet c-3"></div>
            <div className="comet c-4"></div>
            <div className="comet c-5"></div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] md:-translate-y-[55%] w-full text-center z-10 pointer-events-none flex flex-col items-center">
            <h1 className="text-[32vw] md:text-[24vw] font-black text-white leading-none tracking-tighter select-none animate-text-pulse" style={{ fontFamily: 'Arial Rounded MT Bold, sans-serif' }}>
              AREZO
            </h1>
            <p className="text-white font-bold tracking-[0.3em] md:tracking-[0.8em] uppercase text-[10px] md:text-xl mt-[-4vw] md:mt-[-1.5vw] z-20 relative drop-shadow-md">
              THE FUTURE OF URBAN GEAR
            </p>
          </div>

          <div className="relative z-20 w-full max-w-2xl mx-auto flex justify-center items-end h-[55vh] md:h-[75vh] mt-16 md:mt-24 pointer-events-none">
            <img 
              src="image/w1.png" 
              alt="AREZO Mascot" 
              className="w-auto h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] rounded-t-full md:rounded-3xl"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full px-6 py-8 md:px-12 md:py-12 z-30 flex flex-col md:flex-row justify-between items-end gap-8 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent">
            <div className="hidden md:flex flex-col gap-8 max-w-xs">
              <div>
                <h4 className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">Local Pride</h4>
                <p className="text-white text-xs font-bold uppercase tracking-wider">Banyumas<br/>Indonesia</p>
              </div>
              <div>
                <h4 className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">Quality</h4>
                <p className="text-white text-xs font-bold uppercase tracking-wider">Strong<br/>Durability</p>
              </div>
            </div>

            <div className="w-full md:w-auto flex justify-center mb-2 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-12">
              <a href="#products" className="bg-gradient-to-r from-[#ee4d2d] to-[#FFC800] text-white px-10 py-4 md:px-14 md:py-5 font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform flex items-center justify-center shadow-[0_0_40px_rgba(238,77,45,0.4)] w-full md:w-auto pointer-events-auto rounded-sm">
                JOIN AREZO NOW
              </a>
            </div>

            <div className="w-full md:w-auto text-center md:text-right max-w-[280px] mx-auto md:mx-0">
              <p className="text-gray-400 text-[11px] md:text-xs font-medium leading-relaxed tracking-wide">
                Kuat, fungsional, dan modern. AREZO hadir untuk memenuhi kebutuhan gaya hidup urban, memberikan pengalaman terbaik untuk aktivitas harian Anda.
              </p>
              <div className="hidden md:flex flex-col items-end mt-8">
                 <h4 className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">Ecosystem</h4>
                 <p className="text-white text-xs font-bold uppercase tracking-wider text-right">Smooth and<br/>Transparent</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners / Available At Section */}
        <section className="py-8 border-y border-white/5 bg-[#050505] relative z-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-gray-600 text-xs font-black tracking-[0.2em] uppercase mb-6 text-center">
              Tersedia Secara Resmi Di
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-black text-2xl tracking-tighter text-white hover:text-[#ee4d2d] transition-colors">Shopee</span>
              <span className="font-black text-2xl tracking-tighter text-white hover:text-white transition-colors">TikTok Shop</span>
              <span className="font-black text-2xl tracking-tighter text-white hover:text-[#03ac0e] transition-colors">Tokopedia</span>
              <span className="font-black text-2xl tracking-tighter text-white hover:text-[#0f146d] transition-colors">Lazada</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-[#08080a] relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center relative mb-20">
              <h2 className="text-6xl md:text-8xl font-black text-white/[0.02] absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase tracking-widest z-0 pointer-events-none select-none">
                SERVICES
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white relative z-10">Kenapa Memilih Kami?</h3>
              <a href="#about" className="text-[#FFC800] text-sm font-bold tracking-wider uppercase mt-4 inline-block hover:text-yellow-400 relative z-10">
                Pelajari lebih lanjut <ChevronRight className="inline" size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Zap size={32} />, title: "Desain Kekinian", desc: "Tampil stylish setiap hari dengan desain modern dan urban." },
                { icon: <ShieldCheck size={32} />, title: "Fungsional & Awet", desc: "Material pilihan yang menjamin kenyamanan dan daya tahan." },
                { icon: <ShoppingBag size={32} />, title: "Value for Money", desc: "Kualitas bersaing dengan harga rasional untuk semua kalangan." }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111114] border border-white/5 p-8 rounded-2xl hover:border-[#FFC800]/50 transition-all duration-300 group hover:-translate-y-2">
                  <div className="text-[#FFC800] mb-6 transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section id="craftsmanship" className="py-32 relative bg-[#050505] border-t border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center relative mb-20">
              <h2 className="text-4xl md:text-8xl font-black text-white/[0.02] absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase tracking-widest z-0 pointer-events-none select-none">
                CRAFTSMANSHIP
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white relative z-10">Spesifikasi & Kualitas</h3>
              <p className="text-gray-500 text-sm font-medium mt-4 relative z-10 max-w-lg mx-auto">
                Setiap tas AREZO dirancang dengan standar tinggi. Kami sangat memperhatikan detail bahan, fitur, dan kekuatan jahitan untuk durabilitas maksimal.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 relative group w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFC800]/20 to-transparent rounded-2xl blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img 
                  src="image/Gemini_Generated_Image_8gm34w8gm34w8gm3.png" 
                  alt="AREZO Material Close Up" 
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl relative z-10 border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
                <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl z-20 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[#FFC800] text-[10px] font-black tracking-[0.2em] mb-1">DURABILITY TESTED</div>
                  <div className="text-white font-black text-3xl">100%</div>
                </div>
                <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl z-20 shadow-2xl">
                  <Droplets className="text-[#FFC800]" size={24} />
                </div>
              </div>

              <div className="lg:w-1/2 space-y-8 w-full relative z-10">
                {[
                  {
                    title: "Material Premium Waterproof",
                    desc: "Menggunakan material Bimo dan Cordura kelas atas yang tahan terhadap cipratan air, menjaga barang bawaan tetap aman.",
                    icon: <Droplets className="text-[#FFC800]" size={24} />
                  },
                  {
                    title: "Jahitan Double Bartex",
                    desc: "Ditenun dengan teknik penjahitan ganda pada titik tumpu beban. Memastikan strap tidak mudah lepas atau putus.",
                    icon: <PenTool className="text-[#FFC800]" size={24} />
                  },
                  {
                    title: "Kompartemen Pintar & Ergonomis",
                    desc: "Desain kantong dalam yang dioptimalkan untuk gadget, dompet, dan kunci agar isi tas tetap terorganisir.",
                    icon: <Layers className="text-[#FFC800]" size={24} />
                  },
                  {
                    title: "Resleting Anti-Macet",
                    desc: "Dilengkapi ritsleting berbahan kokoh yang meluncur mulus. Beberapa seri terdapat seal pelindung rembesan.",
                    icon: <Lock className="text-[#FFC800]" size={24} />
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-5 items-start group cursor-default">
                    <div className="p-4 bg-[#111114] border border-white/5 rounded-2xl group-hover:border-[#FFC800]/50 transition-colors shadow-lg flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-[#FFC800] transition-colors">{feature.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Catalog Section */}
        <section id="products" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center relative mb-20">
              <h2 className="text-6xl md:text-8xl font-black text-white/[0.02] absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase tracking-widest z-0 pointer-events-none select-none">
                PRODUCTS
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white relative z-10">Katalog Produk</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, showAllProducts ? products.length : 4).map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product)}
                  className="bg-[#0f0f12] rounded-2xl p-4 border border-white/5 hover:border-[#FFC800]/30 transition-all duration-300 group flex flex-col cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,200,0,0.1)]"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-6 relative bg-black">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <span className="bg-[#FFC800] text-black text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Maximize2 size={14} /> Lihat Detail
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between px-2 pb-2">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-2">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.desc}</p>
                    </div>
                    
                    <div>
                      <p className="font-black text-[#FFC800] text-lg mb-4">{product.price}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {/* LINK KE SHOPEE (CATALOG GRID) */}
                        <a 
                          href={product.shopeeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#ee4d2d]/10 border border-[#ee4d2d]/30 text-[#ee4d2d] py-2.5 font-bold text-xs hover:bg-[#ee4d2d] hover:text-white transition-all flex justify-center items-center gap-1 rounded uppercase tracking-wider"
                        >
                          Shopee
                        </a>
                        {/* LINK KE TIKTOK (CATALOG GRID) */}
                        <a 
                          href={product.tiktokLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white/5 border border-white/10 text-white py-2.5 font-bold text-xs hover:bg-white hover:text-black transition-all flex justify-center items-center gap-1 rounded uppercase tracking-wider"
                        >
                          TikTok
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center relative z-10">
              <button 
                onClick={() => setShowAllProducts(!showAllProducts)}
                className="group relative px-8 py-4 bg-transparent border border-[#FFC800]/50 text-[#FFC800] font-bold uppercase tracking-widest text-sm hover:bg-[#FFC800] hover:text-black transition-all duration-300 rounded-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#FFC800] w-0 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {showAllProducts ? 'Sembunyikan Sebagian' : 'Muat Lebih Banyak'} 
                  <ChevronRight className={`transition-transform duration-300 ${showAllProducts ? '-rotate-90' : 'rotate-90'}`} size={18} />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Real Life Gallery Section */}
        <section id="gallery" className="py-32 relative bg-[#08080a] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center relative mb-16">
              <h2 className="text-6xl md:text-8xl font-black text-white/[0.02] absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase tracking-widest z-0 pointer-events-none select-none">
                GALLERY
              </h2>
              <div className="inline-flex items-center gap-2 text-[#FFC800] mb-4 relative z-10">
                <Camera size={20} />
                <span className="font-bold tracking-widest uppercase text-sm">Real Life Look</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white relative z-10">AREZO In Action</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setZoomedImage(img)}
                  className={`relative overflow-hidden rounded-xl bg-black group cursor-pointer border border-white/5 hover:border-[#FFC800]/50 transition-colors ${idx === 0 || idx === 3 ? 'md:row-span-2' : ''}`}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={img} 
                    alt="AREZO in real life" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-700 aspect-square md:aspect-auto"
                    style={{ minHeight: idx === 0 || idx === 3 ? '100%' : '250px' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="bg-black/80 p-3 rounded-full backdrop-blur-sm text-white">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-32 relative bg-[#050505] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center relative mb-20">
              <h2 className="text-6xl md:text-8xl font-black text-white/[0.02] absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase tracking-widest z-0 pointer-events-none select-none">
                REVIEWS
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white relative z-10">Apa Kata Mereka?</h3>
              <p className="text-gray-500 text-sm font-medium mt-4 relative z-10 max-w-lg mx-auto">
                Ribuan produk telah terjual. Berikut adalah pengalaman mereka yang sudah menggunakan tas AREZO.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Bima S.", role: "Pekerja Kantoran", text: "Gila sih ini tasnya. Harganya murah tapi build quality-nya berasa tas mahal. Jahitannya rapi banget dan muat banyak barang.", rating: 5 },
                { name: "Reza A.", role: "Mahasiswa", text: "Sling bag-nya enak banget dipake buat riding dan nongkrong. Desainnya simpel tapi tetep keliatan tech-wear nya. Rekomen!", rating: 5 },
                { name: "Nadia K.", role: "Freelancer", text: "Udah beli 2 kali buat kado dan dipake sendiri. Resletingnya lancar, material anti airnya beneran berfungsi waktu gerimis. Mantap AREZO.", rating: 5 }
              ].map((review, idx) => (
                <div key={idx} className="bg-[#111114] border border-white/5 p-8 rounded-2xl relative group hover:border-[#FFC800]/30 transition-colors">
                  <Quote className="absolute top-6 right-6 text-white/5 w-16 h-16 transform group-hover:scale-110 transition-transform" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-[#FFC800] text-[#FFC800]" />
                    ))}
                  </div>
                  <p className="text-gray-300 font-medium leading-relaxed mb-8 relative z-10">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-tr from-gray-800 to-gray-600 rounded-full flex items-center justify-center font-bold text-white">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{review.name}</h4>
                      <p className="text-[#FFC800] text-xs font-semibold">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic About Section */}
        <section id="about" className="relative py-32 bg-black border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Background Texture" 
              className="w-full h-full object-cover opacity-20 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-0 md:pr-12">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                VISI KAMI.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">MISI KAMI.</span>
              </h2>
              <div className="w-16 h-1 bg-[#FFC800] mb-8"></div>
              
              <div className="space-y-6 text-gray-400 font-medium leading-relaxed">
                <p>
                  Berdiri sejak <strong className="text-white">2022</strong> di Banyumas, AREZO lahir dari keresahan Dedi Riswoyo melihat banyaknya produk di pasaran yang memiliki harga tinggi namun tidak sebanding dengan kualitas dan fungsinya.
                </p>
                <p>
                  Nama <strong className="text-white">"AREZO"</strong> dipilih karena terdengar modern, bernuansa internasional, dan mewakili semangat kami sebagai brand lokal yang ingin <em className="text-white">go global</em>.
                </p>
                
                <div className="pt-6 border-t border-white/10">
                  <h3 className="font-bold text-white text-xl mb-4">Misi Utama</h3>
                  <ul className="space-y-4">
                    {[
                      'Kualitas material terbaik dengan harga terjangkau',
                      'Menggabungkan tren fashion & fungsi maksimal',
                      'Mendukung pertumbuhan UMKM lokal Indonesia'
                    ].map((misi, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-[#FFC800] mr-3 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-300">{misi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Dark Minimalist Footer */}
      <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <span className="font-black text-4xl tracking-tighter text-white block mb-6" style={{ fontFamily: 'Arial Rounded MT Bold, sans-serif' }}>
                AREZO<span className="text-[#FFC800]">.</span>
              </span>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
                Brand lokal Indonesia yang bergerak di bidang fashion. Kami hadir untuk memenuhi kebutuhan gaya hidup aktif dengan produk berkualitas tinggi.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/arezo_officialstore/" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-gray-400 hover:text-[#FFC800] hover:border-[#FFC800] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="http://wa.me/6281225434849" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-gray-400 hover:text-[#FFC800] hover:border-[#FFC800] transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">Navigasi</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#home" className="hover:text-white transition-colors">Beranda</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Katalog</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Layanan</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Tentang Kami</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">Kontak</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-start">
                  <MapPin className="text-[#FFC800] mr-3 mt-0.5" size={16} />
                  <span>Banyumas, Jawa Tengah<br/>Indonesia</span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-[#FFC800] mr-3" size={16} />
                  <span>+62 81225434849</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-medium">
            <p>&copy; {new Date().getFullYear()} AREZO. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">TERMS OF USE</a>
              <a href="#" className="hover:text-white">PRIVACY POLICY</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {/* Masukkan link WhatsApp Anda pada href di bawah ini */}
      <a 
        href="https://wa.me/6281225434849" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 z-50 group flex items-center justify-center border border-white/20"
        title="Chat dengan Admin"
      >
        <MessageCircle size={28} />
        <span className="absolute right-16 bg-[#111114] border border-white/10 text-white text-xs font-bold py-2.5 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-xl">
          Tanya via WhatsApp
        </span>
      </a>

      {/* MODAL: Product Detail */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setSelectedProduct(null)}
          ></div>
          
          <div className="relative z-10 bg-[#0d0d0f] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-[#FFC800] hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            <div className="md:w-1/2 p-4 md:p-6 bg-[#08080a] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFC800]/5 to-transparent"></div>
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-auto object-cover rounded-xl shadow-2xl relative z-10"
              />
            </div>

            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <div className="text-xs font-bold text-[#FFC800] tracking-widest uppercase mb-2">
                {selectedProduct.category}
              </div>
              <h2 className="text-3xl font-black text-white mb-4">{selectedProduct.name}</h2>
              <p className="text-gray-400 mb-6">{selectedProduct.desc}</p>
              
              <div className="mb-8">
                <h4 className="text-white font-bold mb-3 border-b border-white/10 pb-2">Spesifikasi Detail</h4>
                <ul className="space-y-3">
                  {selectedProduct.specs.map((spec, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-400">
                      <CheckCircle size={16} className="text-[#FFC800] mr-3 flex-shrink-0 mt-0.5" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-3xl font-black text-white mb-8 border-l-4 border-[#FFC800] pl-4">
                {selectedProduct.price}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {/* LINK KE SHOPEE (MODAL POP-UP) */}
                <a 
                  href={selectedProduct.shopeeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#ee4d2d] text-white py-3.5 font-bold hover:bg-opacity-90 transition-all flex justify-center items-center gap-2 rounded-xl uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(238,77,45,0.2)]"
                >
                  Beli di Shopee <ExternalLink size={16} />
                </a>
                {/* LINK KE TIKTOK (MODAL POP-UP) */}
                <a 
                  href={selectedProduct.tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-black py-3.5 font-bold hover:bg-gray-200 transition-all flex justify-center items-center gap-2 rounded-xl uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Beli di TikTok <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Lightbox Zoom Gallery */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
            onClick={() => setZoomedImage(null)}
          ></div>
          <button 
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-6 z-20 text-white/50 hover:text-[#FFC800] transition-colors"
          >
            <X size={36} />
          </button>
          <img 
            src={zoomedImage} 
            alt="Zoomed Real Life" 
            className="relative z-10 max-w-full max-h-[90vh] object-contain rounded-md shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 animate-in zoom-in duration-300"
          />
        </div>
      )}

    </div>
  );
};

export default App;