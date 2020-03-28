<template>
  <v-app id="Home">
    <Navigation></Navigation>
    <Footer></Footer>
  </v-app>
</template>

<script>
    import Navigation from "../components/Navigation";
    import Footer from "../components/Footer"

    export default {
        name: 'Home',
        components: {
            Navigation, Footer
        }
    }
</script>
