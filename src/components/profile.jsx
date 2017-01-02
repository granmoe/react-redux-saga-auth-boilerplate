import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getUsername, getUserPictureUrl } from 'selectors/auth'

class Profile extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    pictureUrl: PropTypes.string
  }

  render () {
    const { username, pictureUrl } = this.props

    return (
      <div>
        <h3>{ username }</h3>
        <img src={ pictureUrl } />
      </div>
    )
  }
}

export default connect(state => ({
  username: getUsername(state),
  pictureUrl: getUserPictureUrl(state)
}))(Profile)
