import React, { useState } from 'react';

type SidebarLinkGroupProps = {
  actionCondition?: boolean;
  children: (handleClick: () => void, open: boolean) => React.ReactNode;
};

export default function SidebarLinkGroup({ children, actionCondition }: SidebarLinkGroupProps) {
  const [open, setOpen] = useState(!!actionCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${actionCondition && 'bg-slate-900'}`}>
      {children(handleClick, open)}
    </li>
  );
}
