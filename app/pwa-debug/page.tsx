'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PWADebugPage() {
  const [swStatus, setSWStatus] = useState('Checking...');
  const [manifestStatus, setManifestStatus] = useState('Checking...');
  const [installable, setInstallable] = useState('Checking...');
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check standalone mode
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Check Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        if (regs.length > 0) {
          setSWStatus(`✅ Registered (${regs.length} registration(s))`);
        } else {
          setSWStatus('❌ Not registered');
        }
      });
    } else {
      setSWStatus('❌ Not supported');
    }

    // Check Manifest
    fetch('/manifest.json')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Status: ${res.status}`);
      })
      .then((manifest) => {
        setManifestStatus(`✅ Valid (${manifest.name})`);
      })
      .catch((err) => {
        setManifestStatus(`❌ Error: ${err.message}`);
      });

    // Check installability
    const handleBeforeInstall = (e: any) => {
      console.log('beforeinstallprompt fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable('✅ Ready to install');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Set timeout to check if event fired
    setTimeout(() => {
      if (installable === 'Checking...') {
        if (standalone) {
          setInstallable('✅ Already installed');
        } else {
          setInstallable('❌ Not installable (check requirements)');
        }
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, [installable, isStandalone]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Install outcome:', outcome);
      setDeferredPrompt(null);
    }
  };

  const registerSW = async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      setSWStatus(`✅ Registered successfully`);
      console.log('SW registered:', reg);
    } catch (err: any) {
      setSWStatus(`❌ Error: ${err.message}`);
      console.error('SW error:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">PWA Debug Page</h1>

      <div className="space-y-6">
        {/* Status Cards */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4">PWA Status</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Service Worker:</span>
              <span className="text-sm">{swStatus}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Manifest:</span>
              <span className="text-sm">{manifestStatus}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Installable:</span>
              <span className="text-sm">{installable}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Display Mode:</span>
              <span className="text-sm">
                {isStandalone ? '✅ Standalone (Installed)' : '❌ Browser'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">HTTPS:</span>
              <span className="text-sm">
                {window.location.protocol === 'https:' ? '✅ Secure' : '❌ Not secure'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4">Actions</h2>
          
          <div className="space-y-3">
            <Button
              onClick={registerSW}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Register Service Worker
            </Button>

            {deferredPrompt && (
              <Button
                onClick={handleInstall}
                className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white"
              >
                Install App Now
              </Button>
            )}

            <Button
              onClick={() => window.location.href = '/manifest.json'}
              variant="outline"
              className="w-full"
            >
              View Manifest
            </Button>

            <Button
              onClick={() => window.location.href = '/sw.js'}
              variant="outline"
              className="w-full"
            >
              View Service Worker
            </Button>
          </div>
        </div>

        {/* Console Logs */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4">Console Commands</h2>
          
          <div className="space-y-2 text-sm">
            <p className="font-mono bg-gray-100 p-2 rounded">
              navigator.serviceWorker.getRegistrations()
            </p>
            <p className="font-mono bg-gray-100 p-2 rounded">
              caches.keys()
            </p>
            <p className="font-mono bg-gray-100 p-2 rounded">
              window.matchMedia('(display-mode: standalone)').matches
            </p>
          </div>
        </div>

        {/* Lighthouse Test */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4">Next Steps</h2>
          
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Open Chrome DevTools (F12)</li>
            <li>Go to Application tab → Manifest</li>
            <li>Check "Installability" section at bottom</li>
            <li>Go to Lighthouse tab</li>
            <li>Run PWA audit</li>
            <li>Check console for any errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

