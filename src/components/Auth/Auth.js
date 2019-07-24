import axios from 'axios';
import { apiUrl } from '../../config/api-config';

const Auth = {
    isAuthenticated: false,
    authenticate(cbSuccess, cbFail, user) {
        /*
         * LOGIN
         */
        axios.post(apiUrl + '/login', {
            email: user.email,
            password: user.password
        })
        .then((response) => {
            const data = response.data;
            // Save token
            localStorage.setItem('token', data.access_token);

            this.isAuthenticated = true;
            console.log('Login successfully!');
            cbSuccess();
        })
        .catch((error) => {
            cbFail('Does not match any user!');
            console.log(error);
        });
    },
    signout(cb) {
        /*
         * LOGOUT
         */
        const token = localStorage.getItem('token');
  
        // Call API
        axios.post(apiUrl + '/logout', {
            token: token
        })
        .finally((response) => {
            // Remove token
            localStorage.removeItem('token');
    
            this.isAuthenticated = false;
            setTimeout(cb, 100);
        });
    },
    register(success, fail, user) {
        axios.post(apiUrl + '/register', {
            name: user.name,
            email: user.email,
            password: user.password
        })
        .then((response) => {
            const data = response.data;
            // Save token
            localStorage.setItem('token', data.access_token);

            this.isAuthenticated = true;
            success();
            console.log('Login successfully!');
        })
        .catch((error) => {
            fail();
            console.log(error);
        });
    }
};
export default Auth;