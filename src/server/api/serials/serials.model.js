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

  updateStatus (serial) {
    console.log('FIREBASE: Updating watch status')
    return firebase.database().ref(`serials/${serial.id}`).once('value')
      .then(snapshot => {
        return Promise.all(
          [
            firebase.database().ref(`serials/${serial.id}`).set({
              ...snapshot.val(),
              currentSeason: serial.season,
              currentEpisode: serial.episode
            }), Promise.resolve(this.nextEpisode(snapshot.val(), serial))
          ]
        )
      })
  }

  nextEpisode (details, serial) {
    if (details.episodes[serial.season][parseInt(serial.episode) + 1]) {
      return {
        id: serial.id,
        season: parseInt(serial.season),
        episode: parseInt(serial.episode) + 1
      }
    } else if (details.episodes[parseInt(serial.season) + 1] &&
      details.espidoes[parseInt(serial.season) + 1][1]) {
      return {
        id: serial.id,
        season: parseInt(serial.season) + 1,
        episode: 1
      }
    } else {
      return {}
    }
  }
}
