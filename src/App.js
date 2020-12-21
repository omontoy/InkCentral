import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from './pages/Home.js'
import { Login } from './pages/Login.js'
import { Register } from './pages/Register.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation'
import { ArtistForm }  from './pages/ArtistForm'
import  ArtistProfile  from './pages/ArtistProfile'
import { ClientForm }  from './pages/ClientForm'


function PrivateRoute(props){
  const token = sessionStorage.getItem('token');
  if(!token) return <Redirect to="/login" />
  return <Route {...props } />
}


function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/artist-form" component={ArtistForm}  />
          <PrivateRoute exact path="/artists/:artistId" component={ArtistProfile}  />
          <PrivateRoute exact path="/client-form" component={ClientForm}  />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
