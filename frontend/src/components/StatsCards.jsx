function StatsCards({ stats }) {
  return (
<section id="overview" className="cards">
<div className="card">
<span>Total Alerts</span>
<h2>{stats.totalAlerts}</h2>
<p>All security alerts</p>
</div>
 
      <div className="card critical">
<span>Critical Alerts</span>
<h2>{stats.criticalAlerts}</h2>
<p>Needs immediate review</p>
</div>
 
      <div className="card high">
<span>High Alerts</span>
<h2>{stats.highAlerts}</h2>
<p>Important incidents</p>
</div>
 
      <div className="card unresolved">
<span>Unresolved Alerts</span>
<h2>{stats.unresolvedAlerts}</h2>
<p>Open or investigating</p>
</div>
</section>
  );
}


export default StatsCards