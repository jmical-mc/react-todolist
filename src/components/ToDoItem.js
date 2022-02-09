import { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = styled.div`
    background: #343744;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 7px;
    color: ${props => props.done ? '#1fd84d' : 'auto'};
    text-decoration: ${props => props.done ? 'line-through' : 'auto'};
`

const StyledLink = styled(Link)`
    color: palevioletred;
    text-decoration: none;
    margin-left: 5px;

    &:hover {
       color: #fff; 
    }
`

class ToDoItem extends Component {
    componentWillUnmount = () => {
        console.log(`todo ${this.props.text} unmounted...`)
    }

    static defaultProps = {
        done: false
    }

    state = {
        done: this.props.done
    }

    toggleDone = () => {
        this.setState({ done: !this.state.done });
    }

    destroy = () => this.props.destroy(this.props.id);

    render() {
        const { id, done, text } = this.props;
        return (
            <Item done={done} key={id}>
                <div onClick={this.toggleDone}>{text}</div>
                <button onClick={this.destroy}>[x]</button>
                <StyledLink to={`/todo_items/${id}`} >Edit</StyledLink>
            </Item>
        )
    }
}

export default ToDoItem;