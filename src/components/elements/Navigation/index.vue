<template lang="pug">
  nav.navigation
    router-link(to="/" class="navigation__link" active-class="active" exact) Main
    router-link(to="/contacts" class="navigation__link" active-class="active") Contacts
    router-link(to="/404" class="navigation__link" active-class="active") Not found
</template>

<script>
  import './style.sass';
  export default {};
</script>
