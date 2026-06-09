# Full Market.shop — E-Shop Frontend

A modern, responsive frontend for a full-stack e-commerce application, built with **Angular 21**, **Signals**, **Tailwind CSS v4**, and **Angular Material**.

This is the client-side application of a full-stack e-shop portfolio project. It provides product browsing, a fully reactive shopping cart with local persistence, user authentication screens, and a themeable (light/dark) responsive UI. It is designed to connect to a dedicated [Spring Boot backend API](https://github.com/jroumpekas/eshop-springboot-backend).

## Overview

The frontend is responsible for:

* Presenting the product catalog and product details
* Managing a reactive shopping cart with `localStorage` persistence
* Handling user-facing authentication flows (login / register / profile)
* Providing a responsive, accessible UI with light/dark theming
* Communicating with the backend REST API

## Tech Stack

* **Angular 21** (standalone components, no NgModules)
* **Angular Signals** for reactive state management
* **TypeScript 5.9**
* **Tailwind CSS v4** (via `@tailwindcss/postcss`)
* **Angular Material 21** + **CDK**
* **RxJS 7**
* **Vitest 4** for unit testing
* **Prettier** for formatting

## Features

### Shopping Cart (Signal-based)

The cart is implemented with Angular Signals and exposes read-only, derived state. It persists automatically to `localStorage` on every change using an `effect()`, so the cart survives page reloads with no manual save calls.

```ts
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(this.loadFromStorage());

  // Public read-only state + derived signals
  readonly items = this._items.asReadonly();
  readonly totalCount = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0),
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  );
  readonly isEmpty = computed(() => this._items().length === 0);

  constructor() {
    // Auto-persist to localStorage on any change
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
    });
  }
}
```

Key design points:

* Private writable signal, public `asReadonly()` state — components can read but not mutate directly
* `computed()` signals for `totalCount`, `totalPrice`, and `isEmpty`
* Immutable updates via `.update()` returning new array references
* Quantity clamped to available stock when adding items

### Product Catalog

* Product list and reusable product card components
* Strongly typed `Product` model
* Discounts page for promotional items

### Authentication & Profile

* Login, register, and profile screens
* Contact form
* Designed to integrate with JWT-based authentication from the backend

### UI / UX

* Responsive layout with Tailwind CSS v4 utility classes
* Angular Material components
* Light / dark theme support
* Client-side routing with a catch-all redirect

## Project Structure

```text
src/app
├── components
│   ├── home
│   ├── product-list
│   ├── product-card
│   ├── cart
│   ├── discounts
│   ├── contact-form
│   ├── login
│   ├── register
│   ├── profile
│   ├── about
│   └── navbar
├── services
│   ├── cart.ts          # Signal-based cart + localStorage persistence
│   ├── product.ts       # Product data access
│   └── auth.ts          # Authentication
├── models
│   ├── product.ts
│   └── cart-item.ts
├── app.ts               # Root standalone component
├── app.config.ts        # Application providers
└── app.routes.ts        # Route definitions
```

## Routes

| Path            | Component     | Description              |
| --------------- | ------------- | ------------------------ |
| `/`             | `Home`        | Landing page             |
| `/products`     | `ProductList` | Product catalog          |
| `/cart`         | `Cart`        | Shopping cart            |
| `/discounts`    | `Discounts`   | Discounted products      |
| `/contact-form` | `ContactForm` | Contact form             |
| `/login`        | `Login`       | User login               |
| `/register`     | `Register`    | User registration        |
| `/profile`      | `Profile`     | User profile             |
| `/about`        | `About`       | About page               |
| `**`            | —             | Redirects to `/`         |

## Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm 11+

### Installation

```bash
git clone https://github.com/jroumpekas/eshop-app-frontend.git
cd eshop-app-frontend
npm install
```

### Development server

```bash
npm start
```

Then open `http://localhost:4200/`. The app reloads automatically on source changes.

### Production build

```bash
npm run build
```

Build artifacts are written to the `dist/` directory.

### Running tests

```bash
npm test
```

Unit tests run with the [Vitest](https://vitest.dev/) test runner.

## Backend Integration

This frontend is designed to work with the e-shop Spring Boot backend.

* Default backend URL: `http://localhost:8080`
* CORS is configured on the backend for local frontend communication

To run the full stack locally, start the backend first, then run this frontend with `npm start`.

> Note: Some `Product` fields (`imageUrl`, `oldPrice`, `category`, `rating`) are currently frontend-only placeholders and will be wired to the backend as the API evolves.

## Current Status

Completed:

* Standalone-component architecture (Angular 21)
* Signal-based cart with `localStorage` persistence
* Product list, product card, and cart pages
* Routing across all main views
* Tailwind v4 + Angular Material styling
* Light / dark theme

Planned improvements:

* Connect to the backend REST API (products, auth, orders)
* Wire authentication to JWT login/register endpoints
* Checkout flow and order creation
* Frontend unit and e2e tests
* Route guards for protected pages

## Related Project

This is the frontend of a full-stack e-shop application.

* **Backend repository:** [eshop-springboot-backend](https://github.com/jroumpekas/eshop-springboot-backend)

## Author

Created by **Dimitris Roumpékas** as part of a full-stack portfolio project.

* GitHub: [@jroumpekas](https://github.com/jroumpekas)
* LinkedIn: [dimitris-roumpekas](https://www.linkedin.com/in/dimitris-roumpekas-24a81b17a)