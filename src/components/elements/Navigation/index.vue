<template lang="pug">
  nav.navigation
    router-link(to="/" class="navigation__link" active-class="active" exact) Main
    router-link(to="/contacts" class="navigation__link" active-class="active") Contacts
</template>

<script>
  import './style.sass';
  export default {};
</script>
