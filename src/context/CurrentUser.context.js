import React, { Component } from 'react'

const CurrentUserContext = React.createContext()

export class CurrentUserProvider extends Component {
  state = {
    user: {name: 'Jakub Mical'},
    processing: false
  }

  getUser = () => {    
      this.setState({id: 1, name: 'Jakub Mical', processing: false, redirecting: true})    
  }

  login = () => {
    this.setState({processing: true})
 
    this.getUser()     
  }

  logout = () => this.setState({user: null})

  render() {
    const { children } = this.props;

    return (
      <CurrentUserContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          user: this.state.user
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    );
  }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer