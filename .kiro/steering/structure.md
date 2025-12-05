# Project Structure

## Root Directory Layout

```
/
├── server.js                    # Express API server (main backend)
├── telegram-bot.js              # Telegram bot integration
├── index.html                   # Main SPA entry point
├── script.js                    # Frontend application logic
├── styles.css                   # Application styling
├── budget_data.json             # JSON data store
├── package.json                 # Node.js dependencies
├── .gitignore                   # Git ignore rules
├── .dockerignore                # Docker ignore rules
└── deployment files/            # Server configuration files
    ├── budget-tracker.service
    ├── budget-tracker-bot.service
    ├── nginx-budget.service
    ├── deploy-simple.sh
    ├── DEPLOYMENT_DOCUMENTATION.md
    └── UPDATE_INSTRUCTIONS.md
```

## Architecture Pattern

**Monolithic with separate concerns:**
- Single repository containing both frontend and backend
- Backend serves static files (frontend) and API endpoints
- Telegram bot runs as separate process but shares data file
- No build step required - files served directly

## Code Organization

### Backend (`server.js`)
- Express middleware setup
- RESTful API route handlers
- File-based data persistence helpers
- Static file serving
- CORS configuration for cross-origin requests

### Telegram Bot (`telegram-bot.js`)
- Bot command handlers (`/start`, `/add`, `/skip`)
- Conversation state management
- Category selection via inline keyboards
- API integration for data persistence

### Frontend (`script.js`)
- Class-based architecture (`BudgetTracker` class)
- Section-based navigation (dashboard, expenses, income, reports, settings)
- Chart.js integration for visualizations
- Modal-based forms for data entry
- Auto-sync with backend API

### Styling (`styles.css`)
- Responsive design (mobile-first)
- CSS Grid and Flexbox layouts
- Custom component styles
- Bottom navigation for mobile

## Data Flow

1. **User Input** → Frontend forms or Telegram bot
2. **API Request** → Express server endpoints
3. **Data Storage** → JSON file read/write
4. **Response** → JSON data back to client
5. **UI Update** → Frontend re-renders with new data

## Deployment Structure

Production deployment uses systemd services:
- `budget-tracker.service` - API server
- `budget-tracker-bot.service` - Telegram bot
- `nginx-budget.service` - Nginx proxy

Files deployed to `/opt/budget-tracker/` on server.
