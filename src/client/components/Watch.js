import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { download } from '../actions/serials'

class Watch extends Component {
  componentWillMount () {
    let {serial, season, episode} = this.props.match.params
    this.props.download(serial, season, episode)
  }
  onEnded = () => {
    let { next } = this.props.data;
    this.props.history.push(`/watch/${next.id}/${next.season}/${next.episode}`)
  }
  render () {
    let { link } = this.props.data
    return (
      <div style={{background: '#000'}}>
        <video autoPlay={true}
          controls={true} style={{'height': '85vh'}} src={link}
          onEnded={this.onEnded}
        />
      </div>
    )
  }
}

Watch.propTypes = {}

export default connect(
  store => ({ data: store.serials.data }),
  dispatch => ({ download: (serial, season, episode) => dispatch(download(serial, season, episode)) })
)(Watch)
