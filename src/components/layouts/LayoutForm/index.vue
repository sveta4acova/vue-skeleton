<template lang="pug">
  div.layout-form-wrap
    dimmer(v-if="wait")
    form.layout-form
      header.layout-form__header
        slot(name="header")
      .layout-form__content
        slot(name="content")
      footer.layout-form__footer
        slot(name="footer")
</template>

<script>
  import { Dimmer } from '@components';
  import './style.sass';

  export default {
    components: {
      'dimmer': Dimmer,
    },
    props: {
      wait: {
        type: Boolean,
        default: false,
      }
    }
  };
</script>
