type IconProps = { active: boolean };

const DashboardIcon = ({ active }: IconProps) => {
  return (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
      <path
        className={`fill-current ${active ? 'text-indigo-500' : 'text-slate-400'}`}
        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
      />
      <path
        className={`fill-current ${active ? 'text-indigo-600' : 'text-slate-600'}`}
        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
      />
      <path
        className={`fill-current ${active ? 'text-indigo-200' : 'text-slate-400'}`}
        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
      />
    </svg>
  );
};

const CalendarIcon = ({ active }: IconProps) => {
  return (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
      <path
        className={`fill-current ${active ? 'text-indigo-500' : 'text-slate-600'}`}
        d="M1 3h22v20H1z"
      />
      <path
        className={`fill-current ${active ? 'text-indigo-300' : 'text-slate-400'}`}
        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
      />
    </svg>
  );
};

const UsersIcon = ({ active }: IconProps) => {
  return (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
      <path
        className={`fill-current ${active ? 'text-indigo-500' : 'text-slate-600'}`}
        d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
      />
      <path
        className={`fill-current ${active ? 'text-indigo-300' : 'text-slate-400'}`}
        d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
      />
    </svg>
  );
};

const ProjectsIcon = ({ active }: IconProps) => {
  return (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
      <path
        className={`fill-current ${active ? 'text-indigo-500' : 'text-slate-600'}`}
        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
      />
      <path
        className={`fill-current ${active ? 'text-indigo-300' : 'text-slate-400'}`}
        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
      />
    </svg>
  );
};

const SettingsIcon = ({ active }: IconProps) => {
  return (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
      <path
        className={`fill-current ${active ? 'text-indigo-500' : 'text-slate-600'}`}
        d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
      />
      <path
        className={`fill-current ${active ? 'text-indigo-300' : 'text-slate-400'}`}
        d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
      />
      <path
        className={`fill-current ${active ? 'text-indigo-500' : 'text-slate-600'}`}
        d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
      />
      <path
        className={`fill-current ${active ? 'text-indigo-300' : 'text-slate-400'}`}
        d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
      />
    </svg>
  );
};

type SidebarIconProps = {
  name: string;
  active: boolean;
};

export const SidebarIcon = ({ name, active }: SidebarIconProps) => {
  switch (name) {
    case 'dashboard': {
      return <DashboardIcon active={active} />;
    }
    case 'calendar': {
      return <CalendarIcon active={active} />;
    }
    case 'users': {
      return <UsersIcon active={active} />;
    }
    case 'projects': {
      return <ProjectsIcon active={active} />;
    }
    case 'settings': {
      return <SettingsIcon active={active} />;
    }
    default: {
      return <span className="h-6 w-6 shrink-0"></span>;
    }
  }
};
