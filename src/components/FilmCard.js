import React from 'react';
import axios from 'axios';
import Flip from 'react-reveal/Flip';
import Bounce from 'react-reveal/Bounce';



class FilmCard extends React.Component {
    state = {
        filmData: {}
    };

    componentDidMount() {
        axios
            .get(
                `https://www.omdbapi.com/?apikey=bbd575d6&i=${
                this.props.filmID
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ filmData: res });
            });
    }

    render() {
        const {
            Title,
            Released,
            Genre,
            Plot,
            Poster,
            Actors,
            Rated,
            Awards,
            BoxOffice,
            Country,
            imdbRating
        } = this.state.filmData;

        if (!Poster || Poster === 'N/A') {
            return null;
        }

        return (
            <Flip top duration={1500}>
                <div className="filmContainer">

                    <div className="imgContainer">
                        
                    <div
                        className="backImage"
                        style={{ backgroundImage: `url(${Poster})` }}
                            />
                            
                        </div>
                    <Bounce bottom delay={300}>   
                <div className="filmInfo">
                    <h2>Film Details</h2>
                        <div>
                           
                                <h1>{Title}</h1>
                            
                        <small>Released Date: {Released}</small>
                        </div>
                      
                            <h4>Rated: {Rated}</h4>
                       
                    <p>Starring: {Actors}</p>
                            <p>Awards: {Awards}</p>
                            <p>Box office: {BoxOffice}</p>
                            <p>Country: {Country}</p>
                            <h4>IMDb score: {imdbRating} / 10</h4>
                        
                    <p>{Plot && Plot.substr(0, 350)}</p>
                    <div className="tagsCont">
                        {Genre && Genre.split(', ').map(g => <span>{g}</span>)}
                            </div>

                        </div>
                    </Bounce>
                </div>
                </Flip>
        );
    }
}




export default FilmCard;