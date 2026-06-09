import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { Discounts } from './components/discounts/discounts';
import { ContactForm } from './components/contact-form/contact-form';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Profile } from './components/profile/profile';
import { About } from './components/about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductList },
  { path: 'cart', component: Cart },
  { path: 'discounts', component: Discounts },
  { path: 'contact-form', component: ContactForm },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'about', component: About},
  { path: '**', redirectTo: '' },
];