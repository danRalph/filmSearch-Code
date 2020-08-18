import React from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import FilmCard from './FilmCard';

class FilmList extends React.Component {
    state = {
        filmsList: ['tt0780504'],
        searchTerm: ''
    };

    search = event => {
        event.preventDefault();
        axios
            .get(
                `https://www.omdbapi.com/?apikey=bbd575d6&s=${
                this.state.searchTerm
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ filmsList: [] });
                    return;
                }

                const filmsList = res.Search.map(film => film.imdbID);
                this.setState({
                    filmsList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const { filmsList } = this.state;

        return (
            <div>
                <Fade top>
                    <h1 className="h11">FILM, SERIES & GAME SEARCH</h1>
                
                <form onSubmit={this.search}>
                    <input
                        placeholder="Search for a film"
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        SEARCH
                    </button>
                    </form>
                </Fade>
                {filmsList.length > 0 ? (
                    filmsList.map(film => (
                        <FilmCard filmID={film} key={film} />
                    ))
                ) : (
                        <p className="err">
                            Couldn't find any film. Please search again using
                            another search criteria.
                        </p>
                    )}
            </div>
        );
    }
}


export default FilmList;