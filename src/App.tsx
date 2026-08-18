import { NavLink, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PlaceholderPage from './pages/PlaceholderPage';

const nav = [
  ['Engineering Showcase', '/technology'],
  ['Overview', '/'],
  ['New Mission', '/mission'],
  ['Mission Dashboard', '/dashboard'],
  ['Execution Center', '/execution'],
  ['Knowledge & Impact', '/knowledge']
] as const;

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div><strong>AURAVIS</strong><span>Autonomous UAT Engineer</span></div>
        </div>
        <nav>{nav.map(([label, path]) => <NavLink key={path} to={path} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}</nav>
      </header>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<PlaceholderPage title="Auravis Overview" />} />
        <Route path="/technology" element={<PlaceholderPage title="Technology Behind Auravis" />} />
        <Route path="/mission" element={<PlaceholderPage title="New Autonomous Mission" />} />
        <Route path="/execution" element={<PlaceholderPage title="Execution Center" />} />
        <Route path="/knowledge" element={<PlaceholderPage title="Knowledge & Impact" />} />
      </Routes>
    </div>
  );
}
