import { NavLink, useLocation } from '@remix-run/react';
import React, { useEffect, useRef, useState } from 'react';
import { SidebarIcon } from '~/routes/test.$organisation/sidebar-icon';

type SidebarProps = React.PropsWithChildren<{
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const navigation = [
  { name: 'dashboard', label: 'Dashboard', path: 'dashboard' },
  { name: 'calendar', label: 'Calendar', path: 'calendar' },
  { name: 'users', label: 'Users', path: 'users' },
  { name: 'projects', label: 'Projects', path: 'projects' },
  { name: 'settings', label: 'Settings', path: 'settings' },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const location = useLocation();
  const { pathname } = location;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Close sidebar on outside click
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!sidebarRef.current || !triggerRef.current) {
        return;
      }
      if (
        !sidebarOpen ||
        sidebarRef.current.contains(target) ||
        triggerRef.current.contains(target)
      ) {
        return;
      }
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Close sidebar of ESC keypress
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      <div
        className={`fixed inset-0 z-40 bg-slate-900 bg-opacity-30 transition-opacity duration-200 lg:z-auto lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebarRef}
        className={`no-scrollbar absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-scroll bg-slate-800 p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:w-20 lg:translate-x-0 lg:overflow-y-auto lg:sidebar-expanded:!w-64 2xl:!w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <div className="mb-10 flex justify-between px-2">
          <button
            ref={triggerRef}
            className="text-slate-500 hover:text-slate-400 lg:hidden"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <NavLink to="." className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-slate-500">
              <span
                className="hidden w-6 text-center lg:block lg:sidebar-expanded:hidden 2xl:hidden"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Organisation</span>
            </h3>
            <ul className="mt-3">
              {navigation.map((item) => {
                const relativePath = `./${item.path}`;
                const isActive = pathname.includes(item.path);

                return (
                  <li
                    key={item.name}
                    className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
                      isActive && 'bg-slate-900'
                    }`}
                  >
                    <NavLink
                      to={relativePath}
                      className={`block truncate text-slate-200 transition duration-150 ${
                        isActive ? 'hover:text-slate-200' : 'hover:text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <SidebarIcon name={item.name} active={isActive} />
                        <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                          {item.label}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-auto hidden justify-end pt-3 lg:inline-flex 2xl:hidden">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded((prev) => !sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="h-6 w-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* <SidebarLinkGroup actionCondition={pathname.includes('settings')}>
  {(handleClick, open) => {
    return (
      <React.Fragment>
        <a
          href="#0"
          className={`block truncate text-slate-200 transition duration-150 ${
            pathname.includes('settings') ? 'hover:text-slate-200' : 'hover:text-white'
          }`}
          onClick={(e) => {
            e.preventDefault();
            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                <path
                  className={`fill-current ${
                    pathname.includes('settings') ? 'text-indigo-500' : 'text-slate-600'
                  }`}
                  d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                />
                <path
                  className={`fill-current ${
                    pathname.includes('settings') ? 'text-indigo-300' : 'text-slate-400'
                  }`}
                  d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                />
                <path
                  className={`fill-current ${
                    pathname.includes('settings') ? 'text-indigo-500' : 'text-slate-600'
                  }`}
                  d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                />
                <path
                  className={`fill-current ${
                    pathname.includes('settings') ? 'text-indigo-300' : 'text-slate-400'
                  }`}
                  d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                />
              </svg>
              <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                Settings
              </span>
            </div>
            <div className="ml-2 flex shrink-0">
              <svg
                className={`ml-1 h-3 w-3 shrink-0 fill-current text-slate-400 ${
                  open && 'rotate-180'
                }`}
                viewBox="0 0 12 12"
              >
                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
              </svg>
            </div>
          </div>
        </a>
        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
          <ul className={`mt-1 pl-9 ${!open && 'hidden'}`}>
            <li className="mb-1 last:mb-0">
              <NavLink
                end
                to="/settings/account"
                className={({ isActive }) =>
                  'block truncate transition duration-150 ' +
                  (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                }
              >
                <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  My Account
                </span>
              </NavLink>
            </li>
            <li className="mb-1 last:mb-0">
              <NavLink
                end
                to="/settings/notifications"
                className={({ isActive }) =>
                  'block truncate transition duration-150 ' +
                  (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                }
              >
                <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  My Notifications
                </span>
              </NavLink>
            </li>
            <li className="mb-1 last:mb-0">
              <NavLink
                end
                to="/settings/apps"
                className={({ isActive }) =>
                  'block truncate transition duration-150 ' +
                  (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                }
              >
                <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  Connected Apps
                </span>
              </NavLink>
            </li>
            <li className="mb-1 last:mb-0">
              <NavLink
                end
                to="/settings/plans"
                className={({ isActive }) =>
                  'block truncate transition duration-150 ' +
                  (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                }
              >
                <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  Plans
                </span>
              </NavLink>
            </li>
            <li className="mb-1 last:mb-0">
              <NavLink
                end
                to="/settings/billing"
                className={({ isActive }) =>
                  'block truncate transition duration-150 ' +
                  (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                }
              >
                <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  Billing & Invoices
                </span>
              </NavLink>
            </li>
            <li className="mb-1 last:mb-0">
              <NavLink
                end
                to="/settings/feedback"
                className={({ isActive }) =>
                  'block truncate transition duration-150 ' +
                  (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                }
              >
                <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                  Give Feedback
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }}
</SidebarLinkGroup> */
