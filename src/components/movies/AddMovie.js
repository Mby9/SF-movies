import React, { Component } from 'react';
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { addMovie } from "../../actions/movieActions";
import TextInputGroup from '../layout/TextInputGroup';

class AddMovie extends Component {

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

    const newMovie = {
      id: uuid(),
      release_year,
      locations,
      production_company,
      director,
      writer,
      actor_1,
      actor_2,
      actor_3
    };

    this.props.addMovie(newMovie);

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
        <div className="card-header">Add Movie</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="col-md-12">
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

            </div>
            <input
              type="submit"
              value="Add Movie"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { addMovie })(AddMovie);
