import React from 'react';
import DeviceStatus from '../components/device-status';
import {shallow, mount} from 'enzyme';
import '../setupTests';



describe( 'Test DeviceStatus Component', () => {
    it('Should smoke test the DeviceStatus component', () => {
        shallow(<DeviceStatus dispatch={jest.fn}/>)
    })
    it("Should render table", () => {
  
        const wrapper = shallow(<DeviceStatus dispatch={jest.fn} />)

        expect(wrapper.findWhere(n => n.type() === 'div' && n.hasClass('device-status-table')))
        expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Generator Model')))
        expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Generator Serial')))
        expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Hostname')))
        expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Firmware Version')))
        expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Checksum')))
        expect(wrapper.findWhere(n => n.type() ==='th' && n.contains('Uptime')))
    })
})