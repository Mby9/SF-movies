import React, { Component } from 'react';
import Movie from './Movie';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { getMovies } from '../../actions/movieActions';
import AutoComplete from '../layout/AutoComplete';

class Movies extends Component {

  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    const { movies } = this.props;
    return (
      <React.Fragment>
        <div className="component">
          <div className="col-lg-12 App-Component AutoCompleteText">
            <AutoComplete />
          </div>
        </div>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Movie</span> List
        </h1>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </React.Fragment>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
  getMovies: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return ({
    movies: state.movie.movies
  })
};

export default connect(mapStateToProps, { getMovies })(Movies);
