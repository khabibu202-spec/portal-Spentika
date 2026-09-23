import { ReactNode, useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Search, 
  Bell, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  FileCheck,
  Send,
  Menu,
  X,
  Package,
  Settings,
  Save,
  Image as ImageIcon,
  Palette,
  Type,
  Lock,
  Unlock,
  KeyRound,
  Home,
  LayoutGrid,
  Info,
  Megaphone
} from 'lucide-react';

import { PWAInstallButton } from './PWAInstallButton';

const NavLink = ({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`${
      active 
        ? 'text-blue-600 font-bold border-b-2 border-blue-600' 
        : 'text-slate-600 hover:text-blue-600 font-semibold border-b-2 border-transparent'
    } transition-all text-sm tracking-wide pb-1`}
  >
    {children}
  </button>
);

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay,
  href
}: { 
  icon: any, 
  title: string, 
  description: string, 
  delay: number,
  href?: string
}) => {
  const CardContent = (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex flex-row sm:flex-col h-full text-left gap-4 sm:gap-0 items-center sm:items-start">
        <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center sm:mb-5 shadow-md sm:shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="text-base sm:text-xl font-bold text-slate-800 mb-1 sm:mb-3 group-hover:text-blue-600 transition-colors leading-tight">{title}</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-snug sm:leading-relaxed flex-grow line-clamp-2 sm:line-clamp-none">{description}</p>
          <div className="mt-1 sm:mt-5 flex items-center text-blue-600 text-[13px] sm:text-sm font-bold opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {href ? 'Buka Website' : 'Ajukan Layanan'} <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
          </div>
        </div>
      </div>
    </>
  );

  const wrapperProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, type: "spring", stiffness: 100 },
    whileHover: { y: -5 },
    whileTap: { scale: 0.96 },
    className: "group relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/70 border border-white shadow-md sm:shadow-xl shadow-blue-900/5 hover:bg-white hover:border-blue-100 hover:shadow-lg sm:hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl block w-full"
  };

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...wrapperProps as any}>
        {CardContent}
      </motion.a>
    );
  }

  return (
    <motion.div {...wrapperProps as any}>
      {CardContent}
    </motion.div>
  );
};

const StatCard = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => (
  <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-2xl bg-white border border-blue-50 shadow-lg shadow-blue-900/5">
    <div className="p-2 sm:p-3 rounded-xl bg-blue-50 text-blue-600">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    <div>
      <div className="text-xl sm:text-2xl font-black text-slate-800">{value}</div>
      <div className="text-xs sm:text-sm font-medium text-slate-500">{label}</div>
    </div>
  </div>
);

