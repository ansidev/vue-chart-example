<template>
  <line-chart v-bind="chart" ref="lineChart" @wheel-up="onWheelUp" @wheel-down="onWheelDown" />
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

export default {
  name: 'custom-chart',
  components: {
    LineChart
  },
  data () {
    return {
      length: 35,
      leftYAxisMaxValue: 3500,
      rightYAxisMaxValue: 6.0,
      selectedValues: [1, 2, 3],
      isCtrlPressed: false,
      leftStep: 100,
      rightStep: 0.5
    }
  },
  computed: {
    labels () {
      return random.label(this.length, 'Label')
    },
    datasets () {
      return [{
        label: 'A',
        yAxisID: 'left-y-axis',
        borderColor: 'orange',
        fill: false,
        data: random.array(this.length, 550, 2000),
        lineTension: 0
      }, {
        label: 'B',
        yAxisID: 'right-y-axis',
        borderColor: 'green',
        fill: false,
        data: random.array(this.length, 1, 4),
        lineTension: 0
      }, {
        type: 'bar',
        label: 'C',
        backgroundColor: 'blue',
        data: random.array(this.length, 0, 500),
        borderWidth: 2
      }]
    },
    options () {
      return {
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
              max: this.leftYAxisMaxValue
            }
          }, {
            id: 'right-y-axis',
            type: 'linear',
            position: 'right',
            ticks: {
              beginAtZero: true,
              max: this.rightYAxisMaxValue,
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
    },
    chart () {
      return {
        width: 500,
        height: 200,
        labels: this.labels,
        datasets: this.datasets,
        options: this.options
      }
    }
  },
  mounted () {
    document.addEventListener('keydown', this.onKeyEvent)
    document.addEventListener('keyup', this.onKeyEvent)
  },
  methods: {
    onKeyEvent (e) {
      this.isCtrlPressed = e.ctrlKey
    },
    onWheelUp (e) {
      if (this.isCtrlPressed) {
        console.log('ctrl-wheel-up')
        this.rightYAxisMaxValue += this.rightStep
      } else {
        console.log('wheel-up')
        this.leftYAxisMaxValue += this.leftStep
      }
    },
    onWheelDown (e) {
      if (this.isCtrlPressed) {
        console.log('ctrl-wheel-down')
        const v1 = this.rightYAxisMaxValue - this.rightStep
        this.rightYAxisMaxValue = v1 < 0 ? 0 : v1
      } else {
        console.log('wheel-down')
        const v1 = this.leftYAxisMaxValue - this.leftStep
        this.leftYAxisMaxValue = v1 < 0 ? 0 : v1
      }
    }
  }
}
</script>
