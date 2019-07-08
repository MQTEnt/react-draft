const Auth = {
    isAuthenticated: false,
    authenticate(cbSuccess, cbFail, user) {
        /*
         * LOGIN
         */
        if (user.email === 'admin' && user.password === 'admin') {
            this.isAuthenticated = true;
            setTimeout(cbSuccess, 2000);
        }
        else {
            console.log('Invalid User');
            setTimeout(() => {cbFail('Does not match any user!')}, 2000);
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