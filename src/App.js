import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './FireBase/firebase.Initialize';


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
initializeAuthentication()
function App() {
  const auth = getAuth();
  const [user, setUser] = useState([]);
  const handlerToSign = () => {

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);


      })
      .catch((error) => {

        console.log(error.message);
      })
  }

  const handlerToGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);

      }).catch((error) => {
        // Handle Errors here.

        console.log(error.message);

      });
  }
  const handlerToRemove = () => {
    signOut(auth).then(() => {
      setUser({});
    })
  }
  return (
    <div className="App">
      {!user.displayName ?
        <div>
          <button onClick={handlerToSign}>Sign in by google</button>
          <button onClick={handlerToGithub}>Sign in by github</button>
        </div>
        :
        <button onClick={handlerToRemove}>signout</button>
      }

      {
        user.displayName && <div>
          <h1>welcome to gfdg {user.displayName}</h1>
          <h1>Your email {user?.email}</h1>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
