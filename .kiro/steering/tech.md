# Technology Stack

## Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **API Style**: RESTful JSON API
- **Data Storage**: JSON file (`budget_data.json`)
- **Bot Framework**: node-telegram-bot-api

## Frontend

- **Architecture**: Vanilla JavaScript (no framework)
- **UI Pattern**: Single Page Application (SPA)
- **Charts**: Chart.js
- **Icons**: Font Awesome 6
- **Styling**: Custom CSS with responsive design

## Key Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "node-telegram-bot-api": "^0.64.0",
  "axios": "^1.6.0"
}
```

## Development Tools

- **nodemon**: Auto-restart during development

## Common Commands

### Development
```bash
npm run dev          # Start API server with auto-reload
npm run bot:dev      # Start Telegram bot with auto-reload
```

### Production
```bash
npm start            # Start API server
npm run bot          # Start Telegram bot
```

## Deployment

- **Environment**: Linux server (Ubuntu/Debian)
- **Process Manager**: systemd services
- **Reverse Proxy**: Nginx + Traefik (Docker)
- **SSL**: Let's Encrypt via Traefik
- **Ports**: 
  - API: 4001 (internal)
  - Nginx proxy: 8080 (internal)
  - Public: 80/443 (via Traefik)

## API Endpoints

All endpoints use `/api` prefix:
- `GET /health` - Health check
- `GET/POST/DELETE /api/expenses` - Expense management
- `GET/POST/DELETE /api/income` - Income management
- `GET/POST /api/budget` - Budget settings
- `GET/POST/DELETE /api/categories` - Category management
