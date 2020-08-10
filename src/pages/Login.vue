<template lang="pug">
  layout-content(:modifiers="['center', 'full']")
    form-login
</template>

<script>
  import { LayoutContent } from '@components';
  import FormLogin from '@containers/forms/FormLogin';

  export default {
    components: {
      'form-login': FormLogin,
      LayoutContent
    },
  };
</script>
