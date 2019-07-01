const Auth = {
    isAuthenticated: false,
    authenticate(cb, user) {
        /*
         * LOGIN
         */
        if (user.email === 'admin' && user.password === 'admin') {
            this.isAuthenticated = true;
            setTimeout(cb, 1000);
        }
        else {
            console.log('Invalid User');
        }
    },
    signout(cb) {
        /*
         * LOGOUT
         */
        this.isAuthenticated = false;
        setTimeout(cb, 1000);
    }
};
export default Auth;