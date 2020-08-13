<template lang="pug">
  .error
    .error__messages-group(v-if="typeof data !== 'string' && messages")
      .error__message(v-for="key in dataKeys" :key="key" v-if="!data[key] && messages[key]") {{ messages[key] }}
    .error__message(v-if="typeof data === 'string'") {{ data }}
</template>

<script>
  import './style.sass';

  export default {
    props: {
      data: {
        type: [ String, Object ],
      },
      messages: {
        type: Object,
      }
    },
    computed: {
      dataKeys() {
        return Object.keys(this.data);
      }
    }
  };
</script>
