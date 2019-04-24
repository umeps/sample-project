var vm = new Vue({
  el: '#Vue', 
  data: {
    list: []
  },
  mounted() {
    axios
      .get('https://api.reiwa-system.tokyo/products')
      .then(response => {
          this.list = response.data
      })
  },

    filters: {
        moment: function (date) {
            return moment(date).format('YYYY/MM/DD HH:mm');
        }
    }

});