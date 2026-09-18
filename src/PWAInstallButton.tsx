import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Determine which action to take: native install prompt, iOS guide, or fallback alert
  const handleInstallClick = () => {
    if (isInstallable) {
      install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Fallback for browsers that don't support beforeinstallprompt
      alert('Untuk menginstal aplikasi ini, ketuk tombol Menu di browser Anda lalu pilih "Tambahkan ke Layar Utama" (Add to Home Screen).');
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 rounded-lg bg-blue-50 text-blue-600 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold shadow-sm hover:bg-blue-100 transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        Install
      </button>

      <AnimatePresence>
        {showIOSGuide && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => setShowIOSGuide(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Install di iOS</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Untuk menginstal aplikasi ini di iPhone atau iPad Anda:
                </p>
                <div className="mt-4 p-4 rounded-xl bg-slate-50 space-y-3 text-sm text-slate-700 font-medium">
                  <p>1. Ketuk tombol <strong>Share</strong> (bagikan) di menu bawah Safari.</p>
                  <p>2. Gulir ke bawah lalu ketuk <strong>Add to Home Screen</strong> (Tambahkan ke Layar Utama).</p>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700"
                >
                  Tutup
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
};
