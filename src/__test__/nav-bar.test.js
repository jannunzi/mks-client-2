import React from 'react';
import NavBar from '../components/nav-bar';
import {shallow, mount} from 'enzyme';
import '../setupTests';



describe( 'Test NavBar Component', () => {
    it('Should smoke test the NavBar component', () => {
        shallow(<NavBar />)
    })
    it ('Should test dashboard nav bar button click', () => {
        const wrapper = shallow(<NavBar onClick={jest.fn} />);

        expect(wrapper.findWhere(n => n.text() ==='dashboardButton'&& n.onClick.toHaveBeenCalled()));

    })
    it ('Should test device status nav bar button click', () => {
        const wrapper = shallow(<NavBar onClick={jest.fn} />);

        expect(wrapper.findWhere(n => n.text() ==='deviceStatusButton'&& n.onClick.toHaveBeenCalled()));

    })
    it ('Should test device config nav bar button click', () => {
        const wrapper = shallow(<NavBar onClick={jest.fn} />);

        expect(wrapper.findWhere(n => n.text() ==='deviceConfigButton'&& n.onClick.toHaveBeenCalled()));

    })
    it ('Should test scope control nav bar button click', () => {
        const wrapper = shallow(<NavBar onClick={jest.fn} />);

        expect(wrapper.findWhere(n => n.text() ==='scopeControlButton'&& n.onClick.toHaveBeenCalled()));

    })
    it ('Should test firmware download nav bar button click', () => {
        const wrapper = shallow(<NavBar onClick={jest.fn} />);

        expect(wrapper.findWhere(n => n.text() ==='firmwareDownloadButton'&& n.onClick.toHaveBeenCalled()));

    })
})