import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadSerial} from 'actions/serials'
import {NavLink} from 'react-router-dom';

import _ from 'lodash';

class Serial extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedSeason: _.get(this, 'props.serial.currentSeason') || 1
    }
  }
  componentWillMount () {
    this.props.loadSerial(this.props.match.params.id)
  }

  onSeasonChange = (e) => {
    this.setState({
      selectedSeason: e.target.value
    })
  }

  viewEpisode = (episode) => {
    e.preventDefault()
    this.props.history.push()
  }

  render () {
    let serial = this.props.serial
    if (!this.props.serial) {
      return (<div>Loading Serial</div>)
    }
    return (
      <div className={'container container-fluid'}>
        <div className="row">
          <div className={'col-md-2'}>
            <img src={serial.image} />
          </div>
          <div className={'col-md-8 ml-5'}>
            <h2>{serial.name}</h2>
            <h3>Seasons: {serial.seasons}</h3>
            <p>View Season:
              <select className={'form-control'} onChange={this.onSeasonChange}>
                {
                  _.range(0, serial.seasons).map(season => {
                    return (<option key={season+1} value={season + 1}>Season {season + 1}</option>)
                  })
                }
              </select>
            </p>
          </div>
          <div className={'row'}>
            <ul>
              {serial.episodes[this.state.selectedSeason].map(episode => {
                return (
                  <li key={episode.number}>
                    <NavLink
                      to={`/watch/${this.props.serial.id}/${this.state.selectedSeason}/${episode.number}`}>
                      {episode.name}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Serial.propTypes = {}

export default connect(
  store => ({serial: store.serials.details}),
  dispatch => ({loadSerial: (id, season, episode) => dispatch(loadSerial(id, season, episode))})
)(Serial)
