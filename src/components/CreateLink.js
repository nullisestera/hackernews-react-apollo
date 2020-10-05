import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
mutation PostMutation($title: String!, $address: String!) {
  createLink(input: {title: $title, address: $address}) {
    user{
      name
    }
  }
}
`
class CreateLink extends Component {
  state = {
    title: '',
    address: '',
  }

  render() {
    const { title, address } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
            type="text"
            placeholder="A title for the link"
          />
          <input
            className="mb2"
            value={address}
            onChange={e => this.setState({ address: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation 
            mutation={POST_MUTATION} 
            variables={{ title, address }}
            onCompleted={() => this.props.history.push('/')}
        >
            {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateLink