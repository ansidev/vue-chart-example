<template>
  <div>
    <line-chart v-bind="chart" />
  </div>
</template>

<script>
import numeral from 'numeral'
import random from '@/utils/random'
import LineChart from '../charts/LineChart'

numeral.register('locale', 'de', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return '.'
  },
  currency: {
    symbol: '€'
  }
})
numeral.locale('de')

const length = 35
const leftYAxisMaxValue = 3500
const rightYAxisMaxValue = 6.0

const labels = random.label(length, 'Label')

const datasets = [{
  label: 'A',
  yAxisID: 'left-y-axis',
  borderColor: 'orange',
  fill: false,
  data: random.array(length, 550, 2000),
  lineTension: 0
}, {
  label: 'B',
  yAxisID: 'right-y-axis',
  borderColor: 'green',
  fill: false,
  data: random.array(length, 1, 4),
  lineTension: 0
}, {
  type: 'bar',
  label: 'C',
  backgroundColor: 'blue',
  data: random.array(length, 0, 500),
  borderWidth: 2
}]

const options = {
  legend: {
    position: 'bottom'
  },
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: false,
        maxRotation: 90,
        minRotation: 90
      }
    }],
    yAxes: [{
      id: 'left-y-axis',
      type: 'linear',
      position: 'left',
      ticks: {
        beginAtZero: true,
        callback: value => numeral(value).format('$0,0'),
        max: leftYAxisMaxValue
      }
    }, {
      id: 'right-y-axis',
      type: 'linear',
      position: 'right',
      ticks: {
        beginAtZero: true,
        max: rightYAxisMaxValue,
        stepSize: 0.5
      }
    }]
  },
  tooltips: {
    mode: 'index',
    position: 'nearest',
    callbacks: {
      label (tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label
        const value = numeral(tooltipItem.yLabel).format('$0,00')

        return `${label}: ${value}`
      }
    }
  }
}

export default {
  name: 'custom-chart',
  components: {
    LineChart
  },
  data () {
    return {
      selectedValues: [1, 2, 3]
    }
  },
  computed: {
    chart () {
      return {
        width: 500,
        height: 200,
        labels,
        datasets,
        options
      }
    }
  }
}
</script>
