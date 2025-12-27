import { CheckSquare, DollarSign, Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Tasks', path: '/dashboard', icon: CheckSquare },
    { name: 'Money', path: '/money', icon: DollarSign, disabled: true },
    { name: 'Fitness', path: '/fitness', icon: Activity, disabled: true },
  ];

  return (
    <aside className="hidden md:block w-64 bg-card-bg border-r border-border min-h-screen">
      <div className="p-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.disabled ? '#' : item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  item.disabled
                    ? 'opacity-50 cursor-not-allowed text-text-tertiary'
                    : isActive
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                }`
              }
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
              {item.disabled && (
                <span className="ml-auto text-xs bg-bg-tertiary px-2 py-0.5 rounded">
                  Soon
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
