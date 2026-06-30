import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { Discounts } from './components/discounts/discounts';
import { ContactForm } from './components/contact-form/contact-form';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Profile } from './components/profile/profile';
import { About } from './components/about/about';
import { MyOrders } from './components/my-orders/my-orders';
import { AdminProducts } from './components/admin-products/admin-products';

import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },

  {
    path: 'products',
    component: ProductList,
  },

  {
    path: 'products/:id',
    component: ProductDetails,
  },

  {
    path: 'discounts',
    component: Discounts,
  },

  {
    path: 'about',
    component: About,
  },

  {
    path: 'contact-form',
    component: ContactForm,
  },

  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard],
  },

  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'register',
    component: Register,
  },

  {
    path: 'orders',
    component: MyOrders,
    canActivate: [authGuard],
  },

  {
    path: 'admin/products',
    component: AdminProducts,
    canActivate: [adminGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];