<template>
  <div>
    <likeHeader></likeHeader>
    <p>{{ number /2}}</p>
    <likeNuber :number="number" v-on:my-click="number = $event"></likeNuber>
    <likeNuber :number="number"></likeNuber>
  </div>
</template>

<script>

import likeHeader from "./componets/likeHeader";

export default {
    data() {
      return {
        number:10
      }
    },
    components:{
      likeHeader
    }
}
</script>

<style scoped>
  .mt2{
    margin-top:2rem;
  }
</style>