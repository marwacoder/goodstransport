import { createWebHistory, createRouter } from "vue-router";

import Vehicle from '../Views/Vehicle'
import Dashboard from '../Views/Dashboard'
import Goods from '../Views/Goods'
import Driver from '../Views/Driver'
import Employees from '../Views/Employee'
import Locations from '../Views/Location'
import Profile from '../Views/Profile.vue'
import Account from '../Views/Account.vue'
import Customer from "../Views/Customer"

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
},
    {
      path: '/vehicle',
    name: 'Vehicle',
    component: Vehicle  
    },
    {
    path: '/goods',
    name: 'Goods',
    component: Goods  
    },
    {
      path: '/driver',
    name: 'Driver',
    component: Driver  
  },
    {
      path: '/employees',
    name: 'Employees',
    component: Employees  
    },
    {
    path: '/location',
    name: 'Location',
    component: Locations  
    },
    {
      path: '/profile',
    name: 'Profile',
    component: Profile  
  },
  {
    path: '/account',
  name: 'Account',
  component: Account  
},
    {
      path: '/customer',
    name: 'Customer',
    component: Customer  
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;