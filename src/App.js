import { Component } from 'react';
import './App.css';
import ToDoList from './containers/ToDoList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoEditForm from './components/ToDoEditForm';
import styled from 'styled-components';
import NotFound from './components/NotFound';
//import Login from './containers/Login'
import Navbar from './containers/Navbar';
import {  CurrentUserProvider} from './context/CurrentUser.context'

const Container = styled.div`
    background: #2b2e39;
    margin 0 auto;
    width 80%;
    max-width: 600px;
    padding: 14px;
    border-radius: 14px;
    margin-top: 14px;
`

class App extends Component {
  render() {
    return (
      <Router>
          <CurrentUserProvider>
        <Container>
            <Navbar />
          <Routes>
            <Route path='/' element={<ToDoList />} />
            <Route path='/todo_items/:itemId' element={<ToDoEditForm />} />
            {/* <Route path='/login' component={Login} /> */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
        </CurrentUserProvider>
      </Router>
    );
  }
}

export default App;
