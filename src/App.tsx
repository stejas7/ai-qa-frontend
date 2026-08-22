import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import NewMissionPage from './pages/NewMissionPage';
import ExecutionCenterPage from './pages/ExecutionCenterPage';
import PublicLandingPage from './pages/PublicLandingPage';
import ProductBlueprintPage from './pages/ProductBlueprintPage';
import PublicLoginPage from './pages/PublicLoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AgentActivityPage from './pages/AgentActivityPage';
import ApiReferencePage from './pages/ApiReferencePage';
import HealingPage from './pages/HealingPage';
import PerformancePage from './pages/PerformancePage';
import AutomationScriptsPage from './pages/AutomationScriptsPage';
import TestManagementPage from './pages/TestManagementPage';
import AccountPage from './pages/AccountPage';
import PlatformPage from './pages/PlatformPage';
import IntegrationsPage from './pages/IntegrationsPage';
import ReleaseGovernancePage from './pages/ReleaseGovernancePage';
import ProductAssistant from './components/ProductAssistant';
import { aiUatApi } from './api/aiUat';

const primaryNav=[['Start UAT','/mission'],['Results','/dashboard'],['Release','/release']] as const;
const workspaceNav=[['Execution','/execution','Run history and evidence'],['Performance','/performance','Load and SLO checks'],['Automation','/automation-scripts','Reusable automation scripts'],['Test Management','/test-management','Traceability and coverage'],['Integrations','/integrations','External systems and webhooks'],['Company Setup','/account','Team, products and credentials']] as const;
const VISITOR_KEY='ai_uat_engineer_visitor_id';
function visitorId(){let id=localStorage.getItem(VISITOR_KEY);if(!id){id=typeof crypto!=='undefined'&&'randomUUID' in crypto?crypto.randomUUID():`visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;localStorage.setItem(VISITOR_KEY,id)}return id}
function AnalyticsTracker(){const location=useLocation();useEffect(()=>{aiUatApi.recordVisit(location.pathname,visitorId()).catch(()=>undefined)},[location.pathname]);return null}
function Protected({authenticated,children}:{authenticated:boolean;children:React.ReactNode}){return authenticated?<>{children}</>:<Navigate to="/login" replace/>}
function CompanyOnly({authenticated,platform,children}:{authenticated:boolean;platform:boolean;children:React.ReactNode}){if(!authenticated)return <Navigate to="/login" replace/>;return platform?<Navigate to="/platform" replace/>:<>{children}</>}

export default function App(){
  const location=useLocation(); const navigate=useNavigate();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false,staleTime:30000});
  const [accountOpen,setAccountOpen]=useState(false); const [workspaceOpen,setWorkspaceOpen]=useState(false); const [signingOut,setSigningOut]=useState(false);
  const authenticated=!!session.data; const platform=session.data?.role==='PLATFORM_ADMIN'||session.data?.role==='SUPER_ADMIN';
  useEffect(()=>{setAccountOpen(false);setWorkspaceOpen(false)},[location.pathname]);
  const signOut=async()=>{if(signingOut)return;setSigningOut(true);try{await aiUatApi.logout()}finally{setSigningOut(false)}};
  const openWorkspacePage=(path:string)=>{setWorkspaceOpen(false);navigate(path)};
  return <div className="app-shell"><AnalyticsTracker/>
    <header className="topbar"><button className="brand brand-button" type="button" onClick={()=>authenticated?navigate(platform?'/platform':'/mission'):navigate('/')}><div className="brand-mark">A</div><div><strong>AI UAT ENGINEER</strong><span>{platform?'Platform oversight':authenticated?'Company UAT workspace':'Requirement to release confidence'}</span></div></button><nav>{authenticated?<>{platform?<span className="platform-nav-label">Platform Dashboard</span>:primaryNav.map(([label,path])=><NavLink key={path} to={path} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}{!platform&&<button type="button" className={`nav-tray-btn ${workspaceOpen?'active':''}`} onClick={()=>{setWorkspaceOpen(v=>!v);setAccountOpen(false)}}>Workspace <span>⌄</span></button>}<button type="button" className={`account-nav-btn ${accountOpen?'active':''}`} onClick={()=>{setAccountOpen(v=>!v);setWorkspaceOpen(false)}}>{session.data?.email?.slice(0,1).toUpperCase()||'A'} <span>⌄</span></button></>:<><NavLink to="/" end>Product</NavLink><NavLink to="/how-it-works">How It Works</NavLink><NavLink to="/login">Sign in</NavLink></>}</nav></header>
    {authenticated&&workspaceOpen&&!platform&&<><button className="account-tray-backdrop" aria-label="Close workspace menu" onClick={()=>setWorkspaceOpen(false)}/><aside className="workspace-tray"><div className="tray-title"><div><span className="eyebrow">WORKSPACE</span><h2>Tools & setup</h2></div><button type="button" onClick={()=>setWorkspaceOpen(false)}>×</button></div><div className="workspace-tray-links">{workspaceNav.map(([label,path,description])=><button key={path} type="button" onClick={()=>openWorkspacePage(path)}><strong>{label}</strong><span>{description}</span></button>)}</div></aside></>}
    {authenticated&&accountOpen&&<><button className="account-tray-backdrop" aria-label="Close account tray" onClick={()=>setAccountOpen(false)}/><aside className="account-tray"><div className="account-tray-head"><div><span className="eyebrow">ACCOUNT</span><h2>Session</h2></div><button type="button" onClick={()=>setAccountOpen(false)}>×</button></div><div className="account-tray-user"><div className="account-avatar">{session.data!.email.slice(0,1).toUpperCase()}</div><div><strong>{session.data!.email}</strong><span>Signed in</span></div></div><div className="account-tray-grid"><div><span>Role</span><strong>{session.data!.role.replaceAll('_',' ')}</strong></div><div><span>Scope</span><strong>{platform?'All companies':`${session.data!.companyId.slice(0,8)}…`}</strong></div><div><span>Session</span><strong>Active</strong></div></div><button className="primary-btn account-signout" onClick={signOut} disabled={signingOut}>{signingOut?'Signing out…':'Sign out'}</button></aside></>}
    <Routes>
      <Route path="/" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<PublicLandingPage/>}/><Route path="/login" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<PublicLoginPage/>}/><Route path="/forgot-password" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<ForgotPasswordPage/>}/><Route path="/reset-password" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<ResetPasswordPage/>}/>
      <Route path="/how-it-works" element={platform?<Navigate to="/platform" replace/>:<ProductBlueprintPage/>}/><Route path="/knowledge" element={<Navigate to={platform?'/platform':authenticated?'/mission':'/how-it-works'} replace/>}/><Route path="/blueprint" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/><Route path="/product-blueprint" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/><Route path="/product-blueprint-gallery" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/><Route path="/architecture" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/><Route path="/roadmap" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/><Route path="/technology" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/>
      <Route path="/platform" element={<Protected authenticated={authenticated}><PlatformPage/></Protected>}/>
      <Route path="/account" element={<CompanyOnly authenticated={authenticated} platform={platform}><AccountPage/></CompanyOnly>}/><Route path="/mission" element={<CompanyOnly authenticated={authenticated} platform={platform}><NewMissionPage/></CompanyOnly>}/><Route path="/dashboard" element={<CompanyOnly authenticated={authenticated} platform={platform}><DashboardPage/></CompanyOnly>}/><Route path="/release" element={<CompanyOnly authenticated={authenticated} platform={platform}><ReleaseGovernancePage/></CompanyOnly>}/><Route path="/execution" element={<CompanyOnly authenticated={authenticated} platform={platform}><ExecutionCenterPage/></CompanyOnly>}/><Route path="/performance" element={<CompanyOnly authenticated={authenticated} platform={platform}><PerformancePage/></CompanyOnly>}/><Route path="/automation-scripts" element={<CompanyOnly authenticated={authenticated} platform={platform}><AutomationScriptsPage/></CompanyOnly>}/><Route path="/test-management" element={<CompanyOnly authenticated={authenticated} platform={platform}><TestManagementPage/></CompanyOnly>}/><Route path="/integrations" element={<CompanyOnly authenticated={authenticated} platform={platform}><IntegrationsPage/></CompanyOnly>}/><Route path="/api-reference" element={<CompanyOnly authenticated={authenticated} platform={platform}><ApiReferencePage/></CompanyOnly>}/><Route path="/agents" element={<CompanyOnly authenticated={authenticated} platform={platform}><AgentActivityPage/></CompanyOnly>}/><Route path="/healing" element={<CompanyOnly authenticated={authenticated} platform={platform}><HealingPage/></CompanyOnly>}/>
      <Route path="*" element={<Navigate to={authenticated?(platform?'/platform':'/mission'):'/'} replace/>}/>
    </Routes>{authenticated&&!platform&&<ProductAssistant/>}
  </div>;
}
