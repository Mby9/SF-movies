import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { deleteMovie } from "../../actions/movieActions"

class Movie extends Component {
  state = {
    showMovieInfo: false
  };

  onDeleteClick = id => {
    this.props.deleteMovie(id);
  };

  render() {
    const { title, release_year, locations,
      production_company, director, writer,
      actors, id } = this.props.movie;
    const { showMovieInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h4>
          {title}{' '}
          <i
            onClick={() =>
              this.setState({
                showMovieInfo: !this.state.showMovieInfo
              })
            }
            className="fas fa-sort-down"
            style={{ cursor: 'pointer' }}
          />
          <i
            className="fas fa-times"
            style={{ cursor: 'pointer', float: 'right', color: 'red' }}
            onClick={this.onDeleteClick.bind(this, id)}
          />
          <Link to={`movie/edit/${id}`}>
            <i
              className="fas fa-pencil-alt"
              style={{
                cursor: 'pointer',
                float: 'right',
                color: 'black',
                marginRight: '1rem'
              }}
            />
          </Link>
        </h4>
        {showMovieInfo ? (
          <div>
            <ul className="list-group col-md-6 float-left"  >
              <li className="list-group-item">Release Year: {release_year}</li>
              <li className="list-group-item">Production Company: {production_company}</li>
              <li className="list-group-item">Director: {director}</li>
              <li className="list-group-item">Writer: {writer}</li>
              <li className="list-group-item">Actors: {actors.join(", ")}</li>
            </ul>
            <div className="card card-body col-md-6 float-left">
            {locations.map((loc) => <button type="button" className="btn btn-light">{loc}</button>)}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired
};

export default connect(null, { deleteMovie })(Movie);
