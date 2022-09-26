<template>
  <get-weather></get-weather>
</template>

<script>
import GetWeather from "@/components/GetWeather";

export default {
  name: 'App',
  components: {
      GetWeather,
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/style.scss";
</style>
