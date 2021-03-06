// @flow
import React, {PureComponent} from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import * as actions from '../actions'
import * as select from '../selectors'

import type {ReactSelectResult} from '../../../types'
import type {OpportunityDataset} from '../types'

export class OpportunityDatasetSelector extends PureComponent {
  props: {
    activeOpportunityDataset?: OpportunityDataset,
    opportunityDatasets: OpportunityDataset[],

    loadOpportunityDataset: (dataset: OpportunityDataset) => void,
    loadOpportunityDatasets: () => void,
    setActiveOpportunityDataset: (_id?: string) => void
  }

  componentDidMount () {
    this.props.loadOpportunityDatasets()
  }

  _selectOpportunityDataset = (option: ReactSelectResult) => {
    if (!option) return this.props.setActiveOpportunityDataset()

    const dataset = this.props.opportunityDatasets.find(d => d._id === option.value)
    if (dataset) {
      this.props.loadOpportunityDataset(dataset)
    }
  }

  render () {
    const {activeOpportunityDataset, opportunityDatasets} = this.props
    return <Select
      options={opportunityDatasets.map(d => ({
        label: `${d.sourceName}: ${d.name}`,
        value: d._id
      }))}
      onChange={this._selectOpportunityDataset}
      value={activeOpportunityDataset && activeOpportunityDataset._id}
    />
  }
}

export default connect(createStructuredSelector(select), actions)(OpportunityDatasetSelector)
