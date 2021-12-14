import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home'


export default {
    
    login: {
      path: '/login',
      component: Login
    },
    
    signup: {
      path: '/signup',
      component: Signup
    },
   
    home: {
        path: '/home',
        component: Home,
        auth: true
      }

  }