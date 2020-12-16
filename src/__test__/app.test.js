import React from 'react';
import App from '../components/app';
import {shallow} from 'enzyme';

import '../setupTests';

describe('Test App Component', () => {
  it('Should smoke test the App Component', () => {
    shallow(<App dispatch={jest.fn} />)
  })
})