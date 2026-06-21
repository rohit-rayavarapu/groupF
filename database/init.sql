CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    alert_id VARCHAR(20) UNIQUE NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    source_ip VARCHAR(50),
    destination_ip VARCHAR(50),
    source_port INTEGER,
    destination_port INTEGER,
    protocol VARCHAR(20),
    attack_type VARCHAR(100),
    severity VARCHAR(20),
    status VARCHAR(50),
    description TEXT
);

INSERT INTO alerts 
(alert_id, timestamp, source_ip, destination_ip, source_port, destination_port, protocol, attack_type, severity, status, description)
VALUES
('A-1001', '2026-06-20 09:10:00', '185.23.44.12', '10.0.0.5', 44321, 22, 'TCP', 'Brute Force', 'High', 'New', 'Multiple failed SSH login attempts from same source IP'),
('A-1002', '2026-06-20 09:20:00', '192.168.1.45', '10.0.0.8', 51233, 80, 'TCP', 'Port Scan', 'Medium', 'New', 'Multiple ports scanned on web server'),
('A-1003', '2026-06-20 09:45:00', '103.88.12.9', '10.0.0.10', 60000, 443, 'TCP', 'DDoS', 'Critical', 'New', 'High traffic volume detected against HTTPS service'),
('A-1004', '2026-06-20 10:05:00', '10.0.0.25', '10.0.0.30', 5353, 53, 'UDP', 'DNS Anomaly', 'Medium', 'Under Investigation', 'Unusual DNS query volume detected'),
('A-1005', '2026-06-20 10:30:00', '172.16.0.15', '10.0.0.12', 49888, 3389, 'TCP', 'RDP Brute Force', 'High', 'New', 'Repeated failed RDP login attempts'),
('A-1006', '2026-06-20 11:00:00', '203.44.55.66', '10.0.0.7', 40012, 21, 'TCP', 'FTP Attack', 'Medium', 'Resolved', 'Suspicious FTP login attempt detected'),
('A-1007', '2026-06-20 11:30:00', '91.200.14.22', '10.0.0.15', 55512, 8080, 'TCP', 'Web Attack', 'High', 'New', 'Possible SQL injection attempt detected'),
('A-1008', '2026-06-20 12:00:00', '10.0.0.50', '10.0.0.20', 12345, 445, 'TCP', 'Malware Activity', 'Critical', 'Under Investigation', 'Suspicious SMB traffic detected'),
('A-1009', '2026-06-20 12:20:00', '45.67.89.10', '10.0.0.11', 50123, 25, 'TCP', 'Spam Activity', 'Low', 'False Positive', 'Unusual outbound SMTP traffic detected'),
('A-1010', '2026-06-20 12:45:00', '88.77.66.55', '10.0.0.18', 59000, 443, 'TCP', 'Data Exfiltration', 'Critical', 'New', 'Large outbound data transfer detected')
ON CONFLICT (alert_id) DO NOTHING;