import { GET_MOVIES, DELETE_MOVIE, ADD_MOVIE, GET_MOVIE, UPDATE_MOVIE } from "./types";
import axios from "axios";
import { v4 as uuid } from "uuid";

export const getMovies = () => async dispatch => {
    const res = await axios.get("https://data.sfgov.org/resource/yitu-d5am.json");
    const formatted = {};

    res.data.forEach(element => {
        if (formatted[element.title]) {
            const locations = formatted[element.title].locations
            if (locations.indexOf(element.locations) === -1) {
                formatted[element.title].locations.push(element.locations)
            }
        } else {
            formatted[element.title] = {
                ...element,
                id: uuid(),
                locations: [element.locations],
                actors: [element.actor_1, element.actor_2, element.actor_3]
            };
        }
    });

    console.log(formatted);

    res.data.map(movie => ({
        ...movie,
        id: uuid()
    }))
    dispatch({
        type: GET_MOVIES,
        payload: Object.values(formatted)
    });
}

export const getMovie = id => async dispatch => {
    const res = await axios.get(`https://data.sfgov.org/resource/yitu-d5am.json/${id}`);
    dispatch({
        type: GET_MOVIE,
        payload: res.data
    });
}

export const updateMovie = movie => async dispatch => {
    const res = await axios.put(`https://data.sfgov.org/resource/yitu-d5am.json/${movie.id}`, movie);
    dispatch({
        type: UPDATE_MOVIE,
        payload: res.data
    });
}


export const addMovie = movie => async dispatch => {
    const res = await axios.post
        ("https://data.sfgov.org/resource/yitu-d5am.json", movie);
    dispatch({
        type: ADD_MOVIE,
        payload: res.data
    });
}

export const deleteMovie = id => async dispatch => {
    try {
        await axios.delete(`https://data.sfgov.org/resource/yitu-d5am.json/${id}`);
        dispatch({
            type: DELETE_MOVIE,
            payload: id
        });
    } catch (e) {
        dispatch({
            type: DELETE_MOVIE,
            payload: id
        });
    }
}