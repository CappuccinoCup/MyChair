<template>
  <v-app id="register">
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
            <v-card shaped color="rgba(255,255,255,0.3)" id="register_base">
              <v-card-text>
                <v-toolbar flat>
                  <v-toolbar-title class="display-1">Register</v-toolbar-title>
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
                      <v-btn icon large v-on="on" @click="openLogin">
                        <v-icon>mdi-login</v-icon>
                      </v-btn>
                    </template>
                    <span>Login</span>
                  </v-tooltip>
                </v-toolbar>
                <v-form ref="form" class="ma-7 mb-n5">
                  <v-text-field v-model="username" label="username" append-icon="mdi-account"
                                ref="username" outlined clearable
                                :rules="[() => !!username || 'username is required']"
                                :error-messages="messages.username"></v-text-field>
                  <v-text-field v-model="password" label="password" append-icon="mdi-lock"
                                ref="password" outlined clearable type="password"
                                :rules="[() => !!password || 'password is required']"
                                :error-messages="messages.password"></v-text-field>
                  <v-text-field v-model="confirmPassword" label="confirm password" append-icon="mdi-lock-question"
                                ref="confirmPassword" outlined clearable type="password"
                                :rules="[() => !!confirmPassword || 'please input your password again']"
                                :error-messages="messages.confirmPassword"></v-text-field>
                  <v-text-field v-model="email" label="email" append-icon="mdi-email"
                                ref="email" outlined clearable
                                :rules="[() => !!email || 'email is required']"
                                :error-messages="messages.email"></v-text-field>
                  <v-text-field v-model="organization" label="organization" append-icon="mdi-email"
                                ref="organization" outlined clearable
                                :rules="[() => !!organization || 'organization is required']"></v-text-field>
                  <v-text-field v-model="region" label="region" append-icon="mdi-email"
                                ref="region" outlined clearable
                                :rules="[() => !!region || 'region is required']"></v-text-field>
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
                <v-btn color="primary" text @click="register" class="title">Register</v-btn>
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
        name: 'Register',
        data() {
            return {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                organization: '',
                region: '',
                errors: {
                    username: false,
                    password: false,
                    confirmPassword: false,
                    email: false
                },
                messages: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: ''
                },
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
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    email: this.email,
                    organization: this.organization,
                    region: this.region
                }
            }
        },
        watch: {
            username() {
                const usernamePattern = /^([a-z]|-)+([a-z]|[0-9]|-|_)*$/i;
                if (this.username) {
                    if (this.username.length < 5 || this.username.length > 32) {
                        this.errors.username = true;
                        this.messages.username = 'should be 5~32 characters';
                    } else if (!usernamePattern.test(this.username)) {
                        this.errors.username = true;
                        this.messages.username = 'only support letters/numbers/-/_ and should begin with letter/-';
                    } else {
                        this.errors.username = false;
                        this.messages.username = '';
                    }
                } else {
                    this.errors.username = false;
                    this.messages.username = '';
                }
            },
            password() {
                if (this.password) {
                    if (this.password.length < 6 || this.password.length > 32) {
                        this.errors.password = true;
                        this.messages.password = 'should be 6~32 characters';
                    } else {
                        const patterns = [/[a-z]/i, /[0-9]/, /-/, /_/];
                        let kinds = 0;
                        // 遍历字符串，计算字符种类
                        for (let i = 0; i < patterns.length; i++) {
                            if (patterns[i].test(this.password)) {
                                kinds++;
                            }
                        }
                        if (kinds < 2) {
                            this.errors.password = true;
                            this.messages.password = 'should contain at least 2 kinds in letter/number/-/_';
                        } else if (this.password.search(this.username) !== -1) {
                            this.errors.password = true;
                            this.messages.password = 'shouldn\'t contain username';
                        } else {
                            this.errors.password = false;
                            this.messages.password = '';
                        }
                    }
                } else {
                    this.errors.password = false;
                    this.messages.password = '';
                }
            },
            confirmPassword() {
                if (this.confirmPassword !== this.password) {
                    this.errors.confirmPassword = true;
                    this.messages.confirmPassword = 'two inputs don\'t match'
                } else {
                    this.errors.confirmPassword = false;
                    this.messages.confirmPassword = '';
                }
            },
            email() {
                if (this.email) {
                    const emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
                    if (!emailPattern.test(this.email)) {
                        this.errors.email = true;
                        this.messages.email = 'wrong email format';
                    } else {
                        this.errors.email = false;
                        this.messages.email = '';
                    }
                } else {
                    this.errors.email = false;
                    this.messages.email = '';
                }
            }
        },
        methods: {
            openStart: function () {
                this.$router.push({path: '/'});
            },
            openLogin: function () {
                this.$router.push({path: '/login'});
            },
            resetForm() {
                this.formHasErrors = false;

                Object.keys(this.form).forEach(f => {
                    this.$refs[f].reset();
                });
            },
            register() {
                this.formHasErrors = false;

                Object.keys(this.form).forEach(f => {
                    this.$refs[f].validate(true);
                    if (!this.$refs[f].valid) {
                        this.formHasErrors = true;
                    }
                });

                if (this.errors.username || this.errors.password
                    || this.errors.confirmPassword || this.errors.email) {
                    this.formHasErrors = true;
                }

                if (!this.formHasErrors) {
                    // 验证成功,显示 overlay
                    this.overlay = true;
                    this.$axios.post('/register', {
                            username: this.username,
                            password: this.password,
                            email: this.email,
                            organization: this.organization,
                            region: this.region
                        }
                    )
                        .then(resp => {
                            // 根据后端的返回数据修改
                            if (resp.status === 200) {
                                this.showSnackbar = true;
                                this.snackbarMessage = 'register success';
                                this.snackbarType = 'success';
                                // 跳转到 login
                                this.$router.replace({path: '/login'});
                            } else {
                                this.showSnackbar = true;
                                this.snackbarMessage = 'register error';
                                this.snackbarType = 'error';
                            }
                        })
                        .catch(error => {
                            this.showSnackbar = true;
                            this.snackbarMessage = error.message ? error.message : 'register fail, please check your network connection';
                            this.snackbarType = 'error';
                        })
                        .finally(() => {
                            // 隐藏loading
                            this.overlay = false;
                        })
                }
            }
        },
    }
</script>

<style>
  #register {
    background: url("/img/welcome_bg.jpg") center;
  }

  #register_base {
    margin-top: 20px;
  }
</style>
