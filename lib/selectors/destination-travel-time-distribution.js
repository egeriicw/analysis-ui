// @flow
import {toLeaflet} from '@conveyal/lonlat'
import {Map as LeafletMap} from 'leaflet'
import {createSelector} from 'reselect'

import type {LonLat, Quintiles} from '../types'

/**
 * Extract the distribution of travel times to a destination
 */
export default createSelector(
  state => state.analysis.destination,
  state => state.analysis.travelTimeSurface,
  createDestinationTravelTimeDistribution
)

// exported for comparisonTravelTimeDistribution selector
export function createDestinationTravelTimeDistribution (
  destination: ?LonLat,
  travelTimeSurface: ?any
): ?Quintiles {
  if (destination == null || travelTimeSurface == null) return null

  let {x, y} = LeafletMap.prototype.project(
    toLeaflet(destination),
    travelTimeSurface.zoom
  )
  // floor them to get top left of cell the point is a part of (TODO correct?)
  x = Math.floor(x - travelTimeSurface.west)
  y = Math.floor(y - travelTimeSurface.north)

  return {
    low: travelTimeSurface.get(x, y, 0),
    iqrLow: travelTimeSurface.get(x, y, 1),
    med: travelTimeSurface.get(x, y, 2),
    iqrHigh: travelTimeSurface.get(x, y, 3),
    high: travelTimeSurface.get(x, y, 4)
  }
}
