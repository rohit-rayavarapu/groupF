function HeroSection() {

  const openGrafanaDashboard = () => {

    window.open("http://localhost:3000", "_blank");

  };
 
  return (
<section className="hero">
<div>
<p className="eyebrow">Senior IT Project</p>
<h1>AI Security Analyst Assistant</h1>
<p>

          Alert triage and Grafana dashboard visualization system for SOC

          analysts.
</p>
</div>
 
      <button className="grafana-button" onClick={openGrafanaDashboard}>

        Open Grafana Dashboard
</button>
</section>

  );

}
 
export default HeroSection;
 