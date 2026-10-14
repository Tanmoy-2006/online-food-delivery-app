# FoodieGo — Online Food Ordering React + Bootstrap Project

## Features
- React + React-Bootstrap
- React Router pages
- Separate Header.jsx and Footer.jsx
- Home page with animated delivery scene
- Food categories
- Category click -> related food cards
- Search food
- Food details page
- Add to Cart
- Quantity + / -
- Remove from Cart
- Cart saved in localStorage
- Checkout / Place Order page
- Login / Register
- About / Contact
- Responsive mobile layout

## Run
Start the backend first (see `../Backend/README.md`), then run the frontend:
```bash
npm install
npm run dev
```

Then open the local Vite URL.

The registration form sends name, email, and password to `POST http://localhost:5000/api/auth/register` by default. To use a different API base URL, set `VITE_API_URL` in a local `.env` file (for example, `VITE_API_URL=http://localhost:5000/api`).

After logging in, customers are shown their own account panel at `/account`; admin users are directed to `/admin`. These panels share the dashboard layout and load account/admin information from the backend. Public registration creates customer accounts only. See `../Backend/README.md` for admin account setup. The current backend does not yet persist orders, so order history is not available in the customer panel.

## Main structure
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/components/FoodCard.jsx`
- `src/components/DeliveryAnimation.jsx`
- `src/pages/Home.jsx`
- `src/pages/Menu.jsx`
- `src/pages/FoodDetails.jsx`
- `src/pages/Cart.jsx`
- `src/pages/Checkout.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/pages/About.jsx`
- `src/pages/Contact.jsx`
- `src/data/foodData.js`
- `src/styles.css`

The home-page delivery animation is implemented in CSS so it works without an external video URL. A separate delivery animation media file is also included in `src/assets/` when generated.

## Real Food Photos
Food cards use real food photography from Unsplash URLs. An internet connection is needed to display the remote photos.
