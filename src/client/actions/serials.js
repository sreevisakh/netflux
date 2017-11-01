import 'whatwg-fetch';
const backend = 'http://localhost:8082'
export function search (query){
  return (dispatch) => {
    fetch(`${backend}/api/serials/search?q=${query}`)
      .then(response => response.json())
      .then(response => {
        dispatch({type: 'SEARCH', payload: response})
      })
  }
}
export function add (id) {
  return dispatch => {
    fetch(`${backend}/api/serials/add/${id}`)
      .then(response => response.json())
      .then(response => {
        dispatch({type: 'ADD', payload: response})
      }, error => dispatch({type: 'ADD_REJECTED', error}))
  }
}

export function loadSerials () {
  return dispatch => {
    fetch(`${backend}/api/serials/list`)
      .then(response => response.json())
      .then(response => {
        dispatch({type: 'LIST', payload: response})
      }, error => dispatch({type: 'LIST_REJECTED', error}))
  }
}

export function loadSerial (serial) {
  return dispatch => {
    fetch(`${backend}/api/serials/get/${serial}`)
      .then(response => response.json())
      .then(response => {
        dispatch({type: 'GET', payload: response})
      }, error => dispatch({type: 'GET_REJECTED', error}))
  }
}

export function download (serial, season, episode) {
  return dispatch => {
    fetch(`${backend}/api/serials/download/${serial}/${season}/${episode}`)
      .then(response => response.json())
      .then(response => {
        dispatch({type: 'DOWNLOAD', payload: response})
      }, error => dispatch({type: 'DOWNLOAD_REJECTED', error}))
  }
}
