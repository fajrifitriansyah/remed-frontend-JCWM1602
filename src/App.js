import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Admin from './Admin'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <h1>
                Welcome
            </h1>
            </Route>
            <Route path='/admin' component={Admin} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}