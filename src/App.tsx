import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
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

const appNav=[
  ['Start UAT','/mission'],
  ['Results','/dashboard'],
  ['Release','/release'],
  ['Execution','/execution'],
  ['Performance','/performance'],
  ['Automation','/automation-scripts'],
  ['Test Management','/test-management'],
  ['Integrations','/integrations']
] as const;

const VISITOR_KEY='ai_uat_engineer_visitor_id';
function visitorId(){let id=localStorage.getItem(VISITOR_KEY);if(!id){id=typeof crypto!=='undefined'&&'randomUUID' in crypto?crypto.randomUUID():`visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;localStorage.setItem(VISITOR_KEY,id)}return id}
function AnalyticsTracker(){const location=useLocation();useEffect(()=>{aiUatApi.recordVisit(location.pathname,visitorId()).catch(()=>undefined)},[location.pathname]);return null}
function Protected({authenticated,children}:{authenticated:boolean;children:React.ReactNode}){return authenticated?<>{children}</>:<Navigate to="/login" replace/>}

export default function App(){
  const location=useLocation();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false,staleTime:30000});
  const [accountOpen,setAccountOpen]=useState(false);
  const [signingOut,setSigningOut]=useState(false);
  const authenticated=!!session.data;
  const platform=session.data?.role==='PLATFORM_ADMIN'||session.data?.role==='SUPER_ADMIN';

  useEffect(()=>{setAccountOpen(false)},[location.pathname]);

  const signOut=async()=>{
    if(signingOut)return;
    setSigningOut(true);
    try{await aiUatApi.logout()}finally{setSigningOut(false)}
  };

  return <div className="app-shell">
    <AnalyticsTracker/>
    <header className="topbar">
      <div className="brand"><div className="brand-mark">A</div><div><strong>AI UAT ENGINEER</strong><span>{platform?'Platform control center':authenticated?'Company UAT workspace':'Requirement to release confidence'}</span></div></div>
      <nav>
        {authenticated?<>
          {platform&&<NavLink to="/platform" className={({isActive})=>isActive?'active':''}>Platform</NavLink>}
          {!platform&&appNav.map(([label,path])=><NavLink key={path} to={path} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}
          <button type="button" className={`account-nav-btn ${accountOpen?'active':''}`} onClick={()=>setAccountOpen(v=>!v)}>Account</button>
        </>:<>
          <NavLink to="/" end className={({isActive})=>isActive?'active':''}>Product</NavLink>
          <NavLink to="/how-it-works" className={({isActive})=>isActive?'active':''}>How It Works</NavLink>
          <NavLink to="/login" className={({isActive})=>isActive?'active':''}>Sign in</NavLink>
        </>}
      </nav>
    </header>

    {authenticated&&accountOpen&&<>
      <button className="account-tray-backdrop" aria-label="Close account tray" onClick={()=>setAccountOpen(false)}/>
      <aside className="account-tray" aria-label="Account details">
        <div className="account-tray-head"><div><span className="eyebrow">ACCOUNT</span><h2>Workspace session</h2></div><button type="button" onClick={()=>setAccountOpen(false)} aria-label="Close">×</button></div>
        <div className="account-tray-user"><div className="account-avatar">{session.data!.email.slice(0,1).toUpperCase()}</div><div><strong>{session.data!.email}</strong><span>Signed in</span></div></div>
        <div className="account-tray-grid">
          <div><span>Role</span><strong>{session.data!.role.replaceAll('_',' ')}</strong></div>
          <div><span>Company</span><strong>{platform?'Platform':`${session.data!.companyId.slice(0,8)}…`}</strong></div>
          <div><span>Session</span><strong>Active</strong></div>
        </div>
        {!platform&&<a className="secondary-btn account-tray-link" href="/account">Manage company setup</a>}
        {platform&&<a className="secondary-btn account-tray-link" href="/platform">Open platform control</a>}
        <button className="primary-btn account-signout" onClick={signOut} disabled={signingOut}>{signingOut?'Signing out…':'Sign out'}</button>
      </aside>
    </>}

    <Routes>
      <Route path="/" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<PublicLandingPage/>}/>
      <Route path="/login" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<PublicLoginPage/>}/>
      <Route path="/forgot-password" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<ForgotPasswordPage/>}/>
      <Route path="/reset-password" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<ResetPasswordPage/>}/>
      <Route path="/account" element={<AccountPage/>}/>
      <Route path="/how-it-works" element={<ProductBlueprintPage/>}/>
      <Route path="/blueprint" element={<Navigate to="/how-it-works" replace/>}/>
      <Route path="/product-blueprint" element={<Navigate to="/how-it-works" replace/>}/>
      <Route path="/product-blueprint-gallery" element={<Navigate to="/how-it-works" replace/>}/>
      <Route path="/architecture" element={<Navigate to="/how-it-works" replace/>}/>
      <Route path="/roadmap" element={<Navigate to="/how-it-works" replace/>}/>
      <Route path="/technology" element={<Navigate to="/how-it-works" replace/>}/>
      <Route path="/knowledge" element={<Navigate to={authenticated?'/mission':'/how-it-works'} replace/>}/>
      <Route path="/platform" element={<Protected authenticated={authenticated}><PlatformPage/></Protected>}/>
      <Route path="/mission" element={<Protected authenticated={authenticated}><NewMissionPage/></Protected>}/>
      <Route path="/dashboard" element={<Protected authenticated={authenticated}><DashboardPage/></Protected>}/>
      <Route path="/release" element={<Protected authenticated={authenticated}><ReleaseGovernancePage/></Protected>}/>
      <Route path="/execution" element={<Protected authenticated={authenticated}><ExecutionCenterPage/></Protected>}/>
      <Route path="/performance" element={<Protected authenticated={authenticated}><PerformancePage/></Protected>}/>
      <Route path="/automation-scripts" element={<Protected authenticated={authenticated}><AutomationScriptsPage/></Protected>}/>
      <Route path="/test-management" element={<Protected authenticated={authenticated}><TestManagementPage/></Protected>}/>
      <Route path="/integrations" element={<Protected authenticated={authenticated}><IntegrationsPage/></Protected>}/>
      <Route path="/api-reference" element={<Protected authenticated={authenticated}><ApiReferencePage/></Protected>}/>
      <Route path="/agents" element={<Protected authenticated={authenticated}><AgentActivityPage/></Protected>}/>
      <Route path="/healing" element={<Protected authenticated={authenticated}><HealingPage/></Protected>}/>
    </Routes>
    {authenticated&&<ProductAssistant/>}
  </div>
}
