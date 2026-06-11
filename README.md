# E-Shop Frontend

A modern frontend application for a full-stack e-shop platform, built with **Angular**, **TypeScript**, and **Tailwind CSS**.

This project is the client-side part of a full-stack e-commerce application and communicates with a Spring Boot backend API.

## Overview

The application provides a complete e-shop user interface, including product browsing, discount products, cart management, authentication, user profile, checkout flow, and order history.

It is designed to work together with the backend repository:

```text
https://github.com/jroumpekas/eshop-springboot-backend
```

## Tech Stack

* Angular
* TypeScript
* Angular Router
* Angular Reactive Forms
* Angular Signals
* RxJS
* Tailwind CSS
* JWT Authentication
* REST API integration

## Features

### Product Browsing

* Product listing page
* Product details page
* Product cards with image, price, stock, and discount information
* Discount products page
* Product images and offer data loaded from the backend

### Authentication

* User login
* User registration
* JWT token storage
* Authenticated user profile
* Logout functionality
* Route guards for protected pages
* Auth interceptor for protected API requests

### Cart & Checkout

* Add products to cart
* Increase or decrease product quantities
* Remove products from cart
* Clear cart
* Checkout flow connected with the backend
* Order creation through the backend API
* Automatic cart clearing after successful checkout

### Orders

* My Orders page
* Display of completed orders
* Order items, quantities, prices, total amount, and status

### Navigation & Layout

* Responsive navbar
* Dynamic navbar state based on authentication
* About page
* Contact page
* Clean component-based structure

## Project Structure

```text
src/app
├── components        # UI components and pages
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
├── guards            # Route guards
├── interceptors      # HTTP interceptors
├── models            # TypeScript interfaces
├── services          # API and state services
├── app.config.ts
├── app.routes.ts
└── app.ts
```

## Backend Integration

The frontend communicates with a Spring Boot backend running locally on:

```text
http://localhost:8080
```

Main backend API areas used by the frontend:

```http
GET  /api/products
POST /api/auth/login
POST /api/auth/register
GET  /api/users/me
POST /api/orders/checkout
GET  /api/orders/my-orders
```

Protected requests use a JWT token through an HTTP interceptor.

## Authentication Flow

The authentication flow works as follows:

1. The user logs in through the Angular login page.
2. The backend returns a JWT token.
3. The token is stored locally.
4. The Angular interceptor attaches the token to protected API requests.
5. Protected routes are handled through Angular route guards.
6. The current user is loaded from the backend through `/api/users/me`.

## Checkout Flow

The checkout flow works as follows:

1. The user adds products to the cart.
2. The cart stores selected products and quantities.
3. The user completes the order from the cart page.
4. The frontend sends the checkout request to the backend.
5. The backend creates the order and order items.
6. The frontend clears the cart.
7. The user is redirected to the My Orders page.

## Prerequisites

Before running the frontend locally, make sure you have installed:

* Node.js
* npm
* Angular CLI

The backend application should also be running locally on port `8080`.

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

## Running the Application

Start the Angular development server:

```bash
ng serve
```

The application will be available at:

```text
http://localhost:4200
```

## Build

To build the project:

```bash
ng build
```

The production build output will be generated in the `dist/` directory.

## Development Notes

The frontend currently expects the backend API to be available at:

```text
http://localhost:8080
```

Future improvement:

* Move the API base URL into Angular environment configuration files.
* Add admin product management pages.
* Improve error handling and loading states.
* Add more automated tests.
* Improve responsive UI details.
* Add deployment configuration.

## Current Status

Completed:

* Angular project setup
* Product list
* Product details
* Discounts page
* Cart functionality
* Login and register pages
* User profile page
* JWT auth interceptor
* Auth route guards
* Checkout flow
* My Orders page
* Backend product data integration
* Backend order integration

Planned improvements:

* Admin product management
* Environment-based API configuration
* Better form validation messages
* More complete testing
* Deployment setup

## Related Repository

Backend repository:

```text
https://github.com/jroumpekas/eshop-springboot-backend
```

## Author

Created by Dimitris Roumpékas as part of a full-stack e-shop portfolio project.
