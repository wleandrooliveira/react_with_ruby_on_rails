const apiHost =  process.env.REACT_APP_NOTES_API_URL || 'http://localhost:3001/api/v1'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
const collectErrors = (response) => {
let errors = []

if (response.status === 404) {
    errors.push(response.error)
    return errors
}

const fields = Object.keys(response)
fields.forEach(field => {
    const prefix = capitalizeFirstLetter(field)
    response[field].forEach(message => {
    errors.push(`${prefix} ${message}`)
    })
})
return errors
}
  
  const deleteNote = (id) => {
    let response_ok = null
    return fetch(`${apiHost}/notes/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      response_ok = response.ok
      if (response.status === 204) {
        return ''
      } else {
        return response.json()
      }
    })
    .then(response => {
      if (response_ok) {
        return [false, response]
      } else {
        return [true, collectErrors(response)]
      }
    })
  }
  
  const getAll = () => {
    let response_ok = null
    return fetch(`${apiHost}/notes`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        response_ok = response.ok
        return response.json()
      })
      .then(response => {
        if (response_ok) {
          return [false, response]
        } else {
          return [true, collectErrors(response)]
        }
      })
  }
  
  const getNote = (id) => {
    let response_ok = null
    return fetch(`${apiHost}/notes/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      response_ok = response.ok
      return response.json()
    })
    .then(response => {
      if (response_ok) {
        return [false, response]
      } else {
        return [true, collectErrors(response)]
      }
    })
  }
  
  const saveNote = (data, id=null) => {
    let apiUrl = `${apiHost}/notes`
    let apiMethod = 'post'
    if (id) {
      apiUrl = `${apiUrl}/${id}`
      apiMethod = 'put'
    }
  
    const body = JSON.stringify({
      note: data
    })
  
    let response_ok = null
    return fetch(apiUrl, {
      method: apiMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(response => {
      response_ok = response.ok
      return response.json()
    })
    .then(response => {
      if (response_ok) {
        return [false, null]
      } else {
        return [true, collectErrors(response)]
      }
    })
  }
  
  module.exports = {
    saveNote: saveNote,
    getAll: getAll,
    deleteNote: deleteNote,
    getNote: getNote
  }