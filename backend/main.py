from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
 
 
app = FastAPI(

    title="AI Security Analyst Assistant API",

    description="Backend API for alert triage, SOC summaries, and assistant responses",

    version="1.0.0"

)
 
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)
 
 
class ChatRequest(BaseModel):

    question: str
 
 
alerts = [

    {

        "alert_id": "A-1001",

        "timestamp": "2026-06-20 09:10:00",

        "source_ip": "185.23.44.12",

        "destination_ip": "10.0.0.5",

        "source_port": 44321,

        "destination_port": 22,

        "protocol": "TCP",

        "attack_type": "Brute Force",

        "severity": "High",

        "status": "New",

        "description": "Multiple failed SSH login attempts from same source IP"

    },

    {

        "alert_id": "A-1002",

        "timestamp": "2026-06-20 09:20:00",

        "source_ip": "192.168.1.45",

        "destination_ip": "10.0.0.8",

        "source_port": 51233,

        "destination_port": 80,

        "protocol": "TCP",

        "attack_type": "Port Scan",

        "severity": "Medium",

        "status": "New",

        "description": "Multiple ports scanned on web server"

    },

    {

        "alert_id": "A-1003",

        "timestamp": "2026-06-20 09:45:00",

        "source_ip": "103.88.12.9",

        "destination_ip": "10.0.0.10",

        "source_port": 60000,

        "destination_port": 443,

        "protocol": "TCP",

        "attack_type": "DDoS",

        "severity": "Critical",

        "status": "New",

        "description": "High traffic volume detected against HTTPS service"

    },

    {

        "alert_id": "A-1004",

        "timestamp": "2026-06-20 10:05:00",

        "source_ip": "10.0.0.25",

        "destination_ip": "10.0.0.30",

        "source_port": 5353,

        "destination_port": 53,

        "protocol": "UDP",

        "attack_type": "DNS Anomaly",

        "severity": "Medium",

        "status": "Under Investigation",

        "description": "Unusual DNS query volume detected"

    },

    {

        "alert_id": "A-1005",

        "timestamp": "2026-06-20 10:30:00",

        "source_ip": "172.16.0.15",

        "destination_ip": "10.0.0.12",

        "source_port": 49888,

        "destination_port": 3389,

        "protocol": "TCP",

        "attack_type": "RDP Brute Force",

        "severity": "High",

        "status": "New",

        "description": "Repeated failed RDP login attempts"

    },

    {

        "alert_id": "A-1008",

        "timestamp": "2026-06-20 12:00:00",

        "source_ip": "10.0.0.50",

        "destination_ip": "10.0.0.20",

        "source_port": 12345,

        "destination_port": 445,

        "protocol": "TCP",

        "attack_type": "Malware Activity",

        "severity": "Critical",

        "status": "Under Investigation",

        "description": "Suspicious SMB traffic detected"

    }

]
 
 
@app.get("/")

def home():

    return {

        "message": "AI Security Analyst Assistant API is running",

        "module": "FastAPI Backend",

        "dashboard": "Grafana",

        "database": "PostgreSQL planned for integration"

    }
 
 
@app.get("/alerts")

def get_all_alerts():

    return {

        "total": len(alerts),

        "alerts": alerts

    }
 
 
@app.get("/alerts/critical")

def get_critical_alerts():

    critical_alerts = [

        alert for alert in alerts

        if alert["severity"] == "Critical"

    ]
 
    return {

        "total": len(critical_alerts),

        "critical_alerts": critical_alerts

    }
 
 
@app.get("/alerts/{alert_id}")

def get_alert_by_id(alert_id: str):

    for alert in alerts:

        if alert["alert_id"].lower() == alert_id.lower():

            return alert
 
    return {

        "error": "Alert not found",

        "alert_id": alert_id

    }
 
 
@app.get("/summary/daily")

def get_daily_summary():

    total_alerts = len(alerts)

    critical_alerts = len([a for a in alerts if a["severity"] == "Critical"])

    high_alerts = len([a for a in alerts if a["severity"] == "High"])

    medium_alerts = len([a for a in alerts if a["severity"] == "Medium"])

    unresolved_alerts = len([a for a in alerts if a["status"] != "Resolved"])
 
    attack_count = {}

    for alert in alerts:

        attack_type = alert["attack_type"]

        attack_count[attack_type] = attack_count.get(attack_type, 0) + 1
 
    top_attack_type = max(attack_count, key=attack_count.get)
 
    return {

        "total_alerts": total_alerts,

        "critical_alerts": critical_alerts,

        "high_alerts": high_alerts,

        "medium_alerts": medium_alerts,

        "unresolved_alerts": unresolved_alerts,

        "top_attack_type": top_attack_type,

        "summary": (

            f"The SOC dashboard shows {total_alerts} alerts. "

            f"There are {critical_alerts} critical alerts, {high_alerts} high severity alerts, "

            f"and {unresolved_alerts} unresolved alerts. "

            f"The most important attack type to monitor is {top_attack_type}."

        )

    }
 
 
@app.post("/assistant/explain-alert/{alert_id}")

def explain_alert(alert_id: str):

    selected_alert = None
 
    for alert in alerts:

        if alert["alert_id"].lower() == alert_id.lower():

            selected_alert = alert

            break
 
    if not selected_alert:

        return {

            "error": "Alert not found",

            "alert_id": alert_id

        }
 
    attack_type = selected_alert["attack_type"]

    severity = selected_alert["severity"]

    source_ip = selected_alert["source_ip"]

    destination_ip = selected_alert["destination_ip"]

    destination_port = selected_alert["destination_port"]

    description = selected_alert["description"]
 
    explanation = (

        f"Alert {alert_id} is a {severity} severity {attack_type} alert. "

        f"The source IP {source_ip} targeted destination IP {destination_ip} "

        f"on port {destination_port}. "

        f"The alert description is: {description}. "

        f"This alert should be investigated using Grafana dashboard evidence, "

        f"related logs, source IP behavior, and destination service activity."

    )
 
    recommended_steps = [

        "Check Grafana dashboard panels for related activity",

        "Review source IP behavior",

        "Check destination service logs",

        "Verify whether the alert is a true positive or false positive",

        "Update the alert status after investigation"

    ]
 
    return {

        "alert_id": alert_id,

        "attack_type": attack_type,

        "severity": severity,

        "explanation": explanation,

        "recommended_steps": recommended_steps

    }
 
 
@app.post("/assistant/chat")

def assistant_chat(request: ChatRequest):

    question = request.question.lower()
 
    if "a-1003" in question:

        return explain_alert("A-1003")
 
    if "critical" in question:

        return {

            "answer": "There are 2 critical alerts: A-1003 DDoS and A-1008 Malware Activity. These alerts should be investigated first using Grafana dashboard evidence."

        }
 
    if "summary" in question:

        return get_daily_summary()
 
    if "brute force" in question:

        return {

            "answer": "Brute-force alerts indicate repeated login attempts. Recommended actions are to check authentication logs, verify failed login counts, identify affected accounts, and block suspicious source IPs if required."

        }
 
    return {

        "answer": "I can explain alerts, show critical incidents, and generate SOC summaries. Try asking: Explain alert A-1003, Show critical alerts, or Generate daily summary."

    }
 