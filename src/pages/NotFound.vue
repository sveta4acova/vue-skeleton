<template lang="pug">
  layout-content(:modifiers="['center', 'full']")
    img(src="@assets/images/404.png")
</template>

<script>
  import { LayoutContent } from '@components';

  export default {
    components: {
      LayoutContent
    },
  };
</script>
