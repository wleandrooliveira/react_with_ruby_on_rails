import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import NotesTable from '../components/NotesTable'

const Api = require('../utils/NotesApi')

class Notes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getAll()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            notes: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            notes: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, notes } = this.state

    if (error) {

      return (
        <Alert color="danger">
          Error: {error}
        </Alert>
      )

    } else if (!isLoaded) {

      return (
        <Alert color="primary">
          Loading...
        </Alert>
      )

    } else {

      return (
        <Container>
          <Row>
            <Col>
              <NotesTable notes={notes}></NotesTable>
              <Link className="btn btn-primary" to="/notes/new">Criar Nota</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Notes