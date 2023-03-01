import { Outlet } from '@remix-run/react';
import { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';

export default function () {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
