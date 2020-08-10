<template lang="pug">
  .layout-page
    .layout-page__header
      slot(name="header")
    main.layout-page__main
      slot(name="main")
</template>

<script>
  import './style.sass';
  export default {};
</script>