const SettingsModal = ({ isOpen, onClose, adminPin, onUpdatePin, appLogo, setAppLogo, announcement, setAnnouncement }: { isOpen: boolean; onClose: () => void; adminPin: string; onUpdatePin: (pin: string) => void; appLogo: string | null; setAppLogo: (logo: string | null) => void; announcement: string; setAnnouncement: (text: string) => void; }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // Ubah PIN states
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeError, setPinChangeError] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setPin('');
      setError(false);
      setNewPin('');
      setConfirmPin('');
      setPinChangeError('');
      setPinChangeSuccess(false);
    }
  }, [isOpen]);

  const handlePinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pin === adminPin) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-0 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-2xl bg-white sm:rounded-[2rem] rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-auto sm:max-h-[90vh] border-t sm:border border-slate-100"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl border border-blue-100/50 shadow-inner">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Pengaturan Admin</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              <motion.div
                key="pin-screen"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-12 flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-100">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Akses Terkunci</h3>
                <p className="text-slate-500 mb-8 text-center max-w-xs">Masukkan PIN admin untuk mengubah pengaturan tampilan dan sistem.</p>
                
                <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
                  <div>
                    <input 
                      type="password" 
                      maxLength={4}
                      placeholder="••••"
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value.replace(/\D/g, ''));
                        setError(false);
                      }}
                      className={`w-full text-center text-3xl tracking-[1em] font-mono px-4 py-4 rounded-2xl border-2 focus:outline-none transition-all bg-slate-50 ${error ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 text-red-600' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-slate-800'}`}
                      autoFocus
                    />
                    {error && <p className="text-red-500 text-sm text-center mt-3 font-medium animate-pulse">PIN tidak valid. Silakan coba lagi.</p>}
                  </div>
                  <button 
                    type="submit" 
                    disabled={pin.length < 4}
                    className="w-full py-3.5 rounded-xl bg-slate-800 text-white font-bold tracking-wide hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span>Buka Kunci</span>
                    <Unlock className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="settings-screen"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 space-y-8"
              >
                {/* Logo Section */}
                <section className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="tracking-tight">Pengaturan Logo</h3>
                  </div>
                  <div className="p-5 border border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:border-blue-200 transition-colors">
                    <div className="w-20 h-20 flex items-center justify-center shrink-0">
                       {appLogo ? (
                         <img src={appLogo} alt="App Logo" className="w-full h-full object-contain" />
                       ) : (
                         <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
                           <ImageIcon className="w-8 h-8" />
                         </div>
                       )}
                    </div>
                    <div className="flex-1 w-full">
                      <p className="text-sm text-slate-500 mb-3">Upload logo institusi dalam format PNG atau SVG dengan background transparan. Ukuran maksimal 2MB.</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors w-full sm:w-auto">
                          <span className="mr-2">Pilih File Baru</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/png, image/svg+xml, image/jpeg" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setAppLogo(event.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {appLogo !== '/logo-sekolah.png' && (
                          <button
                            type="button"
                            onClick={() => setAppLogo('/logo-sekolah.png')}
                            className="px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            Reset ke Logo Default
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Theme Section */}
                <section className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                    <Palette className="w-5 h-5 text-blue-600" />
                    <h3 className="tracking-tight">Pengaturan Tema (Warna)</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
                    {[
                      { name: 'Ocean Blue', color: 'bg-blue-600', ring: 'ring-blue-200' },
                      { name: 'Cyan Tech', color: 'bg-cyan-500', ring: 'ring-cyan-200' },
                      { name: 'Indigo Royal', color: 'bg-indigo-600', ring: 'ring-indigo-200' },
                      { name: 'Emerald Eco', color: 'bg-emerald-500', ring: 'ring-emerald-200' }
                    ].map((theme, i) => (
                      <button 
                        key={i} 
                        className={`group flex flex-col items-center gap-2`}
                      >
                        <div className={`w-14 h-14 rounded-2xl ${theme.color} shadow-sm border-2 ${i === 0 ? 'border-slate-800 ring-4 ' + theme.ring : 'border-transparent opacity-80 group-hover:opacity-100 group-hover:scale-105'} transition-all`} />
                        <span className={`text-xs font-semibold ${i === 0 ? 'text-slate-800' : 'text-slate-500'}`}>{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Text Section */}
                <section className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                    <Type className="w-5 h-5 text-blue-600" />
                    <h3 className="tracking-tight">Pengaturan Teks (Copywriting)</h3>
                  </div>
                  <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Aplikasi</label>
                      <input type="text" defaultValue="TU SPENTIKA" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Sub-judul / Institusi</label>
                      <input type="text" defaultValue="SMPN 3 Kras" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Slogan Beranda</label>
                      <textarea rows={4} defaultValue="Portal resmi layanan administrasi dan tata usaha SMP Negeri 3 Kras. Kemudahan akses berbagai layanan surat-menyurat dan informasi sekolah dalam satu genggaman." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none bg-white leading-relaxed" />
                    </div>
                  </div>
                </section>

                {/* Announcement Section */}
                <section className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                    <Megaphone className="w-5 h-5 text-blue-600" />
                    <h3 className="tracking-tight">Pengumuman Berjalan (Marquee)</h3>
                  </div>
                  <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Teks Pengumuman</label>
                      <textarea 
                        rows={3} 
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        placeholder="Contoh: Libur Semester: Pelayanan TU Tutup sementara dari tanggal 20-25 Desember."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none bg-white leading-relaxed" 
                      />
                      <p className="text-xs text-slate-500 mt-2 font-medium">Kosongkan jika tidak ada pengumuman yang ingin ditampilkan di Beranda.</p>
                    </div>
                  </div>
                </section>

                {/* Security Section (Ubah PIN) */}
                <section className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                    <KeyRound className="w-5 h-5 text-blue-600" />
                    <h3 className="tracking-tight">Pengaturan Keamanan (Ubah PIN)</h3>
                  </div>
                  <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                    {pinChangeSuccess ? (
                      <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 font-semibold flex justify-center items-center">
                        PIN berhasil diperbarui!
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">PIN Baru (4 Digit)</label>
                            <input 
                              type="password" 
                              maxLength={4}
                              value={newPin}
                              onChange={(e) => {
                                setNewPin(e.target.value.replace(/\D/g, ''));
                                setPinChangeError('');
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800 bg-white" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Konfirmasi PIN Baru</label>
                            <input 
                              type="password" 
                              maxLength={4}
                              value={confirmPin}
                              onChange={(e) => {
                                setConfirmPin(e.target.value.replace(/\D/g, ''));
                                setPinChangeError('');
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800 bg-white" 
                            />
                          </div>
                        </div>
                        {pinChangeError && <p className="text-red-500 text-sm font-medium">{pinChangeError}</p>}
                        <div className="flex justify-end pt-2">
                          <button 
                            type="button"
                            onClick={() => {
                              if (newPin.length !== 4) {
                                setPinChangeError('PIN baru harus 4 digit.');
                                return;
                              }
                              if (newPin !== confirmPin) {
                                setPinChangeError('Konfirmasi PIN tidak cocok.');
                                return;
                              }
                              onUpdatePin(newPin);
                              setPinChangeSuccess(true);
                              setPinChangeError('');
                            }}
                            className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-colors shadow-sm"
                          >
                            Simpan PIN Baru
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isAuthenticated && (
          <div className="p-5 border-t border-slate-100 bg-white flex justify-end space-x-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] relative z-10">
            <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
              Kembali
            </button>
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

type View = 'beranda' | 'layanan' | 'informasi' | 'kontak';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('beranda');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [adminPin, setAdminPin] = useState('1234');
  const [appLogo, setAppLogo] = useState<string>(() => {
    return localStorage.getItem('tu_app_logo') || '/logo-sekolah.png';
  });

  useEffect(() => {
    if (appLogo) {
      localStorage.setItem('tu_app_logo', appLogo);
    }
  }, [appLogo]);
  const [announcement, setAnnouncement] = useState(() => {
    return localStorage.getItem('tu_announcement') || '';
  });

  // Save announcement to local storage
  useEffect(() => {
    localStorage.setItem('tu_announcement', announcement);
  }, [announcement]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: View) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-200 text-slate-700 overflow-x-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/30 blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-300/30 blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[20%] bg-indigo-300/20 blur-[150px]" 
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-blue-100 py-3 sm:py-4 shadow-sm' : 'bg-transparent py-4 sm:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('beranda')}>
              <img 
                src={appLogo || '/logo-sekolah.png'} 
                alt="Logo SMPN 3 Kras" 
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-sekolah.png';
                }}
              />
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-none">TU SPENTIKA</h1>
                <p className="text-[9px] sm:text-[10px] text-blue-600 font-bold tracking-widest uppercase mt-1">SMPN 3 Kras</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink active={activeView === 'beranda'} onClick={() => navigateTo('beranda')}>Beranda</NavLink>
              <NavLink active={activeView === 'layanan'} onClick={() => navigateTo('layanan')}>Layanan</NavLink>
              <NavLink active={activeView === 'informasi'} onClick={() => navigateTo('informasi')}>Informasi</NavLink>
              <NavLink active={activeView === 'kontak'} onClick={() => navigateTo('kontak')}>Kontak</NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <PWAInstallButton />
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="text-slate-500 hover:text-blue-600 transition-colors p-2"
                title="Pengaturan Admin"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button className="text-slate-500 hover:text-blue-600 transition-colors p-2">
                <Bell className="w-5 h-5" />
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
                Masuk
              </button>
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <PWAInstallButton />
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="text-slate-500 hover:text-blue-600 transition-colors p-2"
                title="Pengaturan Admin"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button className="text-slate-500 hover:text-blue-600 transition-colors p-2">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Users className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center px-2 py-2">
          {[
            { id: 'beranda', icon: Home, label: 'Beranda' },
            { id: 'layanan', icon: LayoutGrid, label: 'Layanan' },
            { id: 'informasi', icon: Info, label: 'Informasi' },
            { id: 'kontak', icon: Phone, label: 'Kontak' }
          ].map((item) => {
            const isActive = activeView === item.id;
            return (
              <motion.button 
                key={item.id}
                onClick={() => navigateTo(item.id as View)} 
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center p-2 min-w-[64px] z-10 transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute inset-0 bg-blue-50 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <item.icon className={`w-6 h-6 mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-bold">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <main className="relative z-10 pt-24 sm:pt-32 pb-32 sm:pb-24 flex-grow">
        <AnimatePresence>
          {isSettingsOpen && <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} adminPin={adminPin} onUpdatePin={setAdminPin} appLogo={appLogo} setAppLogo={setAppLogo} announcement={announcement} setAnnouncement={setAnnouncement} />}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          
          {/* ================= BERANDA ================= */}
          {activeView === 'beranda' && (
            <motion.section 
              key="beranda"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-20"
            >
              {announcement.trim() !== '' && (
                <div className="mb-8 overflow-hidden rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 flex items-center">
                  <div className="px-4 py-3 bg-blue-700 flex items-center shrink-0 z-10 relative">
                    <Megaphone className="w-5 h-5 mr-2 text-blue-100" />
                    <span className="font-bold text-sm tracking-wide">INFO TU</span>
                    {/* decorative triangle */}
                    <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-l-[8px] border-l-blue-700 border-b-[12px] border-b-transparent"></div>
                  </div>
                  <div className="flex-1 overflow-hidden whitespace-nowrap px-4 flex items-center">
                    {/* We use a simple CSS animation class or just motion.div for marquee */}
                    <motion.div
                      animate={{ x: ["100%", "-100%"] }}
                      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                      className="inline-block whitespace-nowrap font-medium"
                    >
                      {announcement}
                    </motion.div>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-600 text-sm font-bold mb-6 shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                    <span>Layanan Digital Tata Usaha Aktif</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4 sm:mb-6">
                    Layanan Administrasi <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                      Cepat & Transparan
                    </span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed font-medium">
                    Portal resmi layanan administrasi dan tata usaha SMP Negeri 3 Kras. Kemudahan akses berbagai layanan surat-menyurat dan informasi sekolah dalam satu genggaman.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12">
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigateTo('layanan')}
                      className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center group text-sm sm:text-base"
                    >
                      Ajukan Layanan 
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigateTo('informasi')}
                      className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold transition-all flex items-center justify-center shadow-sm hover:shadow-md text-sm sm:text-base"
                    >
                      Cek Status Pengajuan
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <StatCard icon={Users} value="850+" label="Siswa Aktif" />
                    <StatCard icon={FileCheck} value="12k+" label="Layanan Selesai" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative hidden lg:block"
                >
                  <motion.div 
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full aspect-square max-w-lg mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
                    
                    <div className="absolute top-10 left-10 right-10 bottom-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white shadow-2xl shadow-blue-900/10 p-6 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                      <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors cursor-default">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-slate-200 rounded w-1/3" />
                              <div className="h-2 bg-slate-100 rounded w-1/2" />
                            </div>
                            <div className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold shrink-0">
                              Selesai
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
                        <div className="h-4 bg-white/30 rounded w-1/4 mb-4" />
                        <div className="h-2 bg-white/20 rounded w-full mb-3" />
                        <div className="h-2 bg-white/20 rounded w-2/3" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* ================= LAYANAN ================= */}
          {activeView === 'layanan' && (
            <motion.section 
              key="layanan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-6 lg:px-8 py-8"
            >
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-6 tracking-tight">Daftar Layanan Administrasi</h2>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4 sm:px-0">Pilih layanan administrasi yang Anda butuhkan. Proses cepat, transparan, dan dapat dipantau secara online.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
                <ServiceCard 
                  delay={0.1}
                  icon={FileText}
                  title="Surat Keterangan Aktif"
                  description="Pengajuan surat keterangan aktif belajar untuk keperluan beasiswa, tunjangan, atau administrasi lainnya."
                />
                <ServiceCard 
                  delay={0.2}
                  icon={Users}
                  title="Mutasi Siswa"
                  description="Layanan pengajuan pindah sekolah (mutasi masuk / mutasi keluar) beserta persyaratan administrasinya."
                />
                <ServiceCard 
                  delay={0.3}
                  icon={Shield}
                  title="Legalisir Dokumen"
                  description="Permohonan legalisir ijazah, rapor, dan dokumen resmi sekolah lainnya untuk alumni dan siswa aktif."
                />
                <ServiceCard 
                  delay={0.4}
                  icon={BookOpen}
                  title="Permintaan Transkrip"
                  description="Layanan pencetakan ulang atau permintaan transkrip nilai akademik dari semester awal hingga akhir."
                />
                <ServiceCard 
                  delay={0.5}
                  icon={GraduationCap}
                  title="Layanan Alumni"
                  description="Pusat informasi dan layanan pendataan alumni, serta legalisir dokumen kelulusan."
                />
                <ServiceCard 
                  delay={0.6}
                  icon={Send}
                  title="Pengaduan & Saran"
                  description="Layanan penyampaian kritik, saran, atau pengaduan terkait layanan pendidikan di SMPN 3 Kras."
                />
                <ServiceCard 
                  delay={0.7}
                  icon={Package}
                  title="Peminjaman Aset"
                  description="Layanan peminjaman fasilitas dan aset sekolah secara online (ruangan, perlengkapan, dll)."
                  href="https://spega-aset.vercel.app/"
                />
                <ServiceCard 
                  delay={0.8}
                  icon={BookOpen}
                  title="Peminjaman Buku Perpus"
                  description="Akses e-perpus untuk pencarian dan peminjaman buku perpustakaan secara online."
                  href="https://eperpus-spega3.vercel.app/"
                />
              </div>
            </motion.section>
          )}

          {/* ================= INFORMASI ================= */}
          {activeView === 'informasi' && (
            <motion.section 
              key="informasi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
            >
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-6 tracking-tight">Pusat Informasi & Pelacakan</h2>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4 sm:px-0">Lacak status dokumen yang Anda ajukan atau cari informasi terkait persyaratan layanan tata usaha.</p>
              </div>

              <div className="p-5 sm:p-8 md:p-12 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl sm:shadow-2xl shadow-blue-900/20 relative overflow-hidden mb-8 sm:mb-16">
                <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-[60px] sm:blur-[80px]" />
                <div className="relative z-10 grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-4">Lacak Pengajuan Anda</h3>
                    <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md leading-relaxed">
                      Masukkan nomor resi atau NIK/NISN untuk memantau status pengajuan dokumen Anda secara real-time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Masukkan Nomor Resi / NISN" 
                          className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all font-medium text-base sm:text-lg shadow-lg"
                        />
                      </div>
                      <button className="px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-bold transition-all shadow-lg hover:shadow-xl text-base sm:text-lg">
                        Lacak
                      </button>
                    </div>
                  </div>
                  <div className="bg-black/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Contoh Format Pengajuan</h4>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-blue-100 text-sm sm:text-base">No. Resi</span>
                        <span className="font-mono font-bold text-cyan-300 bg-cyan-400/10 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm">REQ-2024-0892</span>
                      </div>
                      <div className="flex justify-between items-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-blue-100 text-sm sm:text-base">Estimasi Selesai</span>
                        <span className="font-bold text-white text-sm sm:text-base">1-2 Hari Kerja</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ================= KONTAK ================= */}
          {activeView === 'kontak' && (
            <motion.section 
              key="kontak"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
            >
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-6 tracking-tight">Hubungi Kami</h2>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4 sm:px-0">Kami siap melayani dan membantu keperluan administrasi Anda. Silakan hubungi kami melalui saluran berikut.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                {[
                  { icon: MapPin, title: "Alamat", content: "Jl. Raya Kras - Kediri, Kec. Kras, Kab. Kediri, Jawa Timur" },
                  { icon: Phone, title: "Telepon", content: "(0354) 123456\nSenin-Jumat, 07:00 - 15:00" },
                  { icon: Mail, title: "Email", content: "tu@smpn3kras.sch.id\nbalasan dalam 1x24 jam" },
                  { icon: Send, title: "Pengaduan", content: "Layanan aspirasi dan saran online terpadu sekolah" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileTap={{ scale: 0.96 }}
                    className="cursor-pointer p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-blue-50 shadow-md sm:shadow-xl shadow-blue-900/5 flex flex-row sm:flex-col items-center sm:text-center text-left gap-4 sm:gap-0"
                  >
                    <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 sm:mb-6">
                      <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-xl font-bold text-slate-800 mb-1 sm:mb-3">{item.title}</h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium whitespace-pre-line leading-relaxed">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <img src={appLogo || '/logo-sekolah.png'} alt="Logo SMPN 3 Kras" className="w-8 h-8 object-contain" />
            <span className="font-bold text-slate-800">SMPN 3 Kras</span>
          </div>
          <p className="text-slate-500 font-medium text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} Tata Usaha SMP Negeri 3 Kras. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}
