import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>{post.displayFirstLast}</li>
        )}

        {this.props.posts.map((post, i) =>
          <li key={i}>{post.school}</li>
        )}

        {this.props.posts.map((post, i) =>
          <li key={i}>{post.teamName}</li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
