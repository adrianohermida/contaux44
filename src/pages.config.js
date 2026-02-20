/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import APIDashboard from './pages/APIDashboard';
import About from './pages/About';
import AccountingCalendar from './pages/AccountingCalendar';
import Admin from './pages/Admin';
import AdvancedML from './pages/AdvancedML';
import AdvancedReports from './pages/AdvancedReports';
import AnalyticsAdvanced from './pages/AnalyticsAdvanced';
import App from './pages/App';
import AuditLogs from './pages/AuditLogs';
import Automations from './pages/Automations';
import BankReconciliation from './pages/BankReconciliation';
import Blog from './pages/Blog';
import BlogManager from './pages/BlogManager';
import BlogSingle from './pages/BlogSingle';
import CachingStrategy from './pages/CachingStrategy';
import CashFlow from './pages/CashFlow';
import CashFlowForecast from './pages/CashFlowForecast';
import ChartOfAccounts from './pages/ChartOfAccounts';
import ClientPanel from './pages/ClientPanel';
import ClientPortal from './pages/ClientPortal';
import Clients from './pages/Clients';
import Communication from './pages/Communication';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import DocumentManagement from './pages/DocumentManagement';
import Entries from './pages/Entries';
import Home from './pages/Home';
import ImportCSV from './pages/ImportCSV';
import Invoicing from './pages/Invoicing';
import LegalProcesses from './pages/LegalProcesses';
import ManualPosting from './pages/ManualPosting';
import MobileAnalyticsDashboard from './pages/MobileAnalyticsDashboard';
import MobileOptimized from './pages/MobileOptimized';
import MyBookmarks from './pages/MyBookmarks';
import Notifications from './pages/Notifications';
import OnboardClient from './pages/OnboardClient';
import PWASetup from './pages/PWASetup';
import Payments from './pages/Payments';
import PerformanceOptimization from './pages/PerformanceOptimization';
import Portfolio from './pages/Portfolio';
import PortfolioSingle from './pages/PortfolioSingle';
import Pricing from './pages/Pricing';
import ProfilingDashboard from './pages/ProfilingDashboard';
import QuoteRequest from './pages/QuoteRequest';
import Quotes from './pages/Quotes';
import RBACManagement from './pages/RBACManagement';
import RLSDebugger from './pages/RLSDebugger';
import RealtimeSyncDashboard from './pages/RealtimeSyncDashboard';
import Reports from './pages/Reports';
import Sales from './pages/Sales';
import SecurityCenter from './pages/SecurityCenter';
import Services from './pages/Services';
import ServicesPage from './pages/ServicesPage';
import SettingsPage from './pages/SettingsPage';
import TaxInvoices from './pages/TaxInvoices';
import Tickets from './pages/Tickets';
import Transactions from './pages/Transactions';
import VirtualCounter from './pages/VirtualCounter';
import Welcome from './pages/Welcome';
import SprintReview from './pages/SprintReview';
import ABTesting from './pages/ABTesting';
import NotificationsCenter from './pages/NotificationsCenter';
import Sprint7Tracker from './pages/Sprint7Tracker';
import ConversionTracking from './pages/ConversionTracking';
import CustomReports from './pages/CustomReports';
import InfrastructureMonitoring from './pages/InfrastructureMonitoring';
import ErrorTracking from './pages/ErrorTracking';
import Sprint8Tracker from './pages/Sprint8Tracker';
import __Layout from './Layout.jsx';


export const PAGES = {
    "APIDashboard": APIDashboard,
    "About": About,
    "AccountingCalendar": AccountingCalendar,
    "Admin": Admin,
    "AdvancedML": AdvancedML,
    "AdvancedReports": AdvancedReports,
    "AnalyticsAdvanced": AnalyticsAdvanced,
    "App": App,
    "AuditLogs": AuditLogs,
    "Automations": Automations,
    "BankReconciliation": BankReconciliation,
    "Blog": Blog,
    "BlogManager": BlogManager,
    "BlogSingle": BlogSingle,
    "CachingStrategy": CachingStrategy,
    "CashFlow": CashFlow,
    "CashFlowForecast": CashFlowForecast,
    "ChartOfAccounts": ChartOfAccounts,
    "ClientPanel": ClientPanel,
    "ClientPortal": ClientPortal,
    "Clients": Clients,
    "Communication": Communication,
    "Contact": Contact,
    "Dashboard": Dashboard,
    "DocumentManagement": DocumentManagement,
    "Entries": Entries,
    "Home": Home,
    "ImportCSV": ImportCSV,
    "Invoicing": Invoicing,
    "LegalProcesses": LegalProcesses,
    "ManualPosting": ManualPosting,
    "MobileAnalyticsDashboard": MobileAnalyticsDashboard,
    "MobileOptimized": MobileOptimized,
    "MyBookmarks": MyBookmarks,
    "Notifications": Notifications,
    "OnboardClient": OnboardClient,
    "PWASetup": PWASetup,
    "Payments": Payments,
    "PerformanceOptimization": PerformanceOptimization,
    "Portfolio": Portfolio,
    "PortfolioSingle": PortfolioSingle,
    "Pricing": Pricing,
    "ProfilingDashboard": ProfilingDashboard,
    "QuoteRequest": QuoteRequest,
    "Quotes": Quotes,
    "RBACManagement": RBACManagement,
    "RLSDebugger": RLSDebugger,
    "RealtimeSyncDashboard": RealtimeSyncDashboard,
    "Reports": Reports,
    "Sales": Sales,
    "SecurityCenter": SecurityCenter,
    "Services": Services,
    "ServicesPage": ServicesPage,
    "SettingsPage": SettingsPage,
    "TaxInvoices": TaxInvoices,
    "Tickets": Tickets,
    "Transactions": Transactions,
    "VirtualCounter": VirtualCounter,
    "Welcome": Welcome,
    "SprintReview": SprintReview,
    "ABTesting": ABTesting,
    "NotificationsCenter": NotificationsCenter,
    "Sprint7Tracker": Sprint7Tracker,
    "ConversionTracking": ConversionTracking,
    "CustomReports": CustomReports,
    "InfrastructureMonitoring": InfrastructureMonitoring,
    "ErrorTracking": ErrorTracking,
    "Sprint8Tracker": Sprint8Tracker,
}

export const pagesConfig = {
    mainPage: "Blog",
    Pages: PAGES,
    Layout: __Layout,
};