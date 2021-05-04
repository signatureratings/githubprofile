import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import User from './components/User'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/user/:username' children={<User />}></Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
