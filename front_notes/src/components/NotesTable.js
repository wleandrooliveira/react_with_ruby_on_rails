import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class NotesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: props.notes
    }
  }

  render() {
    const notes = this.state.notes
    if (notes.length === 0) {
      return <div></div>
    } else {
      return (
        <Table>
          <thead>
            <h1>Bloco de Notas</h1>
            <tr>
              <th>Assunto</th>
              <th>Texto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td>{note.title}</td>
                <td>{note.description}</td>
                <td>
                  <Link className="btn btn-success" to={`/notes/${note.id}/edit`}>Editar</Link>{' '}
                  <Link className="btn btn-danger" to={`/notes/${note.id}/delete`}>Excluir</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default NotesTable