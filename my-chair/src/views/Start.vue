<template>
  <v-app id="start">
    <Navigation></Navigation>
    <v-content data-test="content">
      <v-container class="mb-12 pb-12">
        <v-row justify="center" data-test="row">
          <v-img :src="require('../assets/MyChair_logo.png')" max-width="300px" max-height="300px" data-test="logo"></v-img>
        </v-row>
        <v-row align="center" data-test="row">
          <v-col cols="12" md="7">
            <v-card color="rgba(255,255,255,0.3)" data-test="welcome">
              <v-card-title class="display-1 font-weight-light" data-test="header">Welcome to MyChair</v-card-title>
              <v-card-subtitle class="title font-weight-thin">Easy or hard, it depends</v-card-subtitle>
              <v-card-text class="headline font-weight-light">MyChair is a magical website.
                It is growing every day and every night, but nobody exactly knows how it will be like...
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-row justify="center" data-test="row">
              <v-btn rounded color="rgba(225,225,225,0)" width="270px" height="90px" style="z-index: 1"
                     @click="startNow" data-test="startBtn">
                <div class="display-1 font-weight-thin">START NOW</div>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
    import Navigation from '../components/Navigation'
    import Footer from "../components/Footer";
    import background from '../assets/welcome_bg'

    export default {
        name: 'Start',
        components: {
            Navigation, Footer
        },
        methods: {
            startNow: function () {
                if (this.$store.state.token) {
                    this.$router.push({path: '/home'});
                } else {
                    this.$router.push({path: '/login'});
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            // 进入页面时加载动态 canvas 背景
            background();
            next();
        },
        beforeRouteLeave(to, from, next) {
            // 离开页面时移除动态 canvas 背景
            // canvas 的 id 会改变，因此使用标签名作为索引
            document.body.removeChild(document.getElementsByTagName('canvas')[0]);
            next();
        }
    }
</script>

<style>
  #start {
    background: url("/img/welcome_bg.jpg") center fixed;
  }
</style>
