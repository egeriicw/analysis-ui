// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import AdjustSpeed from '../adjust-speed'
import {mockFeed, mockModification} from '../../../utils/mock-data'

describe('Report > AdjustSpeed', () => {
  it('renders correctly', () => {
    const props = {
      feedsById: {'1': mockFeed},
      modification: mockModification
    }

    // mount component
    const tree = renderer.create(<AdjustSpeed {...props} />)
    expect(tree).toMatchSnapshot()
  })
})
