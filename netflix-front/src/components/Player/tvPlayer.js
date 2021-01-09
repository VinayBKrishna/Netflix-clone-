import React from "react";
import {connect} from "react-redux";
import {findTvShow} from "../../selectors/tvSelector";

import VideoPlayer from "react-video-js-player";

class player extends React.Component {
  render() {
    return (
      <div>
        {this.props.tvShow && (
          <div>
            {this.props.tvShow.videos.map((video) => {
              if (video.public_id == this.props.match.params.public_id) {
                return (
                  <div key={video.public_id}>
                    <VideoPlayer
                      controls={true}
                      autoplay={true}
                      src={video.url}
                      poster={this.props.tvShow.photos.url}
                      height={window.innerHeight}
                      width={window.innerWidth}
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    tvShow: findTvShow(state.tvShows, id),
  };
};

export default connect(mapStateToProps)(player);
