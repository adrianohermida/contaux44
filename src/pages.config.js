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
import ABTesting from './pages/ABTesting';
import AIRecommendations from './pages/AIRecommendations';
import APIDashboard from './pages/APIDashboard';
import APIDocumentation from './pages/APIDocumentation';
import About from './pages/About';
import AccountingCalendar from './pages/AccountingCalendar';
import Admin from './pages/Admin';
import AdvancedML from './pages/AdvancedML';
import AdvancedNotifications from './pages/AdvancedNotifications';
import AdvancedReports from './pages/AdvancedReports';
import AdvancedSearch from './pages/AdvancedSearch';
import AnalyticsAdvanced from './pages/AnalyticsAdvanced';
import App from './pages/App';
import AuditLogs from './pages/AuditLogs';
import Automations from './pages/Automations';
import BankReconciliation from './pages/BankReconciliation';
import Blog from './pages/Blog';
import BlogManager from './pages/BlogManager';
import BlogSingle from './pages/BlogSingle';
import BulkImportExport from './pages/BulkImportExport';
import CachingStrategy from './pages/CachingStrategy';
import CashFlow from './pages/CashFlow';
import CashFlowForecast from './pages/CashFlowForecast';
import ChartOfAccounts from './pages/ChartOfAccounts';
import ClientPanel from './pages/ClientPanel';
import ClientPortal from './pages/ClientPortal';
import Clients from './pages/Clients';
import CommentThreading from './pages/CommentThreading';
import Communication from './pages/Communication';
import ComplianceReports from './pages/ComplianceReports';
import Contact from './pages/Contact';
import ConversionTracking from './pages/ConversionTracking';
import CustomReports from './pages/CustomReports';
import CustomWorkflowBuilder from './pages/CustomWorkflowBuilder';
import DarkMode from './pages/DarkMode';
import Dashboard from './pages/Dashboard';
import DataBackup from './pages/DataBackup';
import DataValidation from './pages/DataValidation';
import DatabaseOptimization from './pages/DatabaseOptimization';
import DocumentManagement from './pages/DocumentManagement';
import DocumentVersioning from './pages/DocumentVersioning';
import EnterpriseSSOSetup from './pages/EnterpriseSSOSetup';
import Entries from './pages/Entries';
import ErrorTracking from './pages/ErrorTracking';
import GDPRCompliance from './pages/GDPRCompliance';
import Home from './pages/Home';
import ImportCSV from './pages/ImportCSV';
import InfrastructureMonitoring from './pages/InfrastructureMonitoring';
import Internationalization from './pages/Internationalization';
import Invoicing from './pages/Invoicing';
import LegalProcesses from './pages/LegalProcesses';
import ManualPosting from './pages/ManualPosting';
import MobileAnalyticsDashboard from './pages/MobileAnalyticsDashboard';
import MobileFirstDesign from './pages/MobileFirstDesign';
import MobileOptimized from './pages/MobileOptimized';
import MultiLanguageSupport from './pages/MultiLanguageSupport';
import MyBookmarks from './pages/MyBookmarks';
import Notifications from './pages/Notifications';
import NotificationsCenter from './pages/NotificationsCenter';
import OAuth2Setup from './pages/OAuth2Setup';
import OnboardClient from './pages/OnboardClient';
import PWASetup from './pages/PWASetup';
import PWASetupPage from './pages/PWASetupPage';
import Payments from './pages/Payments';
import PerformanceOptimization from './pages/PerformanceOptimization';
import Portfolio from './pages/Portfolio';
import PortfolioSingle from './pages/PortfolioSingle';
import Pricing from './pages/Pricing';
import PrivacyDashboard from './pages/PrivacyDashboard';
import ProfilingDashboard from './pages/ProfilingDashboard';
import QuoteRequest from './pages/QuoteRequest';
import Quotes from './pages/Quotes';
import RBACManagement from './pages/RBACManagement';
import RLSDebugger from './pages/RLSDebugger';
import RealTimeCollaboration from './pages/RealTimeCollaboration';
import RealtimeMonitoring from './pages/RealtimeMonitoring';
import RealtimeSyncDashboard from './pages/RealtimeSyncDashboard';
import RegionalCustomization from './pages/RegionalCustomization';
import Reports from './pages/Reports';
import Sales from './pages/Sales';
import SearchAnalytics from './pages/SearchAnalytics';
import SecurityCenter from './pages/SecurityCenter';
import Services from './pages/Services';
import ServicesPage from './pages/ServicesPage';
import SessionManagement from './pages/SessionManagement';
import SettingsPage from './pages/SettingsPage';
import SmartNotificationRules from './pages/SmartNotificationRules';
import Sprint10Completion from './pages/Sprint10Completion';
import Sprint10Tracker from './pages/Sprint10Tracker';
import Sprint7Tracker from './pages/Sprint7Tracker';
import Sprint8Tracker from './pages/Sprint8Tracker';
import Sprint9Completion from './pages/Sprint9Completion';
import Sprint9Tracker from './pages/Sprint9Tracker';
import SprintReview from './pages/SprintReview';
import TaxInvoices from './pages/TaxInvoices';
import Tickets from './pages/Tickets';
import Transactions from './pages/Transactions';
import TwoFactorAuth from './pages/TwoFactorAuth';
import UserOnboarding from './pages/UserOnboarding';
import VirtualCounter from './pages/VirtualCounter';
import WebhookManagement from './pages/WebhookManagement';
import Welcome from './pages/Welcome';
import Sprint10Validation from './pages/Sprint10Validation';
import Sprint11Tracker from './pages/Sprint11Tracker';
import AdvancedAnalyticsDashboard from './pages/AdvancedAnalyticsDashboard';
import CustomBusinessRules from './pages/CustomBusinessRules';
import DataExportImport from './pages/DataExportImport';
import PerformanceScaling from './pages/PerformanceScaling';
import BatchProcessing from './pages/BatchProcessing';
import QueueManagement from './pages/QueueManagement';
import AutomatedBackups from './pages/AutomatedBackups';
import DisasterRecovery from './pages/DisasterRecovery';
import UserActivityTimeline from './pages/UserActivityTimeline';
import LoadTestingFramework from './pages/LoadTestingFramework';
import SEOOptimization from './pages/SEOOptimization';
import SocialMediaIntegration from './pages/SocialMediaIntegration';
import EmailMarketing from './pages/EmailMarketing';
import Sprint11Completion from './pages/Sprint11Completion';
import Sprint12Tracker from './pages/Sprint12Tracker';
import Sprint11FullReview from './pages/Sprint11FullReview';
import Sprint12Planning from './pages/Sprint12Planning';
import Sprint12Completion from './pages/Sprint12Completion';
import Sprint13Planning from './pages/Sprint13Planning';
import OverallProjectStatus from './pages/OverallProjectStatus';
import AICustomerService from './pages/AICustomerService';
import DynamicPricingEngine from './pages/DynamicPricingEngine';
import PredictiveAnalytics from './pages/PredictiveAnalytics';
import ComplianceReporting from './pages/ComplianceReporting';
import DataVisualization from './pages/DataVisualization';
import Marketplace from './pages/Marketplace';
import SubscriptionManagement from './pages/SubscriptionManagement';
import WhiteLabel from './pages/WhiteLabel';
import GraphQLSupport from './pages/GraphQLSupport';
import ServerSentEvents from './pages/ServerSentEvents';
import AdvancedWebhooks from './pages/AdvancedWebhooks';
import DatabaseSharding from './pages/DatabaseSharding';
import CacheManagement from './pages/CacheManagement';
import AdvancedMonitoring from './pages/AdvancedMonitoring';
import Sprint13Completion from './pages/Sprint13Completion';
import FinalProjectSummary from './pages/FinalProjectSummary';
import Sprint13Review from './pages/Sprint13Review';
import Sprint14Planning from './pages/Sprint14Planning';
import UserSegmentation from './pages/UserSegmentation';
import CustomReportBuilder from './pages/CustomReportBuilder';
import EmailCampaigns from './pages/EmailCampaigns';
import CustomerJourney from './pages/CustomerJourney';
import InventoryManagement from './pages/InventoryManagement';
import SupplyChain from './pages/SupplyChain';
import MultiCurrency from './pages/MultiCurrency';
import TaxCalculation from './pages/TaxCalculation';
import ContractManagement from './pages/ContractManagement';
import DocumentSigning from './pages/DocumentSigning';
import PerformanceBenchmark from './pages/PerformanceBenchmark';
import CompetitiveIntelligence from './pages/CompetitiveIntelligence';
import RiskAssessment from './pages/RiskAssessment';
import SustainabilityTracking from './pages/SustainabilityTracking';
import Sprint14Completion from './pages/Sprint14Completion';
import Sprint15Planning from './pages/Sprint15Planning';
import Sprint14Review from './pages/Sprint14Review';
import InfluencerCollaboration from './pages/InfluencerCollaboration';
import VideoContentManagement from './pages/VideoContentManagement';
import LiveStreaming from './pages/LiveStreaming';
import ReferralProgram from './pages/ReferralProgram';
import LoyaltyRewards from './pages/LoyaltyRewards';
import GamificationEngine from './pages/GamificationEngine';
import RecommendationEngine from './pages/RecommendationEngine';
import AICharbot from './pages/AICharbot';
import VoiceCommerce from './pages/VoiceCommerce';
import MobileAppIntegration from './pages/MobileAppIntegration';
import ProgressiveWebApp from './pages/ProgressiveWebApp';
import OfflineSync from './pages/OfflineSync';
import PushNotificationsPro from './pages/PushNotificationsPro';
import Sprint15Completion from './pages/Sprint15Completion';
import Sprint16Planning from './pages/Sprint16Planning';
import Sprint15Review from './pages/Sprint15Review';
import APIRateLimiting from './pages/APIRateLimiting';
import RequestResponseCaching from './pages/RequestResponseCaching';
import DistributedTracing from './pages/DistributedTracing';
import SecurityAuditLogs from './pages/SecurityAuditLogs';
import DDoSProtection from './pages/DDoSProtection';
import IPWhitelisting from './pages/IPWhitelisting';
import DataAnonymization from './pages/DataAnonymization';
import AuditTrailDashboard from './pages/AuditTrailDashboard';
import CustomWebhooks from './pages/CustomWebhooks';
import SDKGenerator from './pages/SDKGenerator';
import DeveloperPortal from './pages/DeveloperPortal';
import Sprint16Completion from './pages/Sprint16Completion';
import Sprint16FinalReview from './pages/Sprint16FinalReview';
import Sprint17Planning from './pages/Sprint17Planning';
import AdvancedMetricsDashboard from './pages/AdvancedMetricsDashboard';
import CustomUserSegments from './pages/CustomUserSegments';
import MultiChannelCampaigns from './pages/MultiChannelCampaigns';
import BehavioralAnalytics from './pages/BehavioralAnalytics';
import ABTestingFramework from './pages/ABTestingFramework';
import EmailMarketingAutomation from './pages/EmailMarketingAutomation';
import SMSMarketingIntegration from './pages/SMSMarketingIntegration';
import PushNotificationCampaigns from './pages/PushNotificationCampaigns';
import CustomerJourneyMapping from './pages/CustomerJourneyMapping';
import ConversionRateOptimizer from './pages/ConversionRateOptimizer';
import DynamicContentEngine from './pages/DynamicContentEngine';
import PersonalizationRulesEngine from './pages/PersonalizationRulesEngine';
import AttributionModeling from './pages/AttributionModeling';
import CohortAnalysisTool from './pages/CohortAnalysisTool';
import LifetimeValuePredictor from './pages/LifetimeValuePredictor';
import Sprint17Completion from './pages/Sprint17Completion';
import __Layout from './Layout.jsx';


