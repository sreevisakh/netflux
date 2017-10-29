import fetch from 'isomorphic-fetch';
import SerialModel from './serials.model'
import EWatchSeriesService from '../services/ewatchseries.service'
let model = new SerialModel()

export function list (req, res) {
  model.getAll().then((response) => {
    res.send(response)
  }, error => res.status(500).send(error))
}

export async function get (req, res) {
  let response = await model.get(req.params.id)
  res.send(response);
}

export function search (req, res) {
  let query = req.query.q
  console.log('Searching with', query)
  if (!query) return res.send([])
  return fetch('http://ewatchseries.to/show/search-shows-json', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `term=${encodeURIComponent(query)}`
  })
    .then(response => response.json())
    .then(response => {
      res.send(response)
    }, err => res.status(500).send(err))
}

export async function add (req, res) {
  try {
    console.log('Adding Serial', req.params.id)
    const serialService = new EWatchSeriesService()
    let serial = await serialService.getSerial(req.params.id)
    console.log('Serial Details', JSON.stringify(serial))
    let save = await model.add(serial)
    console.log('Saving Serial', save)
    res.send({serial, save})
  } catch (error) {
    res.status(500).send(error)
  }
}
