import Vue from 'vue';
import App from './App.vue';
import likeNuber from './componets/likeNuber.vue';

Vue.config.productionTip = false

Vue.component("likeNuber", likeNuber);

new Vue({
  render: h => h(App),
}).$mount('#app')
