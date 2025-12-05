# Budget Tracker - Update Instructions

## 🔄 How to Update the Budget Tracker

### Prerequisites
- WinSCP installed on your Windows machine
- Access to your Linux server via PuTTY
- Budget tracker files on your local machine

### Step 1: Make Changes Locally
1. Edit files on your Windows machine:
   - `index.html` - Frontend interface
   - `script.js` - JavaScript functionality  
   - `styles.css` - Styling
   - `server.js` - Backend API (if needed)
   - `telegram-bot.js` - Bot functionality (if needed)

2. Test locally (optional):
   ```bash
   node server.js
   # Test at http://localhost:4001
   ```

### Step 2: Upload Changes to Server
1. Open WinSCP
2. Connect to your server (179.61.132.56)
3. Navigate to `/opt/budget-tracker/`
4. Upload the modified files:
   - Drag and drop `index.html`
   - Drag and drop `script.js`
   - Drag and drop `styles.css`
   - Upload any other modified files

### Step 3: Restart Services (if needed)
1. Open PuTTY and connect to your server
2. If you changed `server.js` or `telegram-bot.js`:
   ```bash
   systemctl restart budget-tracker
   systemctl restart budget-tracker-bot
   ```

3. If you only changed frontend files (HTML/CSS/JS):
   - No restart needed - changes take effect immediately

### Step 4: Test the Updates
1. Open browser and go to `https://budget.amatin8n.ru`
2. Test your new features
3. Check browser console for any errors (F12)

## 🎯 Common Update Scenarios

### Adding New UI Features
- Edit `index.html` - Add new sections, buttons, modals
- Edit `script.js` - Add new JavaScript functions
- Edit `styles.css` - Add new styling
- Upload files → Test immediately

### Adding New API Endpoints
- Edit `server.js` - Add new routes
- Upload `server.js`
- Restart API: `systemctl restart budget-tracker`
- Test new endpoints

### Updating Telegram Bot
- Edit `telegram-bot.js` - Add new commands
- Upload `telegram-bot.js`
- Restart bot: `systemctl restart budget-tracker-bot`
- Test new commands

## 🚨 Troubleshooting

### If Updates Don't Work
1. Check file permissions:
   ```bash
   ls -la /opt/budget-tracker/
   chmod 644 /opt/budget-tracker/*.html
   chmod 644 /opt/budget-tracker/*.js
   chmod 644 /opt/budget-tracker/*.css
   ```

2. Check service status:
   ```bash
   systemctl status budget-tracker
   systemctl status budget-tracker-bot
   systemctl status nginx-budget
   ```

3. Check logs:
   ```bash
   journalctl -u budget-tracker -f
   journalctl -u budget-tracker-bot -f
   ```

### If Website Shows Old Content
1. Clear browser cache (Ctrl+F5)
2. Check if files were uploaded correctly
3. Verify file timestamps:
   ```bash
   ls -la /opt/budget-tracker/
   ```

## 📁 File Locations on Server
- **Frontend files**: `/opt/budget-tracker/`
- **API server**: `/opt/budget-tracker/server.js`
- **Telegram bot**: `/opt/budget-tracker/telegram-bot.js`
- **Data file**: `/opt/budget-tracker/budget_data.json`
- **Nginx config**: `/opt/budget-tracker/nginx-budget.conf`

## 🔄 Quick Update Commands
```bash
# Restart all services
systemctl restart budget-tracker budget-tracker-bot nginx-budget

# Check all services status
systemctl status budget-tracker budget-tracker-bot nginx-budget

# View logs
journalctl -u budget-tracker -f --no-pager
journalctl -u budget-tracker-bot -f --no-pager
```


