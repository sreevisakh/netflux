import React from 'react';
import MediaThumbnail from 'components/MediaThumbnail'
import { connect } from 'react-redux';
import { loadSerials } from 'actions/serials';

@connect(
  store => ({ serials: store.serials.list }),
  dispatch => ({loadSerials: () => dispatch(loadSerials())})
)
export default class Serials extends React.Component {
  componentDidMount () {
    this.props.loadSerials()
  }
  view = (id, e) => {
    e.preventDefault()
    this.props.history.push(`/view/${id}`)
  }
  render () {
    return (
      <div className="container container-fluid">
        <div className="row">
          {
            this.props.serials.map((serial, index) => (
              <MediaThumbnail key={index} serial={serial} view={this.view}/>
            ))
          }
        </div>
      </div>
    );
  }
}
