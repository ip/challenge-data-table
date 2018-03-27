const React = require('react')
const ReactPivot = require('react-pivot')

const rows = require('./data.json')

module.exports = () =>
  <ReactPivot {...{ rows, dimensions, reduce, calculations }} />

const dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' }
]

const calculations = [
  { title: 'Impressions', value: 'impressions' },
  { title: 'Loads', value: 'loads' },
  { title: 'Displays', value: 'displays' },
  {
    title: 'Load Rate',
    value: row => `${(row.loads / row.impressions * 100).toFixed(1)}%`
  },
  {
    title: 'Display Rate',
    value: row => `${(row.displays / row.loads * 100).toFixed(1)}%`
  }
]

function reduce (row, accumulator) {
  const acc = accumulator

  ;['impressions', 'loads', 'displays'].forEach(type => {
    acc[type] = acc[type] || 0
  })

  ;['impression', 'load', 'display'].forEach(type => {
    if (row.type === type) {
      acc[`${type}s`]++
    }
  })

  return acc
}
