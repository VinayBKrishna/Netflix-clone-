import React from "react";
import {connect} from "react-redux";
import {findMovie} from "../../selectors/movieSelector";

import VideoPlayer from "react-video-js-player";

class Player extends React.Component {
  onPlayerReady = (player) => {
    console.log("Player is ready: ", player);
  };

  onVideoPlay = (duration) => {
    console.log("Video played at: ", duration);
  };

  onVideoPause = (duration) => {
    console.log("Video paused at: ", duration);
  };

  onVideoTimeUpdate = (duration) => {
    console.log("Time updated: ", duration);
  };

  onVideoSeeking = (duration) => {
    console.log("Video seeking: ", duration);
  };

  onVideoSeeked = (from, to) => {
    console.log(`Video seeked from ${from} to ${to}`);
  };

  onVideoEnd = () => {
    console.log("Video ended");

    setTimeout(() => {
      this.props.history.push("/movies");
    }, 5000);
  };
  render() {
    console.log("this.props", this.props);
    return (
      <div>
        {this.props.movie && (
          <div>
            <VideoPlayer
              controls={true}
              autoplay={true}
              src={this.props.movie.videos.url}
              poster={this.props.movie.photos.url}
              height={window.innerHeight}
              width={window.innerWidth}
              // onReady={this.onPlayerReady}
              // onPlay={this.onVideoPlay}
              // onPause={this.onVideoPause}
              // onTimeUpdate={this.onVideoTimeUpdate}
              // onSeeking={this.onVideoSeeking}
              // onSeeked={this.onVideoSeeked}
              // onEnd={this.onVideoEnd}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    movie: findMovie(state.movies, id),
  };
};

export default connect(mapStateToProps)(Player);
