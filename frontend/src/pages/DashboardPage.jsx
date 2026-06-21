import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import StatsCards from "../components/StatsCards";
import CriticalAlertsTable from "../components/CriticalAlertsTable";
import AssistantPanel from "../components/AssistantPanel";
import IncidentSummary from "../components/IncidentSummary";
 
import { alerts } from "../data/alerts";
import {
  getTotalAlerts,
  getCriticalAlerts,
  getHighAlerts,
  getUnresolvedAlerts,
} from "../utils/alertUtils";
 
function DashboardPage() {
  const stats = {
    totalAlerts: getTotalAlerts(alerts),
    criticalAlerts: getCriticalAlerts(alerts).length,
    highAlerts: getHighAlerts(alerts).length,
    unresolvedAlerts: getUnresolvedAlerts(alerts).length,
  };
 
  const criticalAlertList = getCriticalAlerts(alerts);
 
  return (
<div className="app">
<Sidebar />
 
      <main className="main-content">
<HeroSection />
 
        <StatsCards stats={stats} />
 
        <CriticalAlertsTable alerts={criticalAlertList} />
 
        <section className="assistant-panel">
<AssistantPanel alerts={alerts} />
<IncidentSummary />
</section>
</main>
</div>
  );
}
 
export default DashboardPage;