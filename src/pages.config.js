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
import ABTestingFramework from './pages/ABTestingFramework';
import AICharbot from './pages/AICharbot';
import AICustomerService from './pages/AICustomerService';
import AIRecommendations from './pages/AIRecommendations';
import APIDashboard from './pages/APIDashboard';
import APIDocumentation from './pages/APIDocumentation';
import APIRateLimiting from './pages/APIRateLimiting';
import About from './pages/About';
import AccountingCalendar from './pages/AccountingCalendar';
import Admin from './pages/Admin';
import AdvancedAnalyticsDashboard from './pages/AdvancedAnalyticsDashboard';
import AdvancedML from './pages/AdvancedML';
import AdvancedMetricsDashboard from './pages/AdvancedMetricsDashboard';
import AdvancedMonitoring from './pages/AdvancedMonitoring';
import AdvancedNotifications from './pages/AdvancedNotifications';
import AdvancedReports from './pages/AdvancedReports';
import AdvancedSearch from './pages/AdvancedSearch';
import AdvancedWebhooks from './pages/AdvancedWebhooks';
import AnalyticsAdvanced from './pages/AnalyticsAdvanced';
import App from './pages/App';
import AttributionModeling from './pages/AttributionModeling';
import AuditLogs from './pages/AuditLogs';
import AuditTrailDashboard from './pages/AuditTrailDashboard';
import AutomatedBackups from './pages/AutomatedBackups';
import Automations from './pages/Automations';
import BankReconciliation from './pages/BankReconciliation';
import BatchProcessing from './pages/BatchProcessing';
import BehavioralAnalytics from './pages/BehavioralAnalytics';
import Blog from './pages/Blog';
import BlogManager from './pages/BlogManager';
import BlogSingle from './pages/BlogSingle';
import BulkImportExport from './pages/BulkImportExport';
import CRMEnhancementPlan from './pages/CRMEnhancementPlan';
import CacheManagement from './pages/CacheManagement';
import CachingStrategy from './pages/CachingStrategy';
import CashFlow from './pages/CashFlow';
import CashFlowForecast from './pages/CashFlowForecast';
import ChartOfAccounts from './pages/ChartOfAccounts';
import ClientPanel from './pages/ClientPanel';
import ClientPortal from './pages/ClientPortal';
import CohortAnalysisTool from './pages/CohortAnalysisTool';
import CommentThreading from './pages/CommentThreading';
import Communication from './pages/Communication';
import CompetitiveIntelligence from './pages/CompetitiveIntelligence';
import ComplianceReporting from './pages/ComplianceReporting';
import ComplianceReports from './pages/ComplianceReports';
import Contact from './pages/Contact';
import ContactDetails from './pages/ContactDetails';
import ContractManagement from './pages/ContractManagement';
import ConversionRateOptimizer from './pages/ConversionRateOptimizer';
import ConversionTracking from './pages/ConversionTracking';
import CustomBusinessRules from './pages/CustomBusinessRules';
import CustomReportBuilder from './pages/CustomReportBuilder';
import CustomReports from './pages/CustomReports';
import CustomUserSegments from './pages/CustomUserSegments';
import CustomWebhooks from './pages/CustomWebhooks';
import CustomWorkflowBuilder from './pages/CustomWorkflowBuilder';
import CustomerJourney from './pages/CustomerJourney';
import CustomerJourneyMapping from './pages/CustomerJourneyMapping';
import DDoSProtection from './pages/DDoSProtection';
import DarkMode from './pages/DarkMode';
import Dashboard from './pages/Dashboard';
import DataAnonymization from './pages/DataAnonymization';
import DataBackup from './pages/DataBackup';
import DataExportImport from './pages/DataExportImport';
import DataValidation from './pages/DataValidation';
import DataVisualization from './pages/DataVisualization';
import DatabaseOptimization from './pages/DatabaseOptimization';
import DatabaseSharding from './pages/DatabaseSharding';
import DeveloperPortal from './pages/DeveloperPortal';
import DisasterRecovery from './pages/DisasterRecovery';
import DistributedTracing from './pages/DistributedTracing';
import DocumentManagement from './pages/DocumentManagement';
import DocumentSigning from './pages/DocumentSigning';
import DocumentVersioning from './pages/DocumentVersioning';
import DynamicContentEngine from './pages/DynamicContentEngine';
import DynamicPricingEngine from './pages/DynamicPricingEngine';
import EmailCampaigns from './pages/EmailCampaigns';
import EmailMarketing from './pages/EmailMarketing';
import EmailMarketingAutomation from './pages/EmailMarketingAutomation';
import EnterpriseSSOSetup from './pages/EnterpriseSSOSetup';
import Entries from './pages/Entries';
import ErrorTracking from './pages/ErrorTracking';
import FinalProjectSummary from './pages/FinalProjectSummary';
import GDPRCompliance from './pages/GDPRCompliance';
import GamificationEngine from './pages/GamificationEngine';
import GraphQLSupport from './pages/GraphQLSupport';
import Home from './pages/Home';
import IPWhitelisting from './pages/IPWhitelisting';
import ImportCSV from './pages/ImportCSV';
import InfluencerCollaboration from './pages/InfluencerCollaboration';
import InfrastructureMonitoring from './pages/InfrastructureMonitoring';
import Internationalization from './pages/Internationalization';
import InventoryManagement from './pages/InventoryManagement';
import Invoicing from './pages/Invoicing';
import LegalProcesses from './pages/LegalProcesses';
import LifetimeValuePredictor from './pages/LifetimeValuePredictor';
import LiveStreaming from './pages/LiveStreaming';
import LoadTestingFramework from './pages/LoadTestingFramework';
import LoyaltyRewards from './pages/LoyaltyRewards';
import ManualPosting from './pages/ManualPosting';
import Marketplace from './pages/Marketplace';
import MobileAnalyticsDashboard from './pages/MobileAnalyticsDashboard';
import MobileAppIntegration from './pages/MobileAppIntegration';
import MobileFirstDesign from './pages/MobileFirstDesign';
import MobileOptimized from './pages/MobileOptimized';
import MultiChannelCampaigns from './pages/MultiChannelCampaigns';
import MultiCurrency from './pages/MultiCurrency';
import MultiLanguageSupport from './pages/MultiLanguageSupport';
import MyBookmarks from './pages/MyBookmarks';
import Notifications from './pages/Notifications';
import NotificationsCenter from './pages/NotificationsCenter';
import OAuth2Setup from './pages/OAuth2Setup';
import OfflineSync from './pages/OfflineSync';
import OnboardClient from './pages/OnboardClient';
import OverallProjectStatus from './pages/OverallProjectStatus';
import PWASetup from './pages/PWASetup';
import PWASetupPage from './pages/PWASetupPage';
import Payments from './pages/Payments';
import PerformanceBenchmark from './pages/PerformanceBenchmark';
import PerformanceOptimization from './pages/PerformanceOptimization';
import PerformanceScaling from './pages/PerformanceScaling';
import PersonalizationRulesEngine from './pages/PersonalizationRulesEngine';
import Portfolio from './pages/Portfolio';
import PortfolioSingle from './pages/PortfolioSingle';
import PredictiveAnalytics from './pages/PredictiveAnalytics';
import Pricing from './pages/Pricing';
import PrivacyDashboard from './pages/PrivacyDashboard';
import ProfilingDashboard from './pages/ProfilingDashboard';
import ProgressiveWebApp from './pages/ProgressiveWebApp';
import PushNotificationCampaigns from './pages/PushNotificationCampaigns';
import PushNotificationsPro from './pages/PushNotificationsPro';
import QueueManagement from './pages/QueueManagement';
import QuoteRequest from './pages/QuoteRequest';
import Quotes from './pages/Quotes';
import RBACManagement from './pages/RBACManagement';
import RLSDebugger from './pages/RLSDebugger';
import RealTimeCollaboration from './pages/RealTimeCollaboration';
import RealtimeMonitoring from './pages/RealtimeMonitoring';
import RealtimeSyncDashboard from './pages/RealtimeSyncDashboard';
import RecommendationEngine from './pages/RecommendationEngine';
import ReferralProgram from './pages/ReferralProgram';
import RegionalCustomization from './pages/RegionalCustomization';
import Reports from './pages/Reports';
import RequestResponseCaching from './pages/RequestResponseCaching';
import RiskAssessment from './pages/RiskAssessment';
import SDKGenerator from './pages/SDKGenerator';
import SEOOptimization from './pages/SEOOptimization';
import SMSMarketingIntegration from './pages/SMSMarketingIntegration';
import Sales from './pages/Sales';
import SearchAnalytics from './pages/SearchAnalytics';
import SecurityAuditLogs from './pages/SecurityAuditLogs';
import SecurityCenter from './pages/SecurityCenter';
import ServerSentEvents from './pages/ServerSentEvents';
import Services from './pages/Services';
import ServicesPage from './pages/ServicesPage';
import SessionManagement from './pages/SessionManagement';
import SettingsPage from './pages/SettingsPage';
import SmartNotificationRules from './pages/SmartNotificationRules';
import SocialMediaIntegration from './pages/SocialMediaIntegration';
import Sprint10Completion from './pages/Sprint10Completion';
import Sprint10Tracker from './pages/Sprint10Tracker';
import Sprint10Validation from './pages/Sprint10Validation';
import Sprint11Completion from './pages/Sprint11Completion';
import Sprint11FullReview from './pages/Sprint11FullReview';
import Sprint11Tracker from './pages/Sprint11Tracker';
import Sprint12Completion from './pages/Sprint12Completion';
import Sprint12Planning from './pages/Sprint12Planning';
import Sprint12Tracker from './pages/Sprint12Tracker';
import Sprint13Completion from './pages/Sprint13Completion';
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
import SubscriptionManagement from './pages/SubscriptionManagement';
import SupplyChain from './pages/SupplyChain';
import SustainabilityTracking from './pages/SustainabilityTracking';
import TaxCalculation from './pages/TaxCalculation';
import TaxInvoices from './pages/TaxInvoices';
import Tickets from './pages/Tickets';
import Transactions from './pages/Transactions';
import TwoFactorAuth from './pages/TwoFactorAuth';
import UserActivityTimeline from './pages/UserActivityTimeline';
import UserOnboarding from './pages/UserOnboarding';
import UserSegmentation from './pages/UserSegmentation';
import VideoContentManagement from './pages/VideoContentManagement';
import VirtualCounter from './pages/VirtualCounter';
import VoiceCommerce from './pages/VoiceCommerce';
import WebhookManagement from './pages/WebhookManagement';
import Welcome from './pages/Welcome';
import WhiteLabel from './pages/WhiteLabel';
import Campaigns from './pages/Campaigns';
import __Layout from './Layout.jsx';