export const PAGES = {
    "ABTesting": ABTesting,
    "AIRecommendations": AIRecommendations,
    "APIDashboard": APIDashboard,
    "APIDocumentation": APIDocumentation,
    "About": About,
    "AccountingCalendar": AccountingCalendar,
    "Admin": Admin,
    "AdvancedML": AdvancedML,
    "AdvancedNotifications": AdvancedNotifications,
    "AdvancedReports": AdvancedReports,
    "AdvancedSearch": AdvancedSearch,
    "AnalyticsAdvanced": AnalyticsAdvanced,
    "App": App,
    "AuditLogs": AuditLogs,
    "Automations": Automations,
    "BankReconciliation": BankReconciliation,
    "Blog": Blog,
    "BlogManager": BlogManager,
    "BlogSingle": BlogSingle,
    "BulkImportExport": BulkImportExport,
    "CachingStrategy": CachingStrategy,
    "CashFlow": CashFlow,
    "CashFlowForecast": CashFlowForecast,
    "ChartOfAccounts": ChartOfAccounts,
    "ClientPanel": ClientPanel,
    "ClientPortal": ClientPortal,
    "Clients": Clients,
    "CommentThreading": CommentThreading,
    "Communication": Communication,
    "ComplianceReports": ComplianceReports,
    "Contact": Contact,
    "ConversionTracking": ConversionTracking,
    "CustomReports": CustomReports,
    "CustomWorkflowBuilder": CustomWorkflowBuilder,
    "DarkMode": DarkMode,
    "Dashboard": Dashboard,
    "DataBackup": DataBackup,
    "DataValidation": DataValidation,
    "DatabaseOptimization": DatabaseOptimization,
    "DocumentManagement": DocumentManagement,
    "DocumentVersioning": DocumentVersioning,
    "EnterpriseSSOSetup": EnterpriseSSOSetup,
    "Entries": Entries,
    "ErrorTracking": ErrorTracking,
    "GDPRCompliance": GDPRCompliance,
    "Home": Home,
    "ImportCSV": ImportCSV,
    "InfrastructureMonitoring": InfrastructureMonitoring,
    "Internationalization": Internationalization,
    "Invoicing": Invoicing,
    "LegalProcesses": LegalProcesses,
    "ManualPosting": ManualPosting,
    "MobileAnalyticsDashboard": MobileAnalyticsDashboard,
    "MobileFirstDesign": MobileFirstDesign,
    "MobileOptimized": MobileOptimized,
    "MultiLanguageSupport": MultiLanguageSupport,
    "MyBookmarks": MyBookmarks,
    "Notifications": Notifications,
    "NotificationsCenter": NotificationsCenter,
    "OAuth2Setup": OAuth2Setup,
    "OnboardClient": OnboardClient,
    "PWASetup": PWASetup,
    "PWASetupPage": PWASetupPage,
    "Payments": Payments,
    "PerformanceOptimization": PerformanceOptimization,
    "Portfolio": Portfolio,
    "PortfolioSingle": PortfolioSingle,
    "Pricing": Pricing,
    "PrivacyDashboard": PrivacyDashboard,
    "ProfilingDashboard": ProfilingDashboard,
    "QuoteRequest": QuoteRequest,
    "Quotes": Quotes,
    "RBACManagement": RBACManagement,
    "RLSDebugger": RLSDebugger,
    "RealTimeCollaboration": RealTimeCollaboration,
    "RealtimeMonitoring": RealtimeMonitoring,
    "RealtimeSyncDashboard": RealtimeSyncDashboard,
    "RegionalCustomization": RegionalCustomization,
    "Reports": Reports,
    "Sales": Sales,
    "SearchAnalytics": SearchAnalytics,
    "SecurityCenter": SecurityCenter,
    "Services": Services,
    "ServicesPage": ServicesPage,
    "SessionManagement": SessionManagement,
    "SettingsPage": SettingsPage,
    "SmartNotificationRules": SmartNotificationRules,
    "Sprint10Completion": Sprint10Completion,
    "Sprint10Tracker": Sprint10Tracker,
    "Sprint7Tracker": Sprint7Tracker,
    "Sprint8Tracker": Sprint8Tracker,
    "Sprint9Completion": Sprint9Completion,
    "Sprint9Tracker": Sprint9Tracker,
    "SprintReview": SprintReview,
    "TaxInvoices": TaxInvoices,
    "Tickets": Tickets,
    "Transactions": Transactions,
    "TwoFactorAuth": TwoFactorAuth,
    "UserOnboarding": UserOnboarding,
    "VirtualCounter": VirtualCounter,
    "WebhookManagement": WebhookManagement,
    "Welcome": Welcome,
    "Sprint10Validation": Sprint10Validation,
    "Sprint11Tracker": Sprint11Tracker,
    "AdvancedAnalyticsDashboard": AdvancedAnalyticsDashboard,
    "CustomBusinessRules": CustomBusinessRules,
    "DataExportImport": DataExportImport,
    "PerformanceScaling": PerformanceScaling,
    "BatchProcessing": BatchProcessing,
    "QueueManagement": QueueManagement,
    "AutomatedBackups": AutomatedBackups,
    "DisasterRecovery": DisasterRecovery,
    "UserActivityTimeline": UserActivityTimeline,
    "LoadTestingFramework": LoadTestingFramework,
    "SEOOptimization": SEOOptimization,
    "SocialMediaIntegration": SocialMediaIntegration,
    "EmailMarketing": EmailMarketing,
    "Sprint11Completion": Sprint11Completion,
    "Sprint12Tracker": Sprint12Tracker,
    "Sprint11FullReview": Sprint11FullReview,
    "Sprint12Planning": Sprint12Planning,
    "Sprint12Completion": Sprint12Completion,
    "Sprint13Planning": Sprint13Planning,
    "OverallProjectStatus": OverallProjectStatus,
    "AICustomerService": AICustomerService,
    "DynamicPricingEngine": DynamicPricingEngine,
    "PredictiveAnalytics": PredictiveAnalytics,
    "ComplianceReporting": ComplianceReporting,
    "DataVisualization": DataVisualization,
    "Marketplace": Marketplace,
    "SubscriptionManagement": SubscriptionManagement,
    "WhiteLabel": WhiteLabel,
    "GraphQLSupport": GraphQLSupport,
    "ServerSentEvents": ServerSentEvents,
    "AdvancedWebhooks": AdvancedWebhooks,
    "DatabaseSharding": DatabaseSharding,
    "CacheManagement": CacheManagement,
    "AdvancedMonitoring": AdvancedMonitoring,
    "Sprint13Completion": Sprint13Completion,
    "FinalProjectSummary": FinalProjectSummary,
    "Sprint13Review": Sprint13Review,
    "Sprint14Planning": Sprint14Planning,
    "UserSegmentation": UserSegmentation,
    "CustomReportBuilder": CustomReportBuilder,
    "EmailCampaigns": EmailCampaigns,
    "CustomerJourney": CustomerJourney,
    "InventoryManagement": InventoryManagement,
    "SupplyChain": SupplyChain,
    "MultiCurrency": MultiCurrency,
    "TaxCalculation": TaxCalculation,
    "ContractManagement": ContractManagement,
    "DocumentSigning": DocumentSigning,
    "PerformanceBenchmark": PerformanceBenchmark,
    "CompetitiveIntelligence": CompetitiveIntelligence,
    "RiskAssessment": RiskAssessment,
    "SustainabilityTracking": SustainabilityTracking,
    "Sprint14Completion": Sprint14Completion,
    "Sprint15Planning": Sprint15Planning,
    "Sprint14Review": Sprint14Review,
    "InfluencerCollaboration": InfluencerCollaboration,
    "VideoContentManagement": VideoContentManagement,
    "LiveStreaming": LiveStreaming,
    "ReferralProgram": ReferralProgram,
    "LoyaltyRewards": LoyaltyRewards,
    "GamificationEngine": GamificationEngine,
    "RecommendationEngine": RecommendationEngine,
    "AICharbot": AICharbot,
    "VoiceCommerce": VoiceCommerce,
    "MobileAppIntegration": MobileAppIntegration,
    "ProgressiveWebApp": ProgressiveWebApp,
    "OfflineSync": OfflineSync,
    "PushNotificationsPro": PushNotificationsPro,
    "Sprint15Completion": Sprint15Completion,
    "Sprint16Planning": Sprint16Planning,
    "Sprint15Review": Sprint15Review,
    "APIRateLimiting": APIRateLimiting,
    "RequestResponseCaching": RequestResponseCaching,
    "DistributedTracing": DistributedTracing,
    "SecurityAuditLogs": SecurityAuditLogs,
    "DDoSProtection": DDoSProtection,
    "IPWhitelisting": IPWhitelisting,
    "DataAnonymization": DataAnonymization,
    "AuditTrailDashboard": AuditTrailDashboard,
    "CustomWebhooks": CustomWebhooks,
    "SDKGenerator": SDKGenerator,
    "DeveloperPortal": DeveloperPortal,
    "Sprint16Completion": Sprint16Completion,
    "Sprint16FinalReview": Sprint16FinalReview,
    "Sprint17Planning": Sprint17Planning,
    "AdvancedMetricsDashboard": AdvancedMetricsDashboard,
    "CustomUserSegments": CustomUserSegments,
    "MultiChannelCampaigns": MultiChannelCampaigns,
    "BehavioralAnalytics": BehavioralAnalytics,
    "ABTestingFramework": ABTestingFramework,
    "EmailMarketingAutomation": EmailMarketingAutomation,
    "SMSMarketingIntegration": SMSMarketingIntegration,
    "PushNotificationCampaigns": PushNotificationCampaigns,
    "CustomerJourneyMapping": CustomerJourneyMapping,
    "ConversionRateOptimizer": ConversionRateOptimizer,
    "DynamicContentEngine": DynamicContentEngine,
    "PersonalizationRulesEngine": PersonalizationRulesEngine,
    "AttributionModeling": AttributionModeling,
    "CohortAnalysisTool": CohortAnalysisTool,
    "LifetimeValuePredictor": LifetimeValuePredictor,
    "Sprint17Completion": Sprint17Completion,
}

export const pagesConfig = {
    mainPage: "Blog",
    Pages: PAGES,
    Layout: __Layout,
};