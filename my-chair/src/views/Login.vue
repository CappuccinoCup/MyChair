<template>
  <v-app id="login">

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-snackbar v-model="showSnackbar" :timeout="3000" :color="snackbarType" top>
      {{ snackbarMessage }}
      <v-btn color="white" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-card shaped color="rgba(255,255,255,0.3)" id="login_base">
              <v-card-text>
                <v-toolbar flat>
                  <v-toolbar-title class="display-1">Login</v-toolbar-title>
                  <v-spacer/>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large v-on="on" @click="openStart">
                        <v-icon>mdi-home-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Start</span>
                  </v-tooltip>
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large v-on="on" @click="openRegister">
                        <v-icon>mdi-account-arrow-right-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Register</span>
                  </v-tooltip>
                </v-toolbar>
                <v-form ref="form" class="ma-7 mb-n5">
                  <v-text-field v-model="username" label="username" append-icon="mdi-account"
                                ref="username" outlined clearable
                                :rules="[() => !!username || 'username is required']"></v-text-field>
                  <v-text-field v-model="password" label="password" append-icon="mdi-fingerprint"
                                ref="password" outlined clearable type="password"
                                :rules="[() => !!password || 'password is required']"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="mr-7">
                <v-spacer></v-spacer>
                <v-slide-x-reverse-transition>
                  <v-tooltip v-if="formHasErrors" left>
                    <template v-slot:activator="{ on }">
                      <v-btn icon class="my-0" @click="resetForm" v-on="on">
                        <v-icon>mdi-refresh</v-icon>
                      </v-btn>
                    </template>
                    <span>Reset form</span>
                  </v-tooltip>
                </v-slide-x-reverse-transition>
                <v-btn color="primary" text @click="login" class="title">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                formHasErrors: false,
                overlay: false,
                showSnackbar: false,
                snackbarMessage: '',
                snackbarType: ''
            }
        },
        computed: {
            form: function () {
                return {
                    username: this.username,
                    password: this.password
                }
            }
        },
        methods: {
            openStart: function () {
                this.$router.push({path: '/'});
            },
            openRegister: function () {
                this.$router.push({path: '/register'});
            },
            resetForm() {
                this.formHasErrors = false;

                Object.keys(this.form).forEach(f => {
                    this.$refs[f].reset();
                });
            },
            login() {
                this.formHasErrors = false;

                Object.keys(this.form).forEach(f => {
                    this.$refs[f].validate(true);
                    if (!this.$refs[f].valid) {
                        this.formHasErrors = true;
                    }
                });

                if (!this.formHasErrors) {
                    // 验证成功,显示 overlay
                    this.overlay = true;
                    this.$axios.post('/login', {
                        username: this.username,
                        password: this.password
                    })
                        .then(resp => {
                            // eslint-disable-next-line no-prototype-builtins
                            if (resp.status === 200 && resp.data.hasOwnProperty("token")) {
                                this.showSnackbar = true;
                                this.snackbarMessage = 'login success';
                                this.snackbarType = 'success';
                                this.$store.commit('login', resp.data);
                                this.$router.replace({path: '/home'});
                            } else {
                                this.showSnackbar = true;
                                this.snackbarMessage = 'login error';
                                this.snackbarType = 'error';
                            }
                        })
                        .catch(error => {
                            this.showSnackbar = true;
                            this.snackbarMessage = (error.message === "用户名错误" || error.message === "密码错误") ?
                                "wrong username or password" : 'login fail, please check your network connection';
                            this.snackbarType = 'error';
                        })
                        .finally(() => {
                            // 隐藏 overlay
                            this.overlay = false;
                        })
                }
            }
        },
    }
</script>

<style>
  #login {
    background: url("/img/welcome_bg.jpg") center;
  }

  #login_base {
    margin-top: 100px;
  }
</style>
