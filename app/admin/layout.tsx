'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth, onAuthStateChanged, signOut, type User } from '@/lib/firebase';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get user token to check for admin claim
        const tokenResult = await currentUser.getIdTokenResult();
        const hasAdminClaim = tokenResult.claims.admin === true;
        
        if (hasAdminClaim) {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          // Not an admin, redirect to home
          router.push('/');
        }
      } else {
        // Not logged in, redirect to admin login
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If on login page, don't show the layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not admin, show nothing (will redirect)
  if (!isAdmin || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-[#0A0A0A] border-b border-[#2F2F2F]/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-cyan-400">Blackwire Admin</h1>
              <span className="text-gray-400 text-sm">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white text-sm font-medium">{user.email}</div>
                <div className="text-gray-400 text-xs">Administrator</div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0A0A0A] border-r border-[#2F2F2F]/50 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin/crypto-orders"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/crypto-orders'
                  ? 'bg-cyan-400/10 text-cyan-400'
                  : 'text-gray-400 hover:bg-[#151515] hover:text-white'
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Crypto Orders</span>
            </Link>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
