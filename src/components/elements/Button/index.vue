<template lang="pug">
  button(:class="rootClass" @click="onClick" :disabled="disabled")
    slot
</template>

<script>
  import { getModifiers } from '@utils';
  import './style.sass';

  export default {
    props: {
      modifiers: {
        type: [ String, Array ],
        defaultValue: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      rootClass () {
        return getModifiers('button', this.modifiers);
      }
    },
    methods: {
      onClick (e) {
        this.$emit('click', e);
      }
    }
  };
</script>
