import React, { Component } from 'react'
import {BrowserRouter as Router,Route } from 'react-router-dom'
import Notes from './components/Notes'
import NoteForm from './components/NoteForm'
import NoteDelete from './components/NoteDelete'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Notes} />
          <Route exact path='/notes' component={Notes} />
          <Route exact path='/notes/new' component={NoteForm} />
          <Route
            exact path='/notes/:id/edit'
            render={(routeProps) => (
              <NoteForm {...routeProps} />
            )}
          />
          <Route
            exact path='/notes/:id/delete'
            render={(routeProps) => (
              <NoteDelete {...routeProps} />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App