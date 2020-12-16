import React from 'react';
import FirmwareDownload from '../components/firmware-download';
import {shallow, mount} from 'enzyme';
import '../setupTests';



describe( 'Test FirmwareDownload Component', () => {
    it('Should smoke test the FirmwareDownload component', () => {
        shallow(<FirmwareDownload />)
    })
})