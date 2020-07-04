import React, { Component } from 'react';
import { connect } from "react-redux";

import { getMovies } from '../../actions/movieActions';
import "../../AutoCompleteText.css";

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: "",
            movies: []
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const { movies } = nextProps;
        this.setState({
            movies: [...movies]
        })
    }

    componentDidMount() {
        this.props.getMovies();
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        const { movies } = this.state;
        let suggestions = [];
        if (movies && value.length > 0) {
            suggestions = movies.filter(v => v.title.toLowerCase().includes(value.toLowerCase()));
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionsSelected(value) {
        this.setState(() => ({
            text: value,
            suggestions: []
        }))
    }

    render() {
        const { suggestions, text } = this.state;
        return (
            <div>

                <input value={text} onChange={this.onTextChanged} type="text" />

                {suggestions.length === 0
                    ? null
                    : <ul>{suggestions.map(item =>
                        <li onClick={() => this.suggestionsSelected()}>{item.title}</li>)}
                    </ul>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        movies: state.movie.movies
    })
};

export default connect(mapStateToProps, { getMovies })(AutoComplete);
