<template lang="pug">
  div
    div
      | Protected page
    br
    div Your email: {{ $store.state.session.user.email }}
</template>
