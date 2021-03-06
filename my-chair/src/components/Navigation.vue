<template>
  <div id="navigation">
    <v-overlay :value="confirmLogout" opacity="0.9">
      <v-card shaped :color="whiteOpacity">
        <v-card-title class="headline">Logout</v-card-title>
        <v-card-text class="title">Are you sure to logout?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="whiteOpacity" rounded @click="confirmLogout = false">No</v-btn>
          <v-btn :color="whiteOpacity" rounded @click="logout">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-navigation-drawer app clipped v-model="drawer" v-if="drawerVisible">
      <v-list rounded>
        <v-subheader class="title">Navigation</v-subheader>
        <!-- workspace link -->
        <v-list-item link @click="openWorkspace">
          <v-list-item-icon>
            <v-icon>mdi-view-grid</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Workspace</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- add conference link -->
        <v-list-item link @click="openAddConference">
          <v-list-item-icon>
            <v-icon>mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add Conference</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- item group 1: more -->
        <v-list-group prepend-icon="mdi-dots-vertical-circle">
          <template v-slot:activator>
            <v-list-item-title>More</v-list-item-title>
          </template>
          <!-- sub-group 1: settings -->
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </template>
            <!-- sub-group 1 item: settings -->
            <v-list-item link @click="openSettings">
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <!-- sub-group 2: about -->
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>About</v-list-item-title>
              </v-list-item-content>
            </template>
            <!-- sub-group 2 item 1: information -->
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-information</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Information</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- sub-group 2 item 2: help -->
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-help-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Help</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat :color="whiteOpacity">
      <v-app-bar-nav-icon class="d-lg-none" v-if="drawerVisible" @click.stop="drawer = !drawer"/>
      <v-img src="../assets/MyChair_logo.png" alt="MyChair Logo" max-height="50px" max-width="50px"></v-img>
      <v-btn text class="d-none d-md-flex" @click="openHome">
        <v-toolbar-title class="headline">
          MyChair
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text v-if="hasLoggedIn" @click="openHome">
        <v-icon>mdi-home-outline</v-icon>
        <div class="d-none d-md-flex">Home</div>
      </v-btn>
      <v-btn text @click="changeTheme">
        <v-icon>mdi-image-multiple</v-icon>
        <div class="d-none d-md-flex">{{isDark ? 'Light' : 'Dark'}}</div>
      </v-btn>
      <v-btn text v-if="hasLoggedIn">
        <v-icon>mdi-card-text-outline</v-icon>
        <div class="d-none d-md-flex">Message</div>
      </v-btn>

      <v-menu open-on-hover bottom offset-y v-if="hasLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon>mdi-account-circle-outline</v-icon>
            <div class="d-none d-md-flex">Account</div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>{{username}}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>more</v-list-item-title>
          </v-list-item>
          <v-list-item @click="confirmLogout = true">
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text v-if="!hasLoggedIn" @click="openLogin">
        <v-icon>mdi-login</v-icon>
        <div class="d-none d-md-flex">Login</div>
      </v-btn>
      <v-btn text v-if="!hasLoggedIn" @click="openRegister">
        <v-icon>mdi-account-arrow-right-outline</v-icon>
        <div class="d-none d-md-flex">Register</div>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
    export default {
        name: 'Navigation',
        data() {
            return {
                drawer: null,
                confirmLogout: false
            }
        },
        computed: {
            username: function () {
                return this.$store.state.userDetails ? this.$store.state.userDetails.username : 'friend A';
            },
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
            },
            isDark: function () {
                // 当前页面是否是深色主题
                return this.$vuetify.theme.dark;
            },
            whiteOpacity: function () {
                // 用来调整组件在不同主题下的透明度
                return this.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
            }
        },
        methods: {
            openHome: function () {
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
            openWorkspace: function () {
                if (this.$route.path !== '/home/workspace') {
                    this.$router.push({path: '/home/workspace'});
                }
            },
            openAddConference: function () {
                if (this.$route.path !== '/home/addconference') {
                    this.$router.push({path: '/home/addconference'});
                }
            },
            openSettings: function () {
                if (this.$route.path !== '/home/settings') {
                    this.$router.push({path: '/home/settings'});
                }
            },
            logout: function () {
                this.$store.commit('logout');
                this.$router.push({path: '/login'});
            },
            changeTheme: function () {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                this.$store.commit('changeTheme', this.$vuetify.theme.dark);
            }
        }
    }
</script>
