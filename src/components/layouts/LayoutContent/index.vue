<template lang="pug">
  div(:class="rootClass")
    slot
</template>

<script>
  import { getModifiers } from '@utils';
  import './style.sass';
  export default {
    props: {
      modifiers: {
        value: String || Array,
        defaultValue: '',
      }
    },
    computed: {
      rootClass() {
        return getModifiers('layout-content', this.modifiers);
      }
    }
  };
</script>
