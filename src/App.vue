<template>
  <v-app>
    <core-app-bar />

    <core-drawer />

    <core-view />

    <core-footer />
    <core-modals :modals="modals" />
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['modals'])
    }
  }
</script>
