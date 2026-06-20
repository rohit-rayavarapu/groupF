export const getTotalAlerts = (alerts) => {
  return alerts.length;
};
 
export const getCriticalAlerts = (alerts) => {
  return alerts.filter((alert) => alert.severity === "Critical");
};
 
export const getHighAlerts = (alerts) => {
  return alerts.filter((alert) => alert.severity === "High");
};
 
export const getUnresolvedAlerts = (alerts) => {
  return alerts.filter((alert) => alert.status !== "Resolved");
};
 
export const generateAssistantResponse = (question) => {
  const text = question.toLowerCase();
 
  if (text.includes("a-1003")) {
    return "Alert A-1003 is a Critical DDoS alert. The source IP 103.88.12.9 targeted destination IP 10.0.0.10. This alert is critical because high traffic volume was detected against the HTTPS service. Recommended action: check the Grafana traffic timeline, review firewall logs, verify whether the traffic is malicious, and update the alert status.";
  }
 
  if (text.includes("a-1008")) {
    return "Alert A-1008 is a Critical Malware Activity alert. Suspicious SMB traffic was detected from source IP 10.0.0.50 to destination IP 10.0.0.20. Recommended action: isolate the affected system, check endpoint logs, review SMB connections, and escalate to the SOC team lead.";
  }
 
  if (text.includes("critical")) {
    return "There are 2 critical alerts in the current dataset: A-1003 DDoS and A-1008 Malware Activity. These alerts should be investigated first because they may affect system availability or indicate suspicious internal network activity.";
  }
 
  if (text.includes("summary")) {
    return "Daily SOC Summary: The system has 5 alerts. There are 2 critical alerts, 1 high severity alert, and 5 unresolved alerts. The most serious incidents are DDoS activity and malware-related SMB traffic.";
  }
 
  if (text.includes("grafana")) {
    return "Grafana is used to visualize alert data. It shows total alerts, critical alerts, alerts by severity, alerts by attack type, source IP analysis, and critical alert details.";
  }
 
  return "I can help explain alerts, show critical incidents, and generate a daily SOC summary. Try asking: Explain alert A-1003, Show critical alerts, Generate daily summary, or What is Grafana used for?";
};