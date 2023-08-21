import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import authService from "../services/auth.service";

function Signup() {
    const [user, setUser] = useState({username: '', password: '', campus: '', course: ''});
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name; 
        const value = e.target.value; 
                
        setUser(user => ({...user, [name]: value}))
    }


    const handleSignupSubmit = (e) => {
        e.preventDefault();
     
        authService.signup(user)
            .then(response => navigate("/login"))
            .catch((err) => setErrorMessage(err.response.data.message));
    }

    return (
        <div>
            <h1>Sign Up</h1>

            <form onSubmit={handleSignupSubmit}>

            <label>Username:</label>
            <input type="text" name="username" value={user.username} onChange={handleChange} />
            <br/>
            <label>Password:</label>
            <input type="password" name="password" value={user.password} onChange={handleChange}/>
            <br/>
            <label>Campus:  
                <select defaultValue={"Default"} name="campus" value={user.campus} onChange={handleChange}>
                    <option value="Default" disabled>Select Campus</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Miami">Miami</option>
                    <option value="Paris">Paris</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="México">Mexico</option>
                    <option value="Sao Paulo">Sao Paulo</option>
                    <option value="Lisbon">Lisbon</option>
                    <option value="Remote">Remote</option>
                </select>
            </label>
            <br/>
            <label>Course:  
                <select defaultValue={"Default"} name="course" value={user.course} onChange={handleChange}>
                    <option value="Default" disabled>Select Course</option>
                    <option value="Web Dev">Web Dev</option>
                    <option value="UX/UI">UX/UI</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Cyber Security">Cyber Security</option>
                </select>
            </label>
            <br />
            <br />
            <button type="submit">Create the Account</button>
            </form>

            { errorMessage && <p>{errorMessage}</p> }

            <h1>Hello!!</h1>
            <h2>Welcome to IronProfile</h2>
            <p>If you signup you agree with all our terms and conditions where we can do whatever we want with the data </p>
        
        </div>
    )
}

export default Signup