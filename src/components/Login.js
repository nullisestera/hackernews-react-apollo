import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $password: String!) {
    createUser(input: {username: $username, password: $password})
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(input: {username: $username, password: $password})
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    username: '',
    password: '',
  }

  render() {
    const { login, username, password } = this.state
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
            <input
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
              type="text"
              placeholder="Your username"
            />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
        <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ username, password }}
            onCompleted={data => this._confirm(data)}
        >
            {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
            </div>
            )}
        </Mutation>  
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async (data, error) => {

    try {
        if (data) {
            const {login} = data
            this._saveUserData(login)
            this.props.history.push(`/`)
        }
    } catch (error) {
        this.props.history.push(`/login`)
        // console.log(error)
    }
    
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login