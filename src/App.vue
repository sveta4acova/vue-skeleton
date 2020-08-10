<template lang="pug">
  layout-page
    template(v-slot:header)
      v-header(:isAuthenticated="!!$store.state.session.token")
    template(v-slot:main)
      router-view
</template>

<script>
  import { Header, LayoutPage } from '@components';
  import '@config/styles/normalize.css';
  import '@config/styles/app.sass';

  export default {
    components: {
      'v-header': Header,
      'layout-page': LayoutPage,
    }
  };
</script>
