import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListNotes extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    onDeleteNote: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { notes, onDeleteNote } = this.props
    const { query } = this.state

    let showingNotes
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingNotes = notes.filter((note) => match.test(note.title))
    } else {
        showingNotes = notes
    }

    showingNotes.sort(sortBy('title'))

    return (
      <div className='list-notes'>
        <div className='list-notes-top'>
          <input
            className='search-notes'
            type='text'
            placeholder='Search notes'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to='/create'
            className='add-notes'
          >Criar notas</Link>
        </div>

        {showingNotes.length !== notes.length && (
          <div className='showing-notes'>
            <span>Now showing {showingNotes.length} of {notes.length} total</span>
            <button onClick={this.clearQuery}>Motsrar Todos</button>
          </div>
        )}

        <ol className='notes-list'>
          {showingNotes.map((note) => (
            <li key={note.id} className='note-list-item'>
              <div className='note-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='note-details'>
                <p>{note.title}</p>
                <p>{note.description}</p>
              </div>
              <button onClick={() => onDeleteContact(note)} className='note-remove'>
                Excluir notas
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListNotes