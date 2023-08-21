import { Link, useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context"; 
import authService from "../services/auth.service";

function Login() {
    const [user, setUser] = useState({username: '', password: ''});
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name; 
        const value = e.target.value; 
                
        setUser(user => ({...user, [name]: value}))
    }

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        authService.login(user)
            .then((response) => {
            //console.log('JWT token', response.data.authToken );
            storeToken(response.data.authToken);
            authenticateUser();
            navigate('/');                               
          })
        .catch((err) => setErrorMessage(err.response.data.message));
    }
    
    return(
        <div>
            <h1>Log in</h1>

            <form onSubmit={handleLoginSubmit}>
            <label>Username:</label>
            <input type="text" name="username" value={user.username} onChange={handleChange} />
            <br/>
            <label>Password:</label>
            <input type="password" name="password" value={user.password} onChange={handleChange}/>
            <br/>
            <p>If you don't have an accout yet, you can create your account <Link to="/signup">here</Link></p>
            
            <button type="submit">Log in</button>
            </form>

            { errorMessage && <p>{errorMessage}</p> }


            <h1>Hello!!</h1>
            <h2>Awesome to have you at IronProfile again</h2>
            <p>If you signup you agree with all our terms and conditions where we can do whatever we want with the data </p>
        
    </div>
    )
}

export default Login;