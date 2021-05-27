import './App.css';
import Map from './Map'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Map} />
        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
