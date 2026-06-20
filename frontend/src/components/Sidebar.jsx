function Sidebar() {
  return (
<aside className="sidebar">
<h2>SOC Assistant</h2>
<p>AI Security Analyst Assistant</p>
 
      <nav>
<a href="#overview">Overview</a>
<a href="#alerts">Critical Alerts</a>
<a href="#assistant">AI Assistant</a>
<a href="http://localhost:3000" target="_blank" rel="noreferrer">
          Open Grafana
</a>
</nav>
</aside>
  );
}
 
export default Sidebar;