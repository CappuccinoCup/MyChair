<template>
  <v-container class="mb-12 pb-12">
    <v-row align="center">
      <v-col cols="12">
        <v-card :color="whiteOpacity">
          <v-card-title class="display-1 font-weight-light">Settings page is developing...</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-img :src="require('../assets/MyChair_logo.png')" max-width="300px" max-height="300px"></v-img>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: 'Settings',
        computed: {
            whiteOpacity: function () {
                // 用来调整组件在不同主题下的透明度
                return this.$vuetify.theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
            }
        }
    }
</script>
