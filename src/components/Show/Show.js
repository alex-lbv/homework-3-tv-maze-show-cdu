import React from 'react';
import axios from 'axios';
import './Show.css';

const urlFilms = {
  house: 'http://api.tvmaze.com/shows/118',
  santaBarbara: 'http://api.tvmaze.com/shows/5909',
  bigBang: 'http://api.tvmaze.com/shows/66'
};

class Show extends React.Component {
  state = { showId: '', data: null };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ showId: this.props.showId });
      axios.get(urlFilms[this.props.showId])
        .then(res => this.setState({ data: res.data }));
    }
  }

  render() {

    if (this.state.data === null) {
      return <p className={'show-inforation t-show-info'}>Шоу не выбрано</p>;
    }

    return (
      <div className={'show'}>
        <img className={'show-image'} src={this.state.data.image.medium} alt={this.state.data.name} />
        <h2 className={'show-label t-show-name'}>{this.state.data.name}</h2>
        <p className={'show-text t-show-genre'}>
          <b>Жанр: </b>
          {this.state.data.genres.map((genre, i, genres) => {
            if (i + 1 === genres.length) {
              return genre;
            } else {
              return `${genre}, `;
            }
          })}
        </p>
        <p className={'show-text t-show-summary'} dangerouslySetInnerHTML={{__html: this.state.data.summary}}></p>
      </div>
    );
  }
}

export default Show;
