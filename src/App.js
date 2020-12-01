import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from './components/Home.js'
import { Login } from './components/Login.js'
import { Register } from './components/Register.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation'
import { ArtistForm } from './components/ArtistForm'

function App() {
  return (
    <div>
      <Navigation />

      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/artistForm" component={ArtistForm} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
