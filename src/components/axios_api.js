import axios from 'axios';
const API_URL = 'http://localhost:8000';

/*!
    Moved from api class that wraps axios functions to an axios instance 
    This is to allow the use of axios interceptor, which is used to automatically refresh tokens.
!*/

// Axios Instance with authorization header
// used to make authorized requests to database.
const user_api = axios.create({
    baseURL: `${API_URL}/`,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
})

// Axios interceptor, when a request fails (because token expires), 
//  this will make a new request with a refreshed token
user_api.interceptors.response.use(response => response, 
    error => {

        // save original request to try again later
        let original_request = error.config;
        
        // Prevent infinite loops: If token refresh failed.
        if (error.response.status === 401 && original_request.url == API_URL+"/users/token/refresh") {
            return Promise.reject(error);
        }
        
        // Catch expired token, attemp to refresh
        if (error.response.data.code === "token_not_valid" && 
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized"
            ) {

                // Grab current refresh token
                const refresh_token = localStorage.getItem('refresh_token');
                if (refresh_token) {

                    // Grab refresh token expiration
                    const tokenParts = JSON.parse(atob(refresh_token.split('.')[1]));
                    const now = Math.ceil(Date.now() / 1000);
                    console.log("Token Refresh : Expiration : " + tokenParts.exp);

                    // If not expired, attempt to refresh.
                    if (tokenParts.exp > now) {
                        return user_api.post('users/token/refresh/', {refresh: refresh_token})
                            .then((response) => {

                                // Save tokens and update headers
                                localStorage.setItem('access_token', response.data.access);
                                localStorage.setItem('refresh_token', response.data.refresh);
                                user_api.defaults.headers['Authorization'] = "JWT " + response.data.access;
                                original_request.headers['Authorization'] = "JWT " + response.data.access;
                                
                                // Try original request
                                return user_api(original_request);
                            })
                            .catch(err => {
                                console.log("Token Refresh: Attempt failed.\n" + err)
                            })
                    }

                    else {
                        console.log("Token Refresh: Refresh token expired", tokenParts.exp, now)
                    }
                }

                else{
                    console.log("Refresh token not available")
                }
        }

        return Promise.reject(error);
});

export default user_api