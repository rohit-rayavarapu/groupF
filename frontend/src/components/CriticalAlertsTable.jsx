function CriticalAlertsTable({ alerts }) {
  return (
<section id="alerts" className="panel">
<div className="section-header">
<div>
<h2>Critical Alert Details</h2>
<p>Important alerts that require analyst attention.</p>
</div>
</div>
 
      <div className="table-wrapper">
<table>
<thead>
<tr>
<th>Alert ID</th>
<th>Attack Type</th>
<th>Severity</th>
<th>Status</th>
<th>Source IP</th>
<th>Destination IP</th>
</tr>
</thead>
 
          <tbody>
            {alerts.map((alert) => (
<tr key={alert.alert_id}>
<td>{alert.alert_id}</td>
<td>{alert.attack_type}</td>
<td>
<span className={`badge ${alert.severity.toLowerCase()}`}>
                    {alert.severity}
</span>
</td>
<td>{alert.status}</td>
<td>{alert.source_ip}</td>
<td>{alert.destination_ip}</td>
</tr>
            ))}
</tbody>
</table>
</div>
</section>
  );
}
 
export default CriticalAlertsTable;