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
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import index from './pages/index';
import processor from './pages/processor';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import PortfolioSingle from './pages/PortfolioSingle';
import Admin from './pages/Admin';
import Onboarding from './pages/Onboarding';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BlogPost from './pages/BlogPost';
import BlogAdmin from './pages/BlogAdmin';
import QuoteRequest from './pages/QuoteRequest';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Blog": Blog,
    "Contact": Contact,
    "Home": Home,
    "index": index,
    "processor": processor,
    "Dashboard": Dashboard,
    "About": About,
    "Services": Services,
    "Pricing": Pricing,
    "Portfolio": Portfolio,
    "PortfolioSingle": PortfolioSingle,
    "Admin": Admin,
    "Onboarding": Onboarding,
    "ClientDashboard": ClientDashboard,
    "AdminDashboard": AdminDashboard,
    "BlogPost": BlogPost,
    "BlogAdmin": BlogAdmin,
    "QuoteRequest": QuoteRequest,
}

export const pagesConfig = {
    mainPage: "Blog",
    Pages: PAGES,
    Layout: __Layout,
};