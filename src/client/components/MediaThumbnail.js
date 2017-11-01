import React from 'react';

export default class MediaThumbnail extends React.Component {
  render () {
    let { serial } = this.props;
    return (
      <div className="col-2">
        <div className="card">
          <img className="card-img-top" src={serial.image} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{serial.name}</h5>
            <p className="card-text"></p>
            <a href="#" className="btn btn-primary" onClick={this.props.view.bind(this, serial.id)}>View</a>
          </div>
        </div>
      </div>
    );
  }
}
