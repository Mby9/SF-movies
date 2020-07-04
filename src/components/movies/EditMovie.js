import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMovie, updateMovie } from "../../actions/movieActions";

class EditMovie extends Component {
  state = {
    title: "",
    release_year: "",
    locations: "",
    production_company: "",
    director: "",
    writer: "",
    actor_1: "",
    actor_2: "",
    actor_3: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.movie;
    this.setState({
      name,
      phone,
      email
    })
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMovie(id)
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, release_year, locations,
      production_company, director, writer,
      actor_1, actor_2, actor_3 } = this.state;

    // Check For Errors
    if (title === '') {
      this.setState({ errors: { title: 'Title is required' } });
      return;
    }

    if (release_year === '') {
      this.setState({ errors: { release_year: 'Release Year is required' } });
      return;
    }

    if (locations === '') {
      this.setState({ errors: { locations: 'Location is required' } });
      return;
    }

    const { id } = this.props.match.params;

    const updMovie = {
      id,
      title, release_year, locations,
      production_company, director, writer,
      actor_1, actor_2, actor_3
    };

    this.props.updateMovie(updMovie);

    // Clear State
    this.setState({
      title: "",
      release_year: "",
      locations: "",
      production_company: "",
      director: "",
      writer: "",
      actor_1: "",
      actor_2: "",
      actor_3: "",
      errors: {}
    });

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title, release_year, locations,
      production_company, director, writer,
      actor_1, actor_2, actor_3, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Movie</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
                label="Title"
                name="title"
                placeholder="Enter Title"
                value={title}
                onChange={this.onChange}
                error={errors.title}
              />
              <TextInputGroup
                label="Release Year"
                name="release_year"
                type="release_year"
                placeholder="Enter Release Year"
                value={release_year}
                onChange={this.onChange}
                error={errors.release_year}
              />
              <TextInputGroup
                label="Location"
                name="locations"
                placeholder="Enter Location"
                value={locations}
                onChange={this.onChange}
                error={errors.locations}
              />
              <TextInputGroup
                label="Production Company"
                name="production_company"
                placeholder="Production Company"
                value={production_company}
                onChange={this.onChange}
                error={errors.production_company}
              />
              <TextInputGroup
                label="Director"
                name="director"
                placeholder="Enter Director"
                value={director}
                onChange={this.onChange}
                error={errors.director}
              />
              <TextInputGroup
                label="Writer"
                name="writer"
                placeholder="Enter Writer"
                value={writer}
                onChange={this.onChange}
                error={errors.writer}
              />
              <TextInputGroup
                label="Actor 1"
                name="actor_1"
                placeholder="Enter Actor 1"
                value={actor_1}
                onChange={this.onChange}
                error={errors.actor_1}
              />
              <TextInputGroup
                label="Actor 2"
                name="actor_2"
                placeholder="Enter Actor 2"
                value={actor_2}
                onChange={this.onChange}
                error={errors.actor_2}
              />
              <TextInputGroup
                label="Actor 3"
                name="actor_3"
                placeholder="Enter Actor 3"
                value={actor_3}
                onChange={this.onChange}
                error={errors.actor_3}
              />
            <input
              type="submit"
              value="Update Movie"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditMovie.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovie: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  movie: state.movie.movie
});

export default connect(mapStateToProps, { getMovie, updateMovie })(EditMovie);
