
import router from './router';

const authGuard = (to, from, next) => {
    let authService;
    authService.isAuthenticated = function () {
        return false;
    };
    if (authService.isAuthenticated()) {
        next();
    } else {
        next('/login');
    }
};
export default authGuard;