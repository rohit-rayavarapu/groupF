import { useState } from "react";
import alertsData from "./data/alerts.json";
import "./App.css";

function App() {
  const [allAlerts, setAllAlerts] = useState(alertsData);
  const [alerts, setAlerts] = useState(alertsData);
  const [themeColor, setThemeColor] = useState("#0f172a");
  const [themeName, setThemeName] = useState("Dark Blue");
  const [userInput, setUserInput] = useState("");
  const [botReply, setBotReply] = useState(
    "Hello, I am your AI Security Analyst Assistant. Try: change color to red, show critical alerts, generate daily report, or mark AL-1002 as closed."
  );
  const [report, setReport] = useState("");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const totalAlerts = allAlerts.length;
  const criticalAlerts = allAlerts.filter(
    (alert) => alert.severity === "Critical"
  ).length;
  const highAlerts = allAlerts.filter((alert) => alert.severity === "High").length;
  const openAlerts = allAlerts.filter((alert) => alert.status === "Open").length;
  const unresolvedAlerts = allAlerts.filter(
    (alert) => alert.status !== "Closed"
  ).length;

  const changeTheme = (color, name) => {
    setThemeColor(color);
    setThemeName(name);
    setBotReply(`Dashboard theme changed to ${name}.`);
  };

  const resetDashboard = () => {
    setAlerts(allAlerts);
    setReport("");
    setSelectedAlert(null);
    setBotReply("Dashboard reset. Showing all alerts.");
  };

  const explainAlert = (alertId) => {
    const alert = allAlerts.find(
      (item) => item.id.toLowerCase() === alertId.toLowerCase()
    );

    if (!alert) {
      setBotReply("Alert not found.");
      return;
    }

    setSelectedAlert(alert);
    setReport("");
    setBotReply(
      `${alert.id}: ${alert.title}. Severity is ${alert.severity}. Recommended action: ${alert.recommendation}`
    );
  };

  const updateAlertStatus = (alertId, newStatus) => {
    const alertExists = allAlerts.some(
      (alert) => alert.id.toLowerCase() === alertId.toLowerCase()
    );

    if (!alertExists) {
      setBotReply(`Alert ${alertId.toUpperCase()} was not found.`);
      return;
    }

    const updatedAlerts = allAlerts.map((alert) =>
      alert.id.toLowerCase() === alertId.toLowerCase()
        ? { ...alert, status: newStatus }
        : alert
    );

    setAllAlerts(updatedAlerts);
    setAlerts(updatedAlerts);
    setSelectedAlert(null);
    setReport("");
    setBotReply(`${alertId.toUpperCase()} status updated to ${newStatus}.`);
  };

  const generateReport = () => {
    const updatedTotalAlerts = allAlerts.length;
    const updatedCriticalAlerts = allAlerts.filter(
      (alert) => alert.severity === "Critical"
    ).length;
    const updatedHighAlerts = allAlerts.filter(
      (alert) => alert.severity === "High"
    ).length;
    const updatedOpenAlerts = allAlerts.filter(
      (alert) => alert.status === "Open"
    ).length;
    const updatedUnresolvedAlerts = allAlerts.filter(
      (alert) => alert.status !== "Closed"
    ).length;

    const reportText = `Daily SOC Report

Total Alerts: ${updatedTotalAlerts}
Critical Alerts: ${updatedCriticalAlerts}
High Severity Alerts: ${updatedHighAlerts}
Open Alerts: ${updatedOpenAlerts}
Unresolved Alerts: ${updatedUnresolvedAlerts}

Main Observed Threat Categories:
- Phishing
- Malware
- Brute Force
- Privilege Escalation
- Suspicious Network Traffic

Recommended Action:
Security analysts should first investigate critical and high-severity alerts. Open phishing, malware, and privilege escalation alerts should be prioritized. Closed incidents should be reviewed later for reporting and trend analysis.`;

    setReport(reportText);
    setSelectedAlert(null);
    setBotReply("Daily SOC report generated successfully.");
  };

  const processCommand = () => {
    const command = userInput.toLowerCase().trim();

    if (!command) {
      setBotReply("Please enter a command.");
      return;
    }

    const alertMatch = command.match(/al-\d+/);
    const alertId = alertMatch ? alertMatch[0].toUpperCase() : null;

    if (command.includes("red")) {
      changeTheme("#991b1b", "Red");
    } else if (command.includes("blue")) {
      changeTheme("#1d4ed8", "Blue");
    } else if (command.includes("green")) {
      changeTheme("#166534", "Green");
    } else if (command.includes("purple")) {
      changeTheme("#6d28d9", "Purple");
    } else if (command.includes("dark")) {
      changeTheme("#0f172a", "Dark Blue");
    } else if (command.includes("critical")) {
      const filtered = allAlerts.filter((alert) => alert.severity === "Critical");
      setAlerts(filtered);
      setReport("");
      setSelectedAlert(null);
      setBotReply("Showing only critical security alerts.");
    } else if (
      command.includes("open") ||
      command.includes("unresolved") ||
      command.includes("pending")
    ) {
      const filtered = allAlerts.filter((alert) => alert.status !== "Closed");
      setAlerts(filtered);
      setReport("");
      setSelectedAlert(null);
      setBotReply("Showing unresolved incidents.");
    } else if (command.includes("closed") && !alertId) {
      const filtered = allAlerts.filter((alert) => alert.status === "Closed");
      setAlerts(filtered);
      setReport("");
      setSelectedAlert(null);
      setBotReply("Showing closed incidents.");
    } else if (command.includes("all alerts") || command.includes("reset")) {
      resetDashboard();
    } else if (
      command.includes("generate report") ||
      command.includes("daily report") ||
      command.includes("soc report")
    ) {
      generateReport();
    } else if (command.includes("explain")) {
      if (alertId) {
        explainAlert(alertId);
      } else {
        setBotReply("Please mention an alert ID. Example: explain AL-1002");
      }
    } else if (
      alertId &&
      (command.includes("mark") ||
        command.includes("update") ||
        command.includes("set"))
    ) {
      if (command.includes("closed")) {
        updateAlertStatus(alertId, "Closed");
      } else if (command.includes("investigating")) {
        updateAlertStatus(alertId, "Investigating");
      } else if (command.includes("open")) {
        updateAlertStatus(alertId, "Open");
      } else {
        setBotReply(
          "Please mention a valid status: Open, Investigating, or Closed."
        );
      }
    } else {
      setBotReply(
        "This command is not available yet. Try: change color to red, show critical alerts, generate daily report, explain AL-1002, or mark AL-1002 as closed."
      );
    }

    setUserInput("");
  };

  return (
    <div
      className="app"
      style={{
        "--theme-color": themeColor,
      }}
    >
      <aside className="sidebar">
        <div className="logo-box">
          <div className="logo-icon">AI</div>
          <div>
            <h2>SOC Assistant</h2>
            <p>Cybersecurity Dashboard</p>
          </div>
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>Alerts</a>
          <a>Incidents</a>
          <a>Reports</a>
          <a>Settings</a>
        </nav>

        <div className="theme-box">
          <p>Current Theme</p>
          <strong>{themeName}</strong>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <h1>AI Security Analyst Assistant</h1>
            <p>
              Alert Triage, Dashboard Visualization, Incident Reporting, and
              Natural Language UI Control
            </p>
          </div>
          <div className="status-pill">Prototype V1</div>
        </header>

        <section className="summary-cards">
          <div className="summary-card">
            <span>Total Alerts</span>
            <strong>{totalAlerts}</strong>
            <p>All security events</p>
          </div>

          <div className="summary-card danger">
            <span>Critical Alerts</span>
            <strong>{criticalAlerts}</strong>
            <p>Immediate action needed</p>
          </div>

          <div className="summary-card warning">
            <span>Open Alerts</span>
            <strong>{openAlerts}</strong>
            <p>Waiting for investigation</p>
          </div>

          <div className="summary-card info">
            <span>Unresolved</span>
            <strong>{unresolvedAlerts}</strong>
            <p>Not closed yet</p>
          </div>
        </section>

        <section className="main-grid">
          <div className="panel dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Security Alert Dashboard</h2>
                <p>Real-time overview of cybersecurity alerts</p>
              </div>

              <button className="small-btn" onClick={resetDashboard}>
                Reset Table
              </button>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Alert</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Source IP</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="alert-id">{alert.id}</td>
                      <td>{alert.title}</td>
                      <td>
                        <span className={`badge ${alert.severity.toLowerCase()}`}>
                          {alert.severity}
                        </span>
                      </td>
                      <td>{alert.status}</td>
                      <td>{alert.category}</td>
                      <td>{alert.sourceIp}</td>
                      <td>{alert.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedAlert && (
              <div className="result-box">
                <h3>Alert Explanation</h3>
                <p>
                  <strong>{selectedAlert.id}</strong> - {selectedAlert.title}
                </p>
                <p>
                  <strong>Severity:</strong> {selectedAlert.severity}
                </p>
                <p>
                  <strong>Status:</strong> {selectedAlert.status}
                </p>
                <p>
                  <strong>Category:</strong> {selectedAlert.category}
                </p>
                <p>
                  <strong>Recommended Step:</strong>{" "}
                  {selectedAlert.recommendation}
                </p>
              </div>
            )}

            {report && (
              <div className="result-box">
                <h3>Generated SOC Report</h3>
                <pre>{report}</pre>
              </div>
            )}
          </div>

          <div className="panel chatbot-panel">
            <div className="panel-header">
              <div>
                <h2>Chatbot Assistant</h2>
                <p>Control the dashboard with natural language</p>
              </div>
            </div>

            <div className="chat-message">
              <span>Assistant</span>
              <p>{botReply}</p>
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Example: mark AL-1002 as closed"
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    processCommand();
                  }
                }}
              />

              <button onClick={processCommand}>Send Command</button>
            </div>

            <div className="command-box">
              <h3>Try These Commands</h3>
              <ul>
                <li>Change color to red</li>
                <li>Change color to blue</li>
                <li>Change color to green</li>
                <li>Change color to purple</li>
                <li>Show critical alerts</li>
                <li>Show unresolved incidents</li>
                <li>Generate daily report</li>
                <li>Explain AL-1002</li>
                <li>Mark AL-1002 as closed</li>
                <li>Mark AL-1003 as investigating</li>
                <li>Mark AL-1004 as open</li>
                <li>Show all alerts</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;