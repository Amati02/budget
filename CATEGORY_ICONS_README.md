# Custom Category Icons Feature

## Overview
The budget tracker now supports custom SVG icons for categories. When adding a new category, you can select from 100 professionally designed icons.

## Icon Library
The `category-icons.js` file contains 100 SVG icons organized into categories:

### Icon Categories (100 total):
1. **Finance & Money** (10 icons): wallet, creditCard, coins, piggyBank, cashStack, bank, chart, investment, receipt, calculator
2. **Food & Dining** (15 icons): restaurant, fastFood, coffee, pizza, cake, iceCream, grocery, apple, wine, beer
3. **Transportation** (10 icons): car, bus, train, airplane, bicycle, motorcycle, taxi, subway, ship, gas
4. **Shopping & Retail** (10 icons): shopping, bag, gift, clothes, shoes, jewelry, watch, furniture, electronics, phone, laptop
5. **Home & Living** (10 icons): home, bed, couch, lamp, kitchen, cleaning, tools, garden, pet
6. **Health & Wellness** (10 icons): health, hospital, pill, fitness, yoga, spa, doctor, heartbeat
7. **Entertainment & Leisure** (10 icons): movie, music, game, book, camera, sports, theater, art, travel, hotel
8. **Work & Education** (10 icons): briefcase, school, graduation, pencil, document, folder, email, meeting, presentation
9. **Utilities & Services** (10 icons): wifi, phone2, internet, electricity, water, gas2, trash, recycle, insurance, tax, subscription
10. **Miscellaneous** (10 icons): star, heart, bell, settings, lock, key, calendar, clock, location, flag

## How to Use

### Adding a Category with Custom Icon:
1. Go to **Settings** section (gear icon in bottom navigation)
2. Click **"Add"** button under either "Expense Categories" or "Income Categories"
3. You'll be taken to the **"Add Category"** page
4. The type (Expense/Income) is pre-selected based on which button you clicked
5. You can switch types using the switcher at the top if needed
6. Enter category name
7. Search or browse through 100 icons in the grid
8. Click on your desired icon (it will highlight in green)
9. Click **"Add Category"** button
10. Success! You'll automatically return to Settings page

### Managing Categories:
- **View Categories**: In Settings, see all your expense and income categories
- **Delete**: Click the X button next to any category to remove it
- **Switch Types**: On the Add Category page, toggle between Expense and Income
- **Icon Search**: Type keywords to filter icons (e.g., "car", "food", "home", "money")
- **See Existing**: The Add Category page shows all existing categories in a visual grid

### Full Page Experience:
The category management is now a dedicated page (not a popup), making it easier to:
- Browse and select from 100 icons with more space
- See all your existing categories at once
- Quickly switch between expense and income categories
- Manage categories without modal interruptions
- Auto-return to Settings after adding

## Technical Details

### Files Modified:
- `category-icons.js` - New file with 100 SVG icons
- `index.html` - Updated category modal with icon picker
- `styles.css` - Added icon picker styles
- `script.js` - Added icon selection and rendering logic
- `server.js` - Updated to store category icons

### Data Structure:
```json
{
  "categories": {
    "expense": ["Food", "Transport", ...],
    "income": ["Salary", "Freelance", ...]
  },
  "categoryIcons": {
    "Food": "restaurant",
    "Transport": "car",
    "Salary": "briefcase"
  }
}
```

### Default Icon Mappings:
The system includes smart defaults for common Russian categories:
- продукты → grocery
- транспорт → car
- ипотека → home
- коммуналка → electricity
- интернет → wifi
- аптека → pill
- врачи → doctor
- кафе → coffee
- рестораны → restaurant

## Benefits:
1. **Visual Recognition**: Quickly identify categories by icon
2. **Customization**: Choose icons that match your personal style
3. **100 Options**: Wide variety covering all common expense/income types
4. **SVG Quality**: Crisp, scalable icons that look great on any screen
5. **Search Functionality**: Easily find the perfect icon

## Browser Compatibility:
Works on all modern browsers that support SVG (Chrome, Firefox, Safari, Edge)
