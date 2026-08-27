# E-Shop Frontend

Modern and responsive frontend application for a full-stack e-commerce platform, built with **Angular**, **TypeScript**, and **Tailwind CSS**.

This project is the client-side part of a full-stack e-shop portfolio application. It communicates with a Spring Boot backend API and provides a shopping experience that includes product browsing, pagination, authentication, cart management, checkout, and order history.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Related Project](#related-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Integration](#backend-integration)
- [Environment Configuration](#environment-configuration)
- [Authentication Flow](#authentication-flow)
- [Checkout Flow](#checkout-flow)
- [Product Pagination](#product-pagination)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Build](#build)
- [Deployment](#deployment)
- [Current Status](#current-status)
- [Planned Improvements](#planned-improvements)
- [Portfolio Purpose](#portfolio-purpose)
- [Author](#author)

---

## Overview

The E-Shop Frontend is designed as a realistic e-commerce user interface connected to a backend REST API.

The application supports:

- Product browsing
- Paginated product listing
- Product details
- Discount products
- User login and registration
- JWT-based protected API requests
- Dynamic authentication state
- Protected routes
- Admin-only frontend route protection
- Cart management
- Checkout flow
- Order history
- User profile
- Responsive layout

The goal of this project is to demonstrate a complete frontend workflow for a real-world full-stack application.

---

## Live Demo

- **Angular application:** [eshop-angular-frontend.onrender.com](https://eshop-angular-frontend.onrender.com)
- **Backend API:** [eshop-springboot-backend.onrender.com](https://eshop-springboot-backend.onrender.com)
- **Swagger UI:** [Open Swagger UI](https://eshop-springboot-backend.onrender.com/swagger-ui/index.html)

> The Render backend may require a short initial loading time after a period of inactivity.

---

## Related Project

Backend repository:

[github.com/jroumpekas/eshop-springboot-backend](https://github.com/jroumpekas/eshop-springboot-backend)

Frontend repository:

[github.com/jroumpekas/eshop-app-frontend](https://github.com/jroumpekas/eshop-app-frontend)

---

## Tech Stack

- Angular
- TypeScript
- Angular Router
- Angular Reactive Forms
- Angular Signals
- RxJS
- Tailwind CSS
- JWT Authentication
- REST API integration
- Angular HTTP Interceptor
- Angular Route Guards
- Render Static Site

---

## Features

### Product Browsing

- Product listing page
- Paginated product listing
- Product details page
- Product cards with image, price, stock, category, rating, and discount information
- Discount products page
- Product data loaded from the backend API
- Support for product offer information

### Authentication

- User login
- User registration
- JWT token storage
- Authenticated user profile
- Logout functionality
- Dynamic navbar state based on authentication
- Route guards for protected pages
- Admin guard for admin-only pages
- HTTP interceptor for protected API requests

### Cart and Checkout

- Add products to cart
- Increase and decrease product quantities
- Remove products from cart
- Clear cart
- Cart total calculation
- Checkout flow connected with the backend
- Order creation through the backend API
- Automatic cart clearing after successful checkout
- Redirect to order history after checkout completion

### Orders

- My Orders page
- Display of completed orders
- Order items with quantities and prices
- Total order amount
- Order status display

### Navigation and Layout

- Responsive navbar
- Home page
- About page
- Contact page
- Discounts page
- Profile page
- Clean component-based structure
- Tailwind-based responsive styling

### Backend API Configuration

- Backend URL configured through Angular environment files
- Services use `environment.apiUrl` instead of hardcoded backend URLs
- Easier transition from local development to deployment

---

## Project Structure

```text
src/app
├── components
│   ├── about
│   ├── cart
│   ├── contact-form
│   ├── discounts
│   ├── footer
│   ├── home
│   ├── layout
│   ├── login
│   ├── my-orders
│   ├── navbar
│   ├── product-card
│   ├── product-details
│   ├── product-list
│   ├── profile
│   └── register
├── guards
├── interceptors
├── models
├── services
├── app.config.ts
├── app.routes.ts
└── app.ts
```

Environment files are located in:

```text
src/environment
```

---

## Backend Integration

The frontend communicates with a Spring Boot backend API.

Default backend development URL:

```text
http://localhost:8080/api
```

Deployed backend API URL:

```text
https://eshop-springboot-backend.onrender.com/api
```

Main backend API endpoints used by the frontend:

```http
GET  /api/products
GET  /api/products/paged?page=0&size=3&sort=name
GET  /api/products/{id}
POST /api/auth/login
POST /api/auth/register
GET  /api/users/me
POST /api/orders/checkout
GET  /api/orders/my-orders
```

Protected API requests use a JWT token through an Angular HTTP interceptor.

---

## Environment Configuration

The frontend uses Angular environment configuration for the backend API URL.

Example development configuration:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

Services build API URLs from `environment.apiUrl`, for example:

```ts
readonly apiUrl = `${environment.apiUrl}/products`;
```

This avoids hardcoded backend URLs inside Angular services and makes the application easier to configure for different environments.

Before running or building the frontend, check the backend API URL in:

```text
src/environment/environment.ts
```

The deployed configuration uses:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://eshop-springboot-backend.onrender.com/api'
};
```

---

## Authentication Flow

The authentication flow works as follows:

1. The user logs in through the Angular login page.
2. The backend validates the credentials.
3. The backend returns a JWT token.
4. The token is stored locally on the frontend.
5. The Angular HTTP interceptor attaches the token to protected API requests.
6. Route guards protect pages that require authentication.
7. The current user is loaded from the backend through `/api/users/me`.
8. The navbar updates based on authentication state.

---

## Checkout Flow

The checkout flow works as follows:

1. The user adds products to the cart.
2. The cart stores selected products and quantities.
3. The user reviews the cart.
4. The frontend sends a checkout request to the backend.
5. The backend creates the order and order items.
6. The frontend clears the cart after a successful checkout.
7. The user is redirected to the My Orders page.

---

## Product Pagination

The product list can load products from the backend paginated endpoint:

```http
GET /api/products/paged?page=0&size=3&sort=name
```

The backend returns a paginated response. Products are read from the `content` field, while pagination metadata such as `totalPages`, `totalElements`, and `number` is used by the product list page.

Example response structure:

```json
{
  "content": [],
  "totalElements": 0,
  "totalPages": 0,
  "size": 3,
  "number": 0,
  "first": true,
  "last": true
}
```

---

## Prerequisites

Before running the frontend locally, make sure you have installed:

- Node.js
- npm
- Angular CLI

The backend application should also be running locally on port `8080`.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/jroumpekas/eshop-app-frontend.git
```

Navigate into the project folder:

```bash
cd eshop-app-frontend
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the Angular development server:

```bash
ng serve
```

The application will be available at:

```text
http://localhost:4200
```

Make sure that the backend application is also running and that the API URL is configured in:

```text
src/environment/environment.ts
```

---

## Build

To build the project:

```bash
ng build
```

The production build output will be generated in the `dist/` directory.

For this project, the build output is generated under:

```text
dist/e-shop/browser
```

---

## Deployment

The Angular frontend is deployed as a Render Static Site.

Render configuration:

```text
Build Command: npm ci && npm run build
Publish Directory: dist/e-shop/browser
```

The project is built with:

```bash
ng build
```

The deployed frontend communicates with:

```text
https://eshop-springboot-backend.onrender.com/api
```

Angular client-side routes are supported by the following Render rewrite rule:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

The backend CORS configuration allows both `http://localhost:4200` and `https://eshop-angular-frontend.onrender.com`.

---

## Current Status

Completed:

- Angular project setup
- Responsive layout and navigation
- Product list page
- Paginated product listing
- Product details page
- Discounts page
- Cart functionality
- Login and register pages
- User profile page
- JWT authentication flow
- Auth interceptor
- Auth route guards
- Admin route guard
- Checkout flow
- My Orders page
- Backend product data integration
- Backend order integration
- Environment-based backend API URL configuration
- Successful production build with `ng build`
- Render Static Site deployment
- Live integration with the Render Spring Boot backend
- Production CORS integration
- Angular route rewrite configuration

---

## Planned Improvements

Future improvements may include:

- Admin product management pages
- Improved loading states
- Improved error states
- More detailed form validation messages
- Toast notifications
- Product search and filtering UI
- More automated tests
- Further responsive UI refinements
- Separate development and production environment files
- Automated deployment checks

---

## Portfolio Purpose

This project was built as part of a full-stack portfolio application.

It demonstrates:

- Angular component-based architecture
- REST API integration
- Authentication and authorization handling on the frontend
- JWT-based protected requests
- State handling for cart and authentication flows
- User-facing e-commerce workflows
- Integration with a Spring Boot backend
- Environment-based API configuration
- Product pagination connected to a backend REST endpoint

---

## Author

Created by Dimitris Roumpekas as part of a full-stack e-shop portfolio project.
