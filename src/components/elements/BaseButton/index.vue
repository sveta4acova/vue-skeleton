<template>
  <div>
    <button :class="rootClass" @click="click">Hello World Button!</button>
    <input type="text" v-model="user">
    <p class="user">User: {{ user }}</p>
  </div>
</template>

<script>
  import './style.sass';

  export default {
    props: {
      modificators: String || Array,
    },
    data () {
      return {
        user: '',
      };
    },
    computed: {
      rootClass () {
        return 'button';
      }
    },
    methods: {
      click () {
        alert('Click');
      }
    }
  };
</script>

<!--<style lang="sass" scoped>-->
<!--  button-->
<!--    padding: 40px-->
<!--</style>-->
