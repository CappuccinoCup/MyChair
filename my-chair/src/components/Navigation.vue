<template>
  <div id="navigation">
    <v-navigation-drawer app clipped v-model="drawer" v-if="drawerVisible">
      <v-list>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Workspace</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-note-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Conference</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat color="#FFFFFF">
      <v-app-bar-nav-icon class="d-lg-none" v-if="drawerVisible" @click.stop="drawer = !drawer"/>
      <v-img src="../assets/MyChair_logo.png" alt="MyChair Logo" max-height="50px" max-width="50px"></v-img>
      <v-btn text class="d-none d-md-flex" @click="logoLinkTo">
        <v-toolbar-title class="headline">
          MyChair
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon>mdi-card-text-outline</v-icon>
        <div class="d-none d-md-flex">Notice</div>
      </v-btn>
      <v-btn text v-if="!hasLoggedIn" @click="openLogin">
        <v-icon>mdi-login</v-icon>
        <div class="d-none d-md-flex">Login</div>
      </v-btn>
      <v-btn text v-if="!hasLoggedIn" @click="openRegister">
        <v-icon>mdi-account-arrow-right-outline</v-icon>
        <div class="d-none d-md-flex">Register</div>
      </v-btn>
      <v-btn text v-if="hasLoggedIn">
        <v-icon>mdi-account-circle-outline</v-icon>
        <div class="d-none d-md-flex">Personal Center</div>
      </v-btn>
      <v-btn text v-if="hasLoggedIn" @click="logout">
        <v-icon>mdi-logout</v-icon>
        <div class="d-none d-md-flex">Logout</div>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
    export default {
        name: 'Navigation',
        data() {
            return {
                drawer: null
            }
        },
        computed: {
            hasLoggedIn: function () {
                return this.$store.state.token;
            },
            drawerVisible: function () {
                if (!this.hasLoggedIn) {
                    // 若处于未登录状态，则隐藏 drawer
                    return false;
                } else {
                    // 若处于登录状态，则只在 Welcome 页面隐藏 drawer
                    return this.$route.path !== '/';
                }
            }
        },
        methods: {
            logoLinkTo: function () {
                if (this.hasLoggedIn) {
                    if (this.$route.path !== '/home') {
                        this.$router.push({path: '/home'});
                    }
                } else {
                    if (this.$route.path !== '/') {
                        this.$router.push({path: '/'});
                    }
                }
            },
            openLogin: function () {
                this.$router.push({path: '/login'});
            },
            openRegister: function () {
                this.$router.push({path: '/register'});
            },
            logout: function () {
                this.$store.commit('logout');
                this.$router.push({path: '/login'});
            }
        }
    }
</script>
