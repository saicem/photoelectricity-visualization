import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Waves, BookOpen, FlaskConical, Lightbulb, Flame, CircuitBoard,
  BarChart3, Compass, Radio, BookText, ChevronDown, Menu, X, Home,
} from 'lucide-react';
import { useState } from 'react';

const learnItems = [
  { path: '/learn/light-basics', label: '光波基础', icon: Lightbulb },
  { path: '/learn/laser', label: '激光器', icon: Flame },
  { path: '/learn/interference', label: '干涉原理', icon: Waves },
  { path: '/learn/mz-modulator', label: 'MZ 调制器', icon: CircuitBoard },
  { path: '/learn/iq-modulator', label: 'IQ 调制器', icon: BarChart3 },
  { path: '/learn/polarization', label: '偏振复用', icon: Compass },
  { path: '/learn/dual-polarization', label: '双偏振 IQ', icon: BarChart3 },
  { path: '/learn/receiver', label: '光接收器', icon: Radio },
  { path: '/learn/glossary', label: '术语表', icon: BookText },
];

const playgroundItems = [
  { path: '/playground/interference', label: '光波干涉', icon: Waves },
  { path: '/playground/mz-modulator', label: 'MZ 调制器', icon: CircuitBoard },
  { path: '/playground/iq-modulator', label: 'IQ 调制器', icon: BarChart3 },
  { path: '/playground/polarization', label: '偏振复用', icon: Compass },
  { path: '/playground/receiver', label: '光接收器', icon: Radio },
];

function NavItem({ to, icon: Icon, label, active }: { to: string; icon: React.ElementType; label: string; active: boolean }) {
  const isLearn = to.startsWith('/learn');
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
        active
          ? isLearn ? 'bg-laser-cyan/15 text-laser-cyan' : 'bg-laser-purple/15 text-laser-purple'
          : 'text-lab-muted hover:text-lab-text hover:bg-lab-surface/50'
      )}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(true);
  const [playgroundOpen, setPlaygroundOpen] = useState(true);

  const isLearn = location.pathname.startsWith('/learn');
  const isPlayground = location.pathname.startsWith('/playground');
  const isActive = (path: string) => location.pathname === path;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <Link to="/" className="flex items-center gap-3 px-4 h-16 border-b border-lab-border flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-laser-cyan to-laser-purple flex items-center justify-center flex-shrink-0">
          <Waves className="w-5 h-5 text-white" />
        </div>
        <span className="font-display font-bold text-base text-lab-text whitespace-nowrap">光电通讯实验室</span>
      </Link>

      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        <NavItem to="/" icon={Home} label="首页" active={location.pathname === '/'} />

        <div>
          <button
            onClick={() => setLearnOpen(!learnOpen)}
            className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-lab-muted uppercase tracking-wider"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn</span>
            </div>
            <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', learnOpen && 'rotate-180')} />
          </button>
          <div className={cn('mt-1 space-y-0.5', !learnOpen && 'hidden')}>
            {learnItems.map((item) => (
              <NavItem key={item.path} to={item.path} icon={item.icon} label={item.label} active={isActive(item.path)} />
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setPlaygroundOpen(!playgroundOpen)}
            className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-lab-muted uppercase tracking-wider"
          >
            <div className="flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Playground</span>
            </div>
            <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', playgroundOpen && 'rotate-180')} />
          </button>
          <div className={cn('mt-1 space-y-0.5', !playgroundOpen && 'hidden')}>
            {playgroundItems.map((item) => (
              <NavItem key={item.path} to={item.path} icon={item.icon} label={item.label} active={isActive(item.path)} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-56 bg-lab-surface/30 backdrop-blur-md border-r border-lab-border z-40 flex-col">
        {sidebarContent}
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-lab-bg/80 backdrop-blur-md border-b border-lab-border h-14 flex items-center px-3 gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lab-muted hover:text-lab-text hover:bg-lab-surface/50"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="font-display font-bold text-sm text-lab-text">
          光电通讯实验室
        </Link>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-lab-bg border-r border-lab-border shadow-2xl">
            <div className="flex items-center justify-between px-4 h-14 border-b border-lab-border">
              <span className="font-display font-bold text-sm text-lab-text">导航</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lab-muted hover:text-lab-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
