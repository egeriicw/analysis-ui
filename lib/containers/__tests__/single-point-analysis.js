// @flow
import React from 'react'

import Analysis from '../single-point-analysis'
import {mockWithProvider} from '../../utils/mock-data'

describe('Containers > Single Point', function () {
  it('should render correctly', function () {
    const {snapshot} = mockWithProvider(<Analysis />)
    expect(snapshot()).toMatchSnapshot()
  })
})
