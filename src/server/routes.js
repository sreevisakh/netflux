import Serials from './api/serials'

export default function (app) {
  app.use('/api/serials', Serials)
}
