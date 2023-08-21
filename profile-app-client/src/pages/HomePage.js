import { Link } from "react-router-dom"
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import avatarImage from '../assets/default-avatar.png'

function HomePage() {
    const [showUpload, setShowUpload] = useState(false);
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined); 
    const { user, setUser, isLoggedIn, logOutUser } = useContext(AuthContext);
    

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();
   
        uploadData.append("image", e.target.files[0]);
     
        axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
          .then(response => {
            //console.log("response is: ", response);
            setImage(response.data.image);
          })
          .catch((err) => setErrorMessage(err.response.data.message));
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_API_URL}/api/users`, {...user, image})
            .then((response)=> {
                //console.log(response.data.updatedUser)
                setUser(response.data.updatedUser);
                setImage("");
                setErrorMessage(null); 
            })
            .catch((err) => setErrorMessage(err.response.data.message));
      }

  return (
    <div>
        {isLoggedIn && <div>  
            <h1>Profile</h1>
            <p>Username</p>
            <p>{user?.username}</p>
          
            <p>Campus</p>
            <p>{user?.campus}</p>
         
            <p>Course</p>
            <p>{user?.course}</p>
         
            <button onClick={logOutUser}>Log out</button>
        </div>}

        {!isLoggedIn && <div>
                <h1>IronProfile</h1>
                <p>Today we will create an app with some cool style!</p>
                <div>
                    <Link to={'/signup'}><button>Signup</button></Link>
                    <Link to={'/login'}><button>Login</button></Link>
                </div>
            </div>}

        {isLoggedIn && 
            (<div>
                <div>
                    {user && 
                    user.image ? 
                    <img src={user.image} alt={"profile_image"} style={{width: '50px', height: '50px', borderRadius: '75%'}} /> :
                    <img src={avatarImage} alt={"profile_image"} style={{width: '50px', height: '50px', borderRadius: '75%'}} />
                    }
                    {!showUpload &&
                    <button onClick={()=> setShowUpload(!showUpload)}>Edit Photo</button>
                    }
                </div> 
                <div>
                {showUpload && 
                        (<form onSubmit={handleSubmit}>
                            <input type="file" onChange={(e) => handleFileUpload(e)} />
                            <button onClick={()=> setShowUpload(!showUpload)}>Cancel Edit</button>
                            <button type="submit">Save new profile image</button>
                            </form>)
                    }
                    {errorMessage && <p>{errorMessage}</p>} 
                </div> 
            </div>
            )}
    </div>
  )
}

export default HomePage;