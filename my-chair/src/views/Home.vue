<template>
  <v-app id="home">
    <Navigation></Navigation>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
    import Navigation from "../components/Navigation";

    export default {
        name: 'Home',
        components: {
            Navigation
        }
    }
</script>
