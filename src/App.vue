<template>
  <div class="box">
    <h2 class="title is-5">Chart</h2>
    <custom-chart></custom-chart>
  </div>
</template>

<script>
import CustomChart from './components/business-charts/CustomChart'

export default {
  name: 'app',
  components: {
    CustomChart
  }
}
</script>
