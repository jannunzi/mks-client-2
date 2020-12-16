import React from 'react';
import ConfigurationPage from '../components/configuration-page';
import {shallow, mount} from 'enzyme';
import '../setupTests';
import { Form } from 'react-bootstrap';



describe( 'Test ConfigurationPage Component', () => {
    it('Should smoke test the ConfigurationPage component', () => {
        shallow(<ConfigurationPage dispatch={jest.fn}/>)
    })
    it("Should render Product Configs", () => {
  
        const wrapper = shallow(<ConfigurationPage dispatch={jest.fn} />)

        expect(wrapper.findWhere(n => n.type() === <Form/> && n.contains('schema')))
        // expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Generator Model')))
        // expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Generator Serial')))
        // expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Hostname')))
        // expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Firmware Version')))
        // expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Checksum')))
        // expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Uptime')))
    })
})