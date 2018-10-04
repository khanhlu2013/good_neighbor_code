import React, { Component } from "react";
import PropType from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YouTube from "react-youtube";
import className from "classnames";
import "./appPublic.css";

class Video {
  constructor(title, duration, id) {
    Object.assign(this, { title, duration, id });
  }
}

function PublicApp(props) {
  const data = [
    ["Good Neighbor: what & why", "1:22", "CkHOh7GKXpk"],
    ["login / sign up: single entry point", "1:35", "gUSjHwJ7uN4"],
    ["testing site: back door login", "1:35", "WTXBSnovQhs"],
    ["networking", "1:15", "Zc4sCEe7TRs"],
    ["post, request, approve, return", "5:00", "KuGMl_EW55A"]
  ];
  const videos = data.map(data => new Video(...data));
  return <div id="publicApp-react">{<PlayList videos={videos} />}</div>;
}

const videoTitleClass = "col";
const videoDurationClass = "col-2 text-center";
const videoPlayClass = "col-2 text-center";

class PlayList extends Component {
  state = {
    curVideo: this.props.videos[0],
    player: null,
    isPlayerPlaying: false
  };

  onToogleVideoCb = video => {
    const { player } = this.state;

    if (player === null) return;

    if (video.id === this.state.curVideo.id) {
      if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      return;
    }

    this.setState({ curVideo: video });
    setTimeout(() => {
      this.state.player.playVideo();
    }, 0);
  };

  onPlayerLoaded = event => {
    this.setState({ player: event.target });
  };

  onPlayerStateChange = event => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.setState({ isPlayerPlaying: true });
    } else {
      this.setState({ isPlayerPlaying: false });
    }
  };

  render() {
    const { videos } = this.props;
    const { curVideo, isPlayerPlaying } = this.state;

    const rows = videos.map(video => (
      <PlayListRow
        key={video.id}
        video={video}
        isPlaying={video.id === curVideo.id && isPlayerPlaying}
        onToogleVideoCb={this.onToogleVideoCb}
      />
    ));

    return (
      <div className="app">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <table className="table table-sm table-striped table-bordered">
                <thead className="thead-light">
                  <tr className="d-flex">
                    <th scope="col" className={videoTitleClass}>
                      manual videos
                    </th>
                    <th scope="col" className={videoDurationClass}>
                      <FontAwesomeIcon icon="clock" />
                    </th>
                    <th scope="col" className={videoPlayClass}>
                      play
                    </th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
            <div className="col-7">
              <div className="videoWrapper">
                <YouTube
                  videoId={this.state.curVideo.id}
                  opts={{
                    // height: "400",
                    // width: "640",
                    playerVars: {
                      // https://developers.google.com/youtube/player_parameters
                      autoplay: 0,
                      rel: 0
                    }
                  }}
                  onReady={this.onPlayerLoaded}
                  onStateChange={this.onPlayerStateChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PlayList.propType = {
  videos: PropType.array.isRequired
};

function PlayListRow(props) {
  const { video, isPlaying, onToogleVideoCb } = props;

  const onPlayClick = e => onToogleVideoCb(video);
  return (
    <tr className="d-flex">
      <td className={videoTitleClass}>{video.title}</td>
      <td className={videoDurationClass}>{video.duration}</td>
      <td className={videoPlayClass}>
        <button
          onClick={onPlayClick}
          className={className({
            btn: true,
            "btn-warning": isPlaying,
            "btn-success": !isPlaying
          })}
        >
          {isPlaying ? (
            <FontAwesomeIcon icon="pause" />
          ) : (
            <FontAwesomeIcon icon="play" />
          )}
        </button>
      </td>
    </tr>
  );
}

PlayListRow.propType = {
  video: PropType.object.isRequired,
  isPlaying: PropType.bool.isRequired,
  onToogleVideoCb: PropType.func.isRequired
};

export { PublicApp };
