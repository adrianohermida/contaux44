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
import About from './pages/About';
import AccountingCalendar from './pages/AccountingCalendar';
import Admin from './pages/Admin';
import App from './pages/App';
import AuditLogs from './pages/AuditLogs';
import Automations from './pages/Automations';
import BankReconciliation from './pages/BankReconciliation';
import Blog from './pages/Blog';
import BlogManager from './pages/BlogManager';
import BlogSingle from './pages/BlogSingle';
import Campaigns from './pages/Campaigns';
import CashFlow from './pages/CashFlow';
import CashFlowForecast from './pages/CashFlowForecast';
import ChartOfAccounts from './pages/ChartOfAccounts';
import ClientPanel from './pages/ClientPanel';
import ClientPortal from './pages/ClientPortal';
import Clients from './pages/Clients';
import Communication from './pages/Communication';
import Contact from './pages/Contact';
import ContactDetails from './pages/ContactDetails';
import ContractManagement from './pages/ContractManagement';
import ConversionRateOptimizer from './pages/ConversionRateOptimizer';
import ConversionTracking from './pages/ConversionTracking';
import Dashboard from './pages/Dashboard';
import DocumentManagement from './pages/DocumentManagement';
import Entries from './pages/Entries';
import Home from './pages/Home';
import ImportCSV from './pages/ImportCSV';
import Invoicing from './pages/Invoicing';
import LegalProcesses from './pages/LegalProcesses';
import LoyaltyPrograms from './pages/LoyaltyPrograms';
import ManualPosting from './pages/ManualPosting';
import MyBookmarks from './pages/MyBookmarks';
import Notifications from './pages/Notifications';
import Payments from './pages/Payments';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import QuoteRequest from './pages/QuoteRequest';
import Quotes from './pages/Quotes';
import RLSDebugger from './pages/RLSDebugger';
import Reports from './pages/Reports';
import Sales from './pages/Sales';
import SecurityCenter from './pages/SecurityCenter';
import Services from './pages/Services';
import SettingsPage from './pages/SettingsPage';
import Sprint13Planning from './pages/Sprint13Planning';
import Sprint13Review from './pages/Sprint13Review';
import Sprint14Completion from './pages/Sprint14Completion';
import Sprint14Planning from './pages/Sprint14Planning';
import Sprint14Review from './pages/Sprint14Review';
import Sprint15Completion from './pages/Sprint15Completion';
import Sprint15Planning from './pages/Sprint15Planning';
import Sprint15Review from './pages/Sprint15Review';
import Sprint16Completion from './pages/Sprint16Completion';
import Sprint16FinalReview from './pages/Sprint16FinalReview';
import Sprint16Planning from './pages/Sprint16Planning';
import Sprint17Completion from './pages/Sprint17Completion';
import Sprint17Planning from './pages/Sprint17Planning';
import Sprint18Planning from './pages/Sprint18Planning';
import Sprint7Tracker from './pages/Sprint7Tracker';
import Sprint8Tracker from './pages/Sprint8Tracker';
import Sprint9Completion from './pages/Sprint9Completion';
import Sprint9Tracker from './pages/Sprint9Tracker';
import SprintReview from './pages/SprintReview';
import TaxCalculation from './pages/TaxCalculation';
import TaxInvoices from './pages/TaxInvoices';
import Tickets from './pages/Tickets';
import Transactions from './pages/Transactions';
import VirtualCounter from './pages/VirtualCounter';
import Welcome from './pages/Welcome';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AccountingCalendar": AccountingCalendar,
    "Admin": Admin,
    "App": App,
    "AuditLogs": AuditLogs,
    "Automations": Automations,
    "BankReconciliation": BankReconciliation,
    "Blog": Blog,
    "BlogManager": BlogManager,
    "BlogSingle": BlogSingle,
    "Campaigns": Campaigns,
    "CashFlow": CashFlow,
    "CashFlowForecast": CashFlowForecast,
    "ChartOfAccounts": ChartOfAccounts,
    "ClientPanel": ClientPanel,
    "ClientPortal": ClientPortal,
    "Clients": Clients,
    "Communication": Communication,
    "Contact": Contact,
    "ContactDetails": ContactDetails,
    "ContractManagement": ContractManagement,
    "ConversionRateOptimizer": ConversionRateOptimizer,
    "ConversionTracking": ConversionTracking,
    "Dashboard": Dashboard,
    "DocumentManagement": DocumentManagement,
    "Entries": Entries,
    "Home": Home,
    "ImportCSV": ImportCSV,
    "Invoicing": Invoicing,
    "LegalProcesses": LegalProcesses,
    "LoyaltyPrograms": LoyaltyPrograms,
    "ManualPosting": ManualPosting,
    "MyBookmarks": MyBookmarks,
    "Notifications": Notifications,
    "Payments": Payments,
    "Portfolio": Portfolio,
    "Pricing": Pricing,
    "QuoteRequest": QuoteRequest,
    "Quotes": Quotes,
    "RLSDebugger": RLSDebugger,
    "Reports": Reports,
    "Sales": Sales,
    "SecurityCenter": SecurityCenter,
    "Services": Services,
    "SettingsPage": SettingsPage,
    "Sprint13Planning": Sprint13Planning,
    "Sprint13Review": Sprint13Review,
    "Sprint14Completion": Sprint14Completion,
    "Sprint14Planning": Sprint14Planning,
    "Sprint14Review": Sprint14Review,
    "Sprint15Completion": Sprint15Completion,
    "Sprint15Planning": Sprint15Planning,
    "Sprint15Review": Sprint15Review,
    "Sprint16Completion": Sprint16Completion,
    "Sprint16FinalReview": Sprint16FinalReview,
    "Sprint16Planning": Sprint16Planning,
    "Sprint17Completion": Sprint17Completion,
    "Sprint17Planning": Sprint17Planning,
    "Sprint18Planning": Sprint18Planning,
    "Sprint7Tracker": Sprint7Tracker,
    "Sprint8Tracker": Sprint8Tracker,
    "Sprint9Completion": Sprint9Completion,
    "Sprint9Tracker": Sprint9Tracker,
    "SprintReview": SprintReview,
    "TaxCalculation": TaxCalculation,
    "TaxInvoices": TaxInvoices,
    "Tickets": Tickets,
    "Transactions": Transactions,
    "VirtualCounter": VirtualCounter,
    "Welcome": Welcome,
}

export const pagesConfig = {
    mainPage: "Blog",
    Pages: PAGES,
    Layout: __Layout,
};