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
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import OnboardClient from './pages/OnboardClient';
import Portfolio from './pages/Portfolio';
import PortfolioSingle from './pages/PortfolioSingle';
import Pricing from './pages/Pricing';
import QuoteRequest from './pages/QuoteRequest';
import Services from './pages/Services';
import processor from './pages/processor';
import Clients from './pages/Clients';
import Tickets from './pages/Tickets';
import Communication from './pages/Communication';
import LegalProcesses from './pages/LegalProcesses';
import Invoicing from './pages/Invoicing';
import Payments from './pages/Payments';
import Quotes from './pages/Quotes';
import ChartOfAccounts from './pages/ChartOfAccounts';
import Entries from './pages/Entries';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ClientPortal from './pages/ClientPortal';
import Sales from './pages/Sales';
import CashFlow from './pages/CashFlow';
import ImportCSV from './pages/ImportCSV';
import BankReconciliation from './pages/BankReconciliation';
import ManualPosting from './pages/ManualPosting';
import TaxInvoices from './pages/TaxInvoices';
import AccountingCalendar from './pages/AccountingCalendar';
import Automations from './pages/Automations';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Admin": Admin,
    "Blog": Blog,
    "BlogSingle": BlogSingle,
    "Contact": Contact,
    "Dashboard": Dashboard,
    "Home": Home,
    "OnboardClient": OnboardClient,
    "Portfolio": Portfolio,
    "PortfolioSingle": PortfolioSingle,
    "Pricing": Pricing,
    "QuoteRequest": QuoteRequest,
    "Services": Services,
    "processor": processor,
    "Clients": Clients,
    "Tickets": Tickets,
    "Communication": Communication,
    "LegalProcesses": LegalProcesses,
    "Invoicing": Invoicing,
    "Payments": Payments,
    "Quotes": Quotes,
    "ChartOfAccounts": ChartOfAccounts,
    "Entries": Entries,
    "Reports": Reports,
    "Settings": Settings,
    "ClientPortal": ClientPortal,
    "Sales": Sales,
    "CashFlow": CashFlow,
    "ImportCSV": ImportCSV,
    "BankReconciliation": BankReconciliation,
    "ManualPosting": ManualPosting,
    "TaxInvoices": TaxInvoices,
    "AccountingCalendar": AccountingCalendar,
    "Automations": Automations,
}

export const pagesConfig = {
    mainPage: "Blog",
    Pages: PAGES,
    Layout: __Layout,
};