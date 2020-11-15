import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'
import Home from './components/Home.js'
import { Login } from './components/Login.js'
import { RegisterForm } from './components/RegisterForm.js'

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Login">Login</Link></li>           
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={RegisterForm} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
