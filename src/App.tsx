import { useState } from 'react';
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

const companyNav=[
  ['▶','Start UAT','/mission'],
  ['▦','Results','/dashboard'],
  ['✓','Release','/release'],
  ['◉','Execution','/execution'],
  ['↗','Performance','/performance'],
  ['⌘','Automation','/automation-scripts'],
  ['☷','Test Management','/test-management'],
  ['⛓','Integrations','/integrations'],
  ['⚙','Company Setup','/account']
] as const;

function Protected({authenticated,children}:{authenticated:boolean;children:React.ReactNode}){return authenticated?<>{children}</>:<Navigate to="/login" replace/>}
function CompanyOnly({authenticated,platform,children}:{authenticated:boolean;platform:boolean;children:React.ReactNode}){if(!authenticated)return <Navigate to="/login" replace/>;return platform?<Navigate to="/platform" replace/>:<>{children}</>}

export default function App(){
  const navigate=useNavigate();
  const location=useLocation();
  const session=useQuery({queryKey:['current-user'],queryFn:aiUatApi.currentUser,retry:false,staleTime:30000});
  const [collapsed,setCollapsed]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const [accountOpen,setAccountOpen]=useState(false);
  const [signingOut,setSigningOut]=useState(false);
  const authenticated=!!session.data;
  const platform=session.data?.role==='PLATFORM_ADMIN'||session.data?.role==='SUPER_ADMIN';

  const signOut=async()=>{if(signingOut)return;setSigningOut(true);try{await aiUatApi.logout()}finally{setSigningOut(false)}};
  const closeMobile=()=>setMobileOpen(false);

  const routes=<Routes>
    <Route path="/" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<PublicLandingPage/>}/>
    <Route path="/login" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<PublicLoginPage/>}/>
    <Route path="/forgot-password" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<ForgotPasswordPage/>}/>
    <Route path="/reset-password" element={authenticated?<Navigate to={platform?'/platform':'/mission'} replace/>:<ResetPasswordPage/>}/>
    <Route path="/how-it-works" element={platform?<Navigate to="/platform" replace/>:<ProductBlueprintPage/>}/>
    <Route path="/knowledge" element={<Navigate to={platform?'/platform':authenticated?'/mission':'/how-it-works'} replace/>}/>
    <Route path="/blueprint" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/>
    <Route path="/product-blueprint" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/>
    <Route path="/product-blueprint-gallery" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/>
    <Route path="/architecture" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/>
    <Route path="/roadmap" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/>
    <Route path="/technology" element={<Navigate to={platform?'/platform':'/how-it-works'} replace/>}/>
    <Route path="/platform" element={<Protected authenticated={authenticated}><PlatformPage/></Protected>}/>
    <Route path="/account" element={<CompanyOnly authenticated={authenticated} platform={platform}><AccountPage/></CompanyOnly>}/>
    <Route path="/mission" element={<CompanyOnly authenticated={authenticated} platform={platform}><NewMissionPage/></CompanyOnly>}/>
    <Route path="/dashboard" element={<CompanyOnly authenticated={authenticated} platform={platform}><DashboardPage/></CompanyOnly>}/>
    <Route path="/release" element={<CompanyOnly authenticated={authenticated} platform={platform}><ReleaseGovernancePage/></CompanyOnly>}/>
    <Route path="/execution" element={<CompanyOnly authenticated={authenticated} platform={platform}><ExecutionCenterPage/></CompanyOnly>}/>
    <Route path="/performance" element={<CompanyOnly authenticated={authenticated} platform={platform}><PerformancePage/></CompanyOnly>}/>
    <Route path="/automation-scripts" element={<CompanyOnly authenticated={authenticated} platform={platform}><AutomationScriptsPage/></CompanyOnly>}/>
    <Route path="/test-management" element={<CompanyOnly authenticated={authenticated} platform={platform}><TestManagementPage/></CompanyOnly>}/>
    <Route path="/integrations" element={<CompanyOnly authenticated={authenticated} platform={platform}><IntegrationsPage/></CompanyOnly>}/>
    <Route path="/api-reference" element={<CompanyOnly authenticated={authenticated} platform={platform}><ApiReferencePage/></CompanyOnly>}/>
    <Route path="/agents" element={<CompanyOnly authenticated={authenticated} platform={platform}><AgentActivityPage/></CompanyOnly>}/>
    <Route path="/healing" element={<CompanyOnly authenticated={authenticated} platform={platform}><HealingPage/></CompanyOnly>}/>
    <Route path="*" element={<Navigate to={authenticated?(platform?'/platform':'/mission'):'/'} replace/>}/>
  </Routes>;

  if(!authenticated){return <div className="app-shell"><header className="topbar"><button className="brand brand-button" type="button" onClick={()=>navigate('/')}><div className="brand-mark">A</div><div><strong>AI UAT ENGINEER</strong><span>Requirement to release confidence</span></div></button><nav><NavLink to="/" end>Product</NavLink><NavLink to="/how-it-works">How It Works</NavLink><NavLink to="/login">Sign in</NavLink></nav></header>{routes}</div>}

  return <div className={`authenticated-shell ${collapsed?'sidebar-collapsed':''}`}>
    <button className="mobile-menu-btn" type="button" onClick={()=>setMobileOpen(true)} aria-label="Open navigation">☰</button>
    {mobileOpen&&<button className="sidebar-mobile-backdrop" onClick={closeMobile} aria-label="Close navigation"/>}
    <aside className={`app-sidebar ${mobileOpen?'mobile-open':''}`}>
      <div className="sidebar-brand" onClick={()=>navigate(platform?'/platform':'/mission')} role="button" tabIndex={0}>
        <div className="sidebar-logo">A</div>
        {!collapsed&&<div><strong>AI UAT</strong><span>Autonomous UAT Engineer</span></div>}
      </div>
      <button className="sidebar-collapse" type="button" onClick={()=>setCollapsed(v=>!v)} title={collapsed?'Expand sidebar':'Collapse sidebar'}>{collapsed?'›':'‹'}</button>
      <nav className="sidebar-nav" onClick={closeMobile}>
        {platform?<NavLink to="/platform" className={({isActive})=>`sidebar-link ${isActive?'active':''}`}><span className="sidebar-icon">▦</span>{!collapsed&&<span>Platform Dashboard</span>}</NavLink>:companyNav.map(([icon,label,path])=><NavLink key={path} to={path} className={({isActive})=>`sidebar-link ${isActive?'active':''}`}><span className="sidebar-icon">{icon}</span>{!collapsed&&<span>{label}</span>}</NavLink>)}
      </nav>
      <div className="sidebar-footer">
        <button className={`sidebar-account ${accountOpen?'open':''}`} type="button" onClick={()=>setAccountOpen(v=>!v)}>
          <span className="sidebar-avatar">{session.data!.email.slice(0,1).toUpperCase()}</span>
          {!collapsed&&<span className="sidebar-account-copy"><strong>{session.data!.email}</strong><small>{platform?'Platform Admin':session.data!.role.replaceAll('_',' ')}</small></span>}
        </button>
        {accountOpen&&!collapsed&&<div className="sidebar-account-panel"><div><span>Role</span><strong>{session.data!.role.replaceAll('_',' ')}</strong></div><div><span>Scope</span><strong>{platform?'All companies':'Company workspace'}</strong></div><div><span>Session</span><strong>Active</strong></div><button onClick={signOut} disabled={signingOut}>{signingOut?'Signing out…':'Sign out'}</button></div>}
        {!collapsed&&<div className="sidebar-status"><span className="status-dot"/><div><strong>{platform?'Platform oversight':'Workspace online'}</strong><small>{platform?'Watching all tenants':'Ready for UAT'}</small></div></div>}
      </div>
    </aside>
    <main className="authenticated-content" key={location.pathname}>{routes}</main>
    {!platform&&<ProductAssistant/>}
  </div>;
}
