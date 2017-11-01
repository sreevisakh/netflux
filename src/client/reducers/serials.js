let initialState = {
  list: [],
  results: [],
  data: {}
}

export default function serials (state = initialState, {type, payload}) {
  switch (type) {
    case 'SEARCH':
      return {
        ...state,
        results: payload
      }
    case 'LIST':
      return {
        ...state,
        list: payload
      }
    case 'GET':
      return {
        ...state,
        details: payload
      }
    case 'DOWNLOAD':
      return {
        ...state,
        data: payload
      }
    default:
      return state
  }
}
