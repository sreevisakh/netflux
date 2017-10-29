import { firebaseApp as firebase } from '../../../app'
import _ from 'lodash';

export default class SerialModel {
  add (serial) {
    return firebase.database().ref('serials/' + serial.id).set(serial);
  }

  get (id) {
    return firebase.database().ref(`serials/${id}`).once('value').then((snapshot) => {
      return snapshot.val()
    })
  }

  getAll () {
    return firebase.database().ref('serials/').once('value').then((snapshot) => {
      return _.values(snapshot.val()).map(item => ({
        name: item.name,
        id: item.id,
        image: item.image
      }))
    })
  }
}
