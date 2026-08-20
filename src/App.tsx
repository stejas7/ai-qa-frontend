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
import HealingPage from './pages/HealingPage';
import PerformancePage from './pages/PerformancePage';
import AutomationScriptsPage from './pages/AutomationScriptsPage';
import TestManagementPage from './pages/TestManagementPage';
import AccountPage from './pages/AccountPage';
import ProductAssistant from './components/ProductAssistant';
import { aiUatApi } from './api/aiUat';

const nav=[['Home','/'],['Start UAT','/mission'],['Results','/dashboard'],['Execution','/execution'],['Performance','/performance'],['Automation','/automation-scripts'],['Test Management','/test-management'],['Knowledge','/knowledge'],['Account','/account']] as const;
const VISITOR_KEY='ai_uat_engineer_visitor_id';
function visitorId(){let id=localStorage.getItem(VISITOR_KEY);if(!id){id=typeof crypto!=='undefined'&&'randomUUID' in crypto?crypto.randomUUID():`visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;localStorage.setItem(VISITOR_KEY,id)}return id}
function AnalyticsTracker(){const location=useLocation();useEffect(()=>{aiUatApi.recordVisit(location.pathname,visitorId()).catch(()=>undefined)},[location.pathname]);return null}

export default function App(){return <div className="app-shell"><AnalyticsTracker/><header className="topbar"><div className="brand"><div className="brand-mark">A</div><div><strong>AI UAT ENGINEER</strong><span>Requirement to release confidence</span></div></div><nav>{nav.map(([label,path])=><NavLink key={path} to={path} end={path==='/' } className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}</nav></header><Routes><Route path="/" element={<OverviewPage/>}/><Route path="/technology" element={<TechnologyPage/>}/><Route path="/api-reference" element={<ApiReferencePage/>}/><Route path="/mission" element={<NewMissionPage/>}/><Route path="/dashboard" element={<DashboardPage/>}/><Route path="/execution" element={<ExecutionCenterPage/>}/><Route path="/performance" element={<PerformancePage/>}/><Route path="/automation-scripts" element={<AutomationScriptsPage/>}/><Route path="/test-management" element={<TestManagementPage/>}/><Route path="/agents" element={<AgentActivityPage/>}/><Route path="/healing" element={<HealingPage/>}/><Route path="/knowledge" element={<KnowledgePage/>}/><Route path="/account" element={<AccountPage/>}/></Routes><ProductAssistant/></div>}
