import axios from "axios";

class AuthService {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
       
            if (storedToken) {
              config.headers = { Authorization: `Bearer ${storedToken}` };
            }
       
            return config;
          });
    }

    login = requestBody => {
        return this.api.post('/auth/login', requestBody);
      };
     
    signup = requestBody => {
        return this.api.post('/auth/signup', requestBody);
      };
     
    verifyToken = () => {
        return this.api.get('/auth/verify');
      };

    uploadPhoto = uploadData => {
        return this.api.post('/api/upload', uploadData)
      };

    getCurrentUser = () => {
        return this.api.get('/api/users')
    };

    editUser = ({username, campus, course, image }) => {
        return this.api.put("/api/users", {username, campus, course, image})
    }
}

const authService = new AuthService();

export default authService;