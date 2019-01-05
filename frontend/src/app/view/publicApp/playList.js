import React, { Component } from "react";
import PropType from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YouTube from "react-youtube";
import className from "classnames";
import "./playList.css";

const videoTitleClass = "col";
const videoDurationClass = "col-2 text-center";
const videoPlayClass = "col-2 text-center";

const DATAs = [
  ["Good Neighbor: what & why", "1:22", "CkHOh7GKXpk"],
  ["login/signup: single entry point", "1:35", "gUSjHwJ7uN4"],
  ["testing site: back door login", "1:35", "WTXBSnovQhs"],
  ["networking", "1:15", "Zc4sCEe7TRs"],
  ["post, request, approve, return", "5:00", "KuGMl_EW55A"]
];

class Video {
  constructor(title, duration, id) {
    Object.assign(this, { title, duration, id });
  }
}

class PlayList extends Component {
  state = {
    curVideo: PlayList.VIDEOS[0],
    player: null,
    isPlayerPlaying: false
  };

  static get VIDEOS() {
    return DATAs.map(data => new Video(...data));
  }

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
    const { curVideo, isPlayerPlaying } = this.state;

    const rows = PlayList.VIDEOS.map(video => (
      <PlayListRow
        key={video.id}
        video={video}
        isPlaying={video.id === curVideo.id && isPlayerPlaying}
        onToogleVideoCb={this.onToogleVideoCb}
      />
    ));

    return (
      <div className="videoPlayList">
        <div className="videoList">
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
        <div className="youtube-player">
          <div className="player-wrapper">
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
    );
  }
}

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
            "btn-sm": true,
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

export { PlayList };
