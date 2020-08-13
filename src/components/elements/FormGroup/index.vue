<template lang="pug">
  div(:class="rootClass")
    label.form-group__label(v-if="label") {{ label }}
    input(
      :type="type"
      :class="{'form-group__input': true, 'form-group__input_error': error.$error }"
      :value="value"
      @input="onInput")
    div(v-if="error.$error")
      error(:data="error" :messages="errorMessages")
</template>

<script>
  import { Error } from '@components';
  import { getModifiers } from '@utils';
  import './style.sass';

  export default {
    components: {
      'error': Error,
    },
    props: {
      value: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      modifiers: {
        type: [ String, Array ],
        defaultValue: ''
      },
      label: {
        type: String,
        defaultValue: '',
      },
      error: {
        type: Object,
      },
      errorMessages: {
        type: Object,
        required: true,
      }
    },
    computed: {
      rootClass() {
        return getModifiers('form-group', this.modifiers);
      }
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value);
      }
    }
  };
</script>
