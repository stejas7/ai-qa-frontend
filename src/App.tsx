import { useEffect } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import NewMissionPage from './pages/NewMissionPage';
import ExecutionCenterPage from './pages/ExecutionCenterPage';
import OverviewPage from './pages/OverviewPage';
import TechnologyPage from './pages/TechnologyPage';
import KnowledgePage from './pages/KnowledgePage';
import AgentActivityPage from './pages/AgentActivityPage';
import ApiReferencePage from './pages/ApiReferencePage';
import TejasAssistant from './components/TejasAssistant';
import { auravisApi } from './api/auravis';

const nav=[['Engineering Showcase','/technology'],['API Reference','/api-reference'],['Overview','/'],['New Mission','/mission'],['Mission Dashboard','/dashboard'],['Execution Center','/execution'],['Agent Activity','/agents'],['Knowledge & Impact','/knowledge']] as const;
const VISITOR_KEY='auravis_visitor_id';

function visitorId(){
  let id=localStorage.getItem(VISITOR_KEY);
  if(!id){id=typeof crypto!=='undefined'&&'randomUUID' in crypto?crypto.randomUUID():`visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;localStorage.setItem(VISITOR_KEY,id)}
  return id;
}

function AnalyticsTracker(){
  const location=useLocation();
  useEffect(()=>{auravisApi.recordVisit(location.pathname,visitorId()).catch(()=>undefined)},[location.pathname]);
  return null;
}

export default function App(){return <div className="app-shell"><AnalyticsTracker/><header className="topbar"><div className="brand"><div className="brand-mark">A</div><div><strong>AURAVIS</strong><span>Autonomous UAT Engineer</span></div></div><nav>{nav.map(([label,path])=><NavLink key={path} to={path} end={path==='/'} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}</nav></header><Routes><Route path="/" element={<OverviewPage/>}/><Route path="/technology" element={<TechnologyPage/>}/><Route path="/api-reference" element={<ApiReferencePage/>}/><Route path="/mission" element={<NewMissionPage/>}/><Route path="/dashboard" element={<DashboardPage/>}/><Route path="/execution" element={<ExecutionCenterPage/>}/><Route path="/agents" element={<AgentActivityPage/>}/><Route path="/knowledge" element={<KnowledgePage/>}/></Routes><TejasAssistant/></div>}
