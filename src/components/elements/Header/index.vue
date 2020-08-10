<template lang="pug">
  .header
    .header__left
      img(src="@assets/images/logo.svg")
    .header__right
      navigation(v-if="isAuthenticated")
</template>

<script>
  // TODO
  import Navigation from '@components/elements/Navigation/index.vue';
  // import { Navigation, Button } from '@components';
  import { Button } from '@components';
  import './style.sass';

  export default {
    components: {
      'navigation': Navigation,
      'v-button': Button,
    },
    props: {
      isAuthenticated: {
        value: Boolean,
        defaultValue: false,
      }
    }
  };
</script>
