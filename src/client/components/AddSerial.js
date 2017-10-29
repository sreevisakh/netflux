import React from 'react';
import { connect } from 'react-redux';
import { search, add } from 'actions/serials';

@connect(
  store => ({ results: store.serials.results }),
  dispatch => ({
    search: (query) => dispatch(search(query)),
    add: (id) => dispatch(add(id))
  })
)

export default class AddSerial extends React.Component {
  search = (e) => {
    e.preventDefault()
    this.props.search(this.refs.searchInput.value);
  }
  render () {
    let results = <table className="table">
      <thead>
        <tr>
          <th>Serial</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          this.props.results.map((result, index) => (
            <tr key={index}>
              <td>{result.label}</td>
              <td><button type="button" onClick={this.props.add.bind(this, result.seo_url)} className="btn btn-primary">Add</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>

    return (
      <div className="card col mb-5">
        <div className="card-block">
          <form>
            <div className="form-group row">
              <div className="col"><legend>Add Serial </legend></div>
            </div>
           
            <div className="form-group row">
              <label htmlFor="inputEmail3" className="col-sm-2 form-control-label">Serial Name</label>
              <div className="col-sm-10">
                <input type="text" ref="searchInput" className="form-control" id="inputEmail3"
                  placeholder="Enter Serial Name" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-secondary" onClick={this.search}>Search</button>
              </div>
            </div>
          </form>
        </div>
        {
          this.props.results.length ? results : null
        }

      </div>
     
    );
  }
}
