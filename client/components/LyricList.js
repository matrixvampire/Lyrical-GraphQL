import React, { Component } from "react";
import { graphql } from "react-apollo";
import { LikeLyric } from "../queries/queries";

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typeName: "Mutation",
        likeLyric: {
          id,
          __typeName: "LyricType",
          likes: likes + 1
        }
      }
    });
  }
  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }
  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

export default graphql(LikeLyric)(LyricList);
