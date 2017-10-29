let initialState = {
  list: [],
  results: []
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
    default:
      return state
  }
}
