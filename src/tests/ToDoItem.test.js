import React from 'react';
import { shallow } from 'enzyme';
import ToDoItem from '../components/ToDoItem';
import { expect } from 'chai';

describe('<ToDoItem />', () => {
    it('renders text', () => {
        let text = 'Lorem ipsum';

        const wrapper = shallow(<ToDoItem id={1} text={text} />);

        expect(wrapper.find('div').text()).contain(text);
    })
})