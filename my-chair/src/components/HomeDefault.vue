<template>
  <v-container class="mb-12 pb-12">
    <v-row justify="center">
      <v-img :src="require('../assets/MyChair_logo.png')" max-width="300px" max-height="300px"></v-img>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <v-card :color="whiteOpacity">
          <v-card-title class="display-1 font-weight-light">Welcome back, <br class="d-md-none">{{username}}
          </v-card-title>
          <v-card-subtitle class="title font-weight-thin">Best wishes to you</v-card-subtitle>
          <v-card-text class="headline font-weight-light">MyChair is a magical website.
            It is growing every day and every night, but nobody exactly knows how it will be like...
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: 'HomeDefault',
        computed: {
            username: function () {
                return this.$store.state.userDetails ? this.$store.state.userDetails.username : 'friend A';
            },
            whiteOpacity: function () {
                // 用来调整组件在不同主题下的透明度
                return this.$vuetify.theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
            }
        }
    }
</script>
