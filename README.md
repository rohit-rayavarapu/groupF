AI Security Analyst Assistant for Alert Triage and Grafana Dashboard Visualization

Project Overview

This project is an AI-supported cybersecurity alert triage system designed for Security Operations Center (SOC) teams. The system helps analysts view, understand, prioritize, and investigate security alerts using a combination of frontend interface, backend APIs, PostgreSQL database, Grafana dashboard visualization, and future Langflow AI assistant integration.

The goal is to reduce alert fatigue, improve response time, and support better cybersecurity decision-making.


Problem Statement

Security Operations Center teams receive a large number of alerts from SIEM tools, firewalls, IDS systems, endpoint tools, and authentication logs. Many of these alerts are low priority or false positives, which makes it difficult for analysts to identify real threats quickly.

Junior SOC analysts may struggle to understand why an alert is dangerous, what evidence should be checked, and what investigation steps should be followed. SOC team leads need a high-level view of critical alerts, unresolved incidents, attack trends, and daily reports.

This project solves the problem by creating an AI Security Analyst Assistant connected to a Grafana dashboard. The system stores cybersecurity alert data in PostgreSQL, visualizes security information in Grafana, and provides AI-based explanations and investigation guidance for alerts.

Product Vision

For cybersecurity teams and SOC analysts who receive a large number of security alerts, the AI Security Analyst Assistant is an AI-supported alert triage and Grafana dashboard visualization system that helps analysts understand, prioritize, investigate, and report alerts.

Unlike normal dashboards that only display raw data, our product combines Grafana dashboard visualization with AI-based alert explanation and investigation guidance.

The main benefit of the product is reducing alert fatigue, improving response time, and helping both junior SOC analysts and SOC team leads make better security decisions.



 Target Users

1. Junior SOC Analyst

A junior analyst needs help understanding security alerts, identifying high-risk incidents, and following correct investigation steps.

2. SOC Team Lead / Cybersecurity Manager

A SOC team lead needs high-level visibility into critical alerts, unresolved incidents, attack trends, and daily security summaries.


Core Features

- Alert dashboard
- Critical alert prioritization
- Alerts by severity
- Alerts by attack type
- Critical alert details
- Source IP and destination IP analysis
- Daily SOC summary
- AI-based alert explanation
- Suggested investigation steps
- Incident report generation
- Grafana dashboard evidence
- Alert status tracking


Team Members and Module Responsibility

| Team Member | Branch | Module | Responsibility |
|---|---|---|---|
| Pratheesh | `prateesh` | Frontend | React + Vite SOC analyst interface |
| Rekula | `rekula` | Backend | FastAPI backend and alert APIs |
| Rohit | `rayavarapu` | Database + Grafana + Docker | PostgreSQL, Grafana dashboard, Docker integration |
| Main Branch | `main` | Stable Development | Integrated development branch |
| Production Branch | `prod` | Final Demo / Deployment | Production-ready branch |

System Architecture

```text
React Frontend
      ↓
FastAPI Backend
      ↓
PostgreSQL Database
      ↓
Grafana Dashboard

Future AI Flow:
Langflow AI Assistant
      ↓
FastAPI Backend
      ↓
PostgreSQL Alert Data
      ↓
AI-based Alert Explanation
