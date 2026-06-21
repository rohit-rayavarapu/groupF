# Backend Module
 
This is the FastAPI backend module for the AI Security Analyst Assistant project.
 
## Module Owner
 
Rekula
 
## Purpose
 
The backend provides API endpoints for cybersecurity alerts, daily SOC summaries, and AI-style alert explanations.
 
## Technology Used
 
- Python

- FastAPI

- Uvicorn

- REST API
 
## Endpoints
 
| Method | Endpoint | Description |

|---|---|---|

| GET | `/` | API health check |

| GET | `/alerts` | Get all alerts |

| GET | `/alerts/critical` | Get critical alerts |

| GET | `/alerts/{alert_id}` | Get one alert by ID |

| GET | `/summary/daily` | Get daily SOC summary |

| POST | `/assistant/explain-alert/{alert_id}` | Explain one alert |

| POST | `/assistant/chat` | Basic assistant chat response |
 
## Run Locally
 
```bash

cd backend

pip install -r requirements.txt

uvicorn main:app --reload
 