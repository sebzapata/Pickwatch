import React from 'react';
import { shallow } from 'enzyme';
import { Card, CloseButton } from 'react-bootstrap';

import InfoCard from '@src/components/infoCard';

describe('Info card', () => {
  test('Renders correctly', () => {
    const callbackFn = jest.fn();
    const wrapper = shallow(
      <InfoCard callback={callbackFn} name="Michael Scott" email="michael@email.com" message="No, no, no" />
    );

    const closeButton = wrapper.find(CloseButton)
    closeButton.simulate('click');

    expect(callbackFn).toHaveBeenCalled();
    expect(wrapper.find('.headerWrapper').text()).toBe('Michael Scott');
    expect(wrapper.find(Card.Title).text()).toBe('michael@email.com');
    expect(wrapper.find(Card.Text).text()).toBe('No, no, no');
  });
});