export const PAGES = {
    "ABTesting": ABTesting,
    "ABTestingFramework": ABTestingFramework,
    "AICharbot": AICharbot,
    "AICustomerService": AICustomerService,
    "AIRecommendations": AIRecommendations,
    "APIDashboard": APIDashboard,
    "APIDocumentation": APIDocumentation,
    "APIRateLimiting": APIRateLimiting,
    "About": About,
    "AccountingCalendar": AccountingCalendar,
    "Admin": Admin,
    "AdvancedAnalyticsDashboard": AdvancedAnalyticsDashboard,
    "AdvancedML": AdvancedML,
    "AdvancedMetricsDashboard": AdvancedMetricsDashboard,
    "AdvancedMonitoring": AdvancedMonitoring,
    "AdvancedNotifications": AdvancedNotifications,
    "AdvancedReports": AdvancedReports,
    "AdvancedSearch": AdvancedSearch,
    "AdvancedWebhooks": AdvancedWebhooks,
    "AnalyticsAdvanced": AnalyticsAdvanced,
    "App": App,
    "AttributionModeling": AttributionModeling,
    "AuditLogs": AuditLogs,
    "AuditTrailDashboard": AuditTrailDashboard,
    "AutomatedBackups": AutomatedBackups,
    "Automations": Automations,
    "BankReconciliation": BankReconciliation,
    "BatchProcessing": BatchProcessing,
    "BehavioralAnalytics": BehavioralAnalytics,
    "Blog": Blog,
    "BlogManager": BlogManager,
    "BlogSingle": BlogSingle,
    "BulkImportExport": BulkImportExport,
    "CRMEnhancementPlan": CRMEnhancementPlan,
    "CacheManagement": CacheManagement,
    "CachingStrategy": CachingStrategy,
    "CashFlow": CashFlow,
    "CashFlowForecast": CashFlowForecast,
    "ChartOfAccounts": ChartOfAccounts,
    "ClientPanel": ClientPanel,
    "ClientPortal": ClientPortal,
    "CohortAnalysisTool": CohortAnalysisTool,
    "CommentThreading": CommentThreading,
    "Communication": Communication,
    "CompetitiveIntelligence": CompetitiveIntelligence,
    "ComplianceReporting": ComplianceReporting,
    "ComplianceReports": ComplianceReports,
    "Contact": Contact,
    "ContactDetails": ContactDetails,
    "ContractManagement": ContractManagement,
    "ConversionRateOptimizer": ConversionRateOptimizer,
    "ConversionTracking": ConversionTracking,
    "CustomBusinessRules": CustomBusinessRules,
    "CustomReportBuilder": CustomReportBuilder,
    "CustomReports": CustomReports,
    "CustomUserSegments": CustomUserSegments,
    "CustomWebhooks": CustomWebhooks,
    "CustomWorkflowBuilder": CustomWorkflowBuilder,
    "CustomerJourney": CustomerJourney,
    "CustomerJourneyMapping": CustomerJourneyMapping,
    "DDoSProtection": DDoSProtection,
    "DarkMode": DarkMode,
    "Dashboard": Dashboard,
    "DataAnonymization": DataAnonymization,
    "DataBackup": DataBackup,
    "DataExportImport": DataExportImport,
    "DataValidation": DataValidation,
    "DataVisualization": DataVisualization,
    "DatabaseOptimization": DatabaseOptimization,
    "DatabaseSharding": DatabaseSharding,
    "DeveloperPortal": DeveloperPortal,
    "DisasterRecovery": DisasterRecovery,
    "DistributedTracing": DistributedTracing,
    "DocumentManagement": DocumentManagement,
    "DocumentSigning": DocumentSigning,
    "DocumentVersioning": DocumentVersioning,
    "DynamicContentEngine": DynamicContentEngine,
    "DynamicPricingEngine": DynamicPricingEngine,
    "EmailCampaigns": EmailCampaigns,
    "EmailMarketing": EmailMarketing,
    "EmailMarketingAutomation": EmailMarketingAutomation,
    "EnterpriseSSOSetup": EnterpriseSSOSetup,
    "Entries": Entries,
    "ErrorTracking": ErrorTracking,
    "FinalProjectSummary": FinalProjectSummary,
    "GDPRCompliance": GDPRCompliance,
    "GamificationEngine": GamificationEngine,
    "GraphQLSupport": GraphQLSupport,
    "Home": Home,
    "IPWhitelisting": IPWhitelisting,
    "ImportCSV": ImportCSV,
    "InfluencerCollaboration": InfluencerCollaboration,
    "InfrastructureMonitoring": InfrastructureMonitoring,
    "Internationalization": Internationalization,
    "InventoryManagement": InventoryManagement,
    "Invoicing": Invoicing,
    "LegalProcesses": LegalProcesses,
    "LifetimeValuePredictor": LifetimeValuePredictor,
    "LiveStreaming": LiveStreaming,
    "LoadTestingFramework": LoadTestingFramework,
    "LoyaltyRewards": LoyaltyRewards,
    "ManualPosting": ManualPosting,
    "Marketplace": Marketplace,
    "MobileAnalyticsDashboard": MobileAnalyticsDashboard,
    "MobileAppIntegration": MobileAppIntegration,
    "MobileFirstDesign": MobileFirstDesign,
    "MobileOptimized": MobileOptimized,
    "MultiChannelCampaigns": MultiChannelCampaigns,
    "MultiCurrency": MultiCurrency,
    "MultiLanguageSupport": MultiLanguageSupport,
    "MyBookmarks": MyBookmarks,
    "Notifications": Notifications,
    "NotificationsCenter": NotificationsCenter,
    "OAuth2Setup": OAuth2Setup,
    "OfflineSync": OfflineSync,
    "OnboardClient": OnboardClient,
    "OverallProjectStatus": OverallProjectStatus,
    "PWASetup": PWASetup,
    "PWASetupPage": PWASetupPage,
    "Payments": Payments,
    "PerformanceBenchmark": PerformanceBenchmark,
    "PerformanceOptimization": PerformanceOptimization,
    "PerformanceScaling": PerformanceScaling,
    "PersonalizationRulesEngine": PersonalizationRulesEngine,
    "Portfolio": Portfolio,
    "PortfolioSingle": PortfolioSingle,
    "PredictiveAnalytics": PredictiveAnalytics,
    "Pricing": Pricing,
    "PrivacyDashboard": PrivacyDashboard,
    "ProfilingDashboard": ProfilingDashboard,
    "ProgressiveWebApp": ProgressiveWebApp,
    "PushNotificationCampaigns": PushNotificationCampaigns,
    "PushNotificationsPro": PushNotificationsPro,
    "QueueManagement": QueueManagement,
    "QuoteRequest": QuoteRequest,
    "Quotes": Quotes,
    "RBACManagement": RBACManagement,
    "RLSDebugger": RLSDebugger,
    "RealTimeCollaboration": RealTimeCollaboration,
    "RealtimeMonitoring": RealtimeMonitoring,
    "RealtimeSyncDashboard": RealtimeSyncDashboard,
    "RecommendationEngine": RecommendationEngine,
    "ReferralProgram": ReferralProgram,
    "RegionalCustomization": RegionalCustomization,
    "Reports": Reports,
    "RequestResponseCaching": RequestResponseCaching,
    "RiskAssessment": RiskAssessment,
    "SDKGenerator": SDKGenerator,
    "SEOOptimization": SEOOptimization,
    "SMSMarketingIntegration": SMSMarketingIntegration,
    "Sales": Sales,
    "SearchAnalytics": SearchAnalytics,
    "SecurityAuditLogs": SecurityAuditLogs,
    "SecurityCenter": SecurityCenter,
    "ServerSentEvents": ServerSentEvents,
    "Services": Services,
    "ServicesPage": ServicesPage,
    "SessionManagement": SessionManagement,
    "SettingsPage": SettingsPage,
    "SmartNotificationRules": SmartNotificationRules,
    "SocialMediaIntegration": SocialMediaIntegration,
    "Sprint10Completion": Sprint10Completion,
    "Sprint10Tracker": Sprint10Tracker,
    "Sprint10Validation": Sprint10Validation,
    "Sprint11Completion": Sprint11Completion,
    "Sprint11FullReview": Sprint11FullReview,
    "Sprint11Tracker": Sprint11Tracker,
    "Sprint12Completion": Sprint12Completion,
    "Sprint12Planning": Sprint12Planning,
    "Sprint12Tracker": Sprint12Tracker,
    "Sprint13Completion": Sprint13Completion,
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
    "SubscriptionManagement": SubscriptionManagement,
    "SupplyChain": SupplyChain,
    "SustainabilityTracking": SustainabilityTracking,
    "TaxCalculation": TaxCalculation,
    "TaxInvoices": TaxInvoices,
    "Tickets": Tickets,
    "Transactions": Transactions,
    "TwoFactorAuth": TwoFactorAuth,
    "UserActivityTimeline": UserActivityTimeline,
    "UserOnboarding": UserOnboarding,
    "UserSegmentation": UserSegmentation,
    "VideoContentManagement": VideoContentManagement,
    "VirtualCounter": VirtualCounter,
    "VoiceCommerce": VoiceCommerce,
    "WebhookManagement": WebhookManagement,
    "Welcome": Welcome,
    "WhiteLabel": WhiteLabel,
    "Campaigns": Campaigns,
}

export const pagesConfig = {
    mainPage: "Blog",
    Pages: PAGES,
    Layout: __Layout,
};