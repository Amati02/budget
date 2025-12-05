# Budget Tracker - Deployment Documentation

## 🏗️ Project Architecture

### Overview
The Budget Tracker is deployed as a **hybrid system** combining:
- **Docker** (for n8n and Traefik)
- **Systemd services** (for Budget Tracker)

### Why This Architecture?
- **n8n** needs Docker for its complex dependencies
- **Budget Tracker** is simpler and works better with systemd
- **Traefik** handles SSL and routing for both services

## 📁 File Structure

```
Server: 179.61.132.56
├── /root/n8n-compose/          # Docker services
│   ├── docker-compose.yml      # n8n + Traefik configuration
│   └── budget-tracker-route/   # Docker proxy for Traefik
├── /opt/budget-tracker/        # Budget Tracker (systemd)
│   ├── server.js               # Node.js API server
│   ├── telegram-bot.js         # Telegram bot
│   ├── index.html              # Frontend interface
│   ├── script.js               # Frontend JavaScript
│   ├── styles.css              # Frontend styling
│   ├── budget_data.json        # Data storage
│   └── nginx-budget.conf       # Nginx configuration
└── /etc/systemd/system/        # Systemd services
    ├── budget-tracker.service
    ├── budget-tracker-bot.service
    └── nginx-budget.service
```

## 🔧 Services Overview

### 1. **n8n Service** (Docker)
- **Purpose**: Workflow automation
- **URL**: `https://amatin8n.ru`
- **Port**: 5678 (internal), 80/443 (external)
- **Management**: `docker-compose` commands

### 2. **Traefik Service** (Docker)
- **Purpose**: Reverse proxy and SSL termination
- **Ports**: 80, 443
- **Features**: Automatic SSL certificates, routing
- **Management**: `docker-compose` commands

### 3. **Budget Tracker API** (Systemd)
- **Purpose**: Backend API for budget data
- **Port**: 4001
- **File**: `/opt/budget-tracker/server.js`
- **Management**: `systemctl` commands

### 4. **Budget Tracker Bot** (Systemd)
- **Purpose**: Telegram bot integration
- **File**: `/opt/budget-tracker/telegram-bot.js`
- **Management**: `systemctl` commands

### 5. **Nginx Proxy** (Systemd)
- **Purpose**: Proxy between Traefik and Budget Tracker
- **Port**: 8080
- **File**: `/opt/budget-tracker/nginx-budget.conf`
- **Management**: `systemctl` commands

## 🌐 Network Flow

```
Internet → Traefik (Docker:80/443) → Budget Tracker Proxy (Docker:80) → Nginx (Systemd:8080) → Node.js API (Systemd:4001)
```

### Detailed Flow:
1. **User visits** `https://budget.amatin8n.ru`
2. **Traefik** receives HTTPS request on port 443
3. **Traefik** routes to `budget-tracker-route` container
4. **Container** proxies to nginx on port 8080
5. **Nginx** proxies to Node.js API on port 4001
6. **Node.js** serves the response back through the chain

## 🔑 Key Configuration Files

### Docker Compose (`/root/n8n-compose/docker-compose.yml`)
```yaml
services:
  traefik:
    image: "traefik"
    ports: ["80:80", "443:443"]
    # Handles SSL and routing
  
  n8n:
    image: "docker.n8n.io/n8nio/n8n:latest"
    # Workflow automation
  
  budget-tracker-route:
    image: "nginx:alpine"
    # Proxy container for Traefik routing
```

### Budget Tracker API (`/opt/budget-tracker/server.js`)
```javascript
const PORT = process.env.PORT || 4001;
const DATA_FILE = '/opt/budget-tracker/budget_data.json';
// Serves API and static files
```

### Nginx Proxy (`/opt/budget-tracker/nginx-budget.conf`)
```nginx
server {
    listen 8080;
    location / {
        proxy_pass http://127.0.0.1:4001;
    }
}
```

## 🚀 Deployment Commands

### Start All Services
```bash
# Start Docker services
cd /root/n8n-compose
docker-compose up -d

# Start systemd services
systemctl start budget-tracker
systemctl start budget-tracker-bot
systemctl start nginx-budget
```

### Stop All Services
```bash
# Stop systemd services
systemctl stop budget-tracker budget-tracker-bot nginx-budget

# Stop Docker services
cd /root/n8n-compose
docker-compose down
```

### Check Status
```bash
# Check Docker services
docker ps

# Check systemd services
systemctl status budget-tracker budget-tracker-bot nginx-budget
```

## 🔧 Maintenance Commands

### Update Budget Tracker
```bash
# Upload new files via WinSCP to /opt/budget-tracker/
# Restart services if needed
systemctl restart budget-tracker budget-tracker-bot
```

### Update n8n
```bash
cd /root/n8n-compose
docker-compose pull
docker-compose up -d
```

### View Logs
```bash
# Budget Tracker logs
journalctl -u budget-tracker -f
journalctl -u budget-tracker-bot -f

# Docker logs
docker logs n8n-compose_traefik_1
docker logs n8n-compose_n8n_1
docker logs budget-tracker-route
```

## 🛠️ Troubleshooting

### Common Issues
1. **502 Bad Gateway**: Check if nginx can reach Node.js
2. **404 Not Found**: Check Traefik routing configuration
3. **SSL Issues**: Check Let's Encrypt certificate status
4. **Service Won't Start**: Check logs and file permissions

### Debug Commands
```bash
# Test API directly
curl http://localhost:4001/health

# Test nginx proxy
curl http://localhost:8080/health

# Test Traefik routing
curl -H "Host: budget.amatin8n.ru" http://localhost/

# Check port usage
netstat -tlnp | grep -E ":(80|443|4001|8080)"
```

## 📊 Monitoring

### Health Checks
- **API Health**: `curl http://localhost:4001/health`
- **Website**: `https://budget.amatin8n.ru/health`
- **n8n**: `https://amatin8n.ru`

### Log Locations
- **Systemd logs**: `journalctl -u service-name`
- **Docker logs**: `docker logs container-name`
- **Nginx logs**: `/var/log/nginx/`

## 🔒 Security Notes

- **SSL certificates** are automatically managed by Traefik
- **Data file** is stored in `/opt/budget-tracker/budget_data.json`
- **Services** run as root (consider changing for production)
- **Firewall** should allow ports 80, 443, 22

## 📈 Scaling Considerations

- **Current setup** handles moderate traffic
- **For high traffic**: Consider load balancing
- **For data backup**: Regular backups of `budget_data.json`
- **For monitoring**: Add health check endpoints

## ✅ Success Metrics

- ✅ **n8n accessible** at `https://amatin8n.ru`
- ✅ **Budget Tracker accessible** at `https://budget.amatin8n.ru`
- ✅ **Telegram bot** responding to commands
- ✅ **SSL certificates** automatically renewed
- ✅ **Services** restart automatically on failure


