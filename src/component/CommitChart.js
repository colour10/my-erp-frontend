import {
  Pie
} from 'vue-chartjs'

export default {
  extends: Pie,
  props:{
    chartData:{}
  },
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      }
    })
  },
  watch: {
        chartData: {
            handler: function(newValue, oldValue) {
                this.renderChart(newValue, {
                  responsive: true,
                  maintainAspectRatio: false,
                  legend: {
                    display: false
                  }
                })
            },
            deep: true
        }
    },
}