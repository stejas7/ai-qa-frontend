import { NavLink, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import NewMissionPage from './pages/NewMissionPage';
import ExecutionCenterPage from './pages/ExecutionCenterPage';
import OverviewPage from './pages/OverviewPage';
import TechnologyPage from './pages/TechnologyPage';
import KnowledgePage from './pages/KnowledgePage';

const nav=[['Engineering Showcase','/technology'],['Overview','/'],['New Mission','/mission'],['Mission Dashboard','/dashboard'],['Execution Center','/execution'],['Knowledge & Impact','/knowledge']] as const;

export default function App(){return <div className="app-shell"><header className="topbar"><div className="brand"><div className="brand-mark">A</div><div><strong>AURAVIS</strong><span>Autonomous UAT Engineer</span></div></div><nav>{nav.map(([label,path])=><NavLink key={path} to={path} end={path==='/'} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}</nav></header><Routes><Route path="/" element={<OverviewPage/>}/><Route path="/technology" element={<TechnologyPage/>}/><Route path="/mission" element={<NewMissionPage/>}/><Route path="/dashboard" element={<DashboardPage/>}/><Route path="/execution" element={<ExecutionCenterPage/>}/><Route path="/knowledge" element={<KnowledgePage/>}/></Routes></div>}
