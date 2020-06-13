import axios from 'axios';
const API_URL = 'http://localhost:8000';

/*!
    Moved from api class that wraps axios functions to an axios instance 
    This is to allow the use of axios interceptor, which is used to automatically refresh tokens.
    May need two different instances since there are different base urls,
        could also just make the base url API_URL, and add the route... (currently trying)
!*/

// Axios Instance with authorization header
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
        let original_request = error.config;
        
        // console.log(error.response.status)
        // Prevent infinite loops
        if (error.response.status == 401 && original_request.url == API_URL+"/users/token/refresh") {
            return Promise.reject(error);
        }
        
        // catch the error, thrown by expired token
        if (error.response.data.code === "token_not_valid" && 
            error.response.status == 401 && 
            error.response.statusText == "Unauthorized"
            ) {

                const refresh_token = localStorage.getItem('refresh_token');
                if (refresh_token) {
                    const tokenParts = JSON.parse(atob(refresh_token.split('.')[1]));

                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return user_api.post('users/token/refresh/', {refresh: refresh_token})
                            .then((response) => {

                                localStorage.setItem('access_token', response.data.access);
                                localStorage.setItem('refresh_token', response.data.refresh);
                
                                user_api.defaults.headers['Authorization'] = "JWT " + response.data.access;
                                original_request.headers['Authorization'] = "JWT " + response.data.access;
                
                                return user_api(original_request);
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }

                    else {
                        console.log("Refresh token is expired", tokenParts.exp, now)
                    }
                }

                else{
                    console.log("Refresh token not available")
                }
        }

        return Promise.reject(error);
});

export default user_api