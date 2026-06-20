function IncidentSummary() {
  return (
<div className="summary-box">
<h2>Incident Summary</h2>
<p>
        The current prototype shows how a SOC analyst can view alerts, identify
        critical incidents, and use an AI assistant for investigation guidance.
</p>
<ul>
<li>Grafana is used for alert visualization.</li>
<li>FastAPI will provide backend alert data.</li>
<li>PostgreSQL stores cybersecurity alerts.</li>
<li>Langflow and Ollama will be added for chatbot workflow.</li>
</ul>
</div>
  );
}
export default IncidentSummary;