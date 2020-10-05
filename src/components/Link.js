import React, { Component } from 'react'

class Link extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.link.title} ({this.props.link.address})
        </div>
      </div>
    )
  }
}

export default Link