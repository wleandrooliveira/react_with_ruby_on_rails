import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('../utils/NotesApi')

class NoteForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      note: {
        id: this.getNoteId(props),
        title: '',
        description: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.setBody = this.setBody.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getNoteId(props) {
    try {
      return props.match.params.id
    } catch (error) {
      return null
    }
  }

  setTitle(event) {
    let newVal = event.target.value || ''
    this.setFieldState('title', newVal)
  }

  setBody(event) {
    let newVal = event.target.value || ''
    this.setFieldState('description', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.note[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let note = {
      title: this.state.note.title,
      description: this.state.note.description
    }

    Api.saveNote(note, this.state.note.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/notes'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.note.id) {
      Api.getNote(this.state.note.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              note: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, note, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Editar Nota</h3>

              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="title">Assunto</Label>
                  <Input type="text" name="title" id="title" value={note.title} placeholder="Digite o assunto" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="body">Texto</Label>
                  <Input type="text" name="body" id="body" value={note.description} placeholder="Digite o Texto da nota" onChange={this.setBody} />
                </FormGroup>
                <Button color="success">Enviar</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default NoteForm