<template>
  <div id="addConference">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-snackbar v-model="showSnackbar" :timeout="3000" :color="snackbarType" top>
      {{ snackbarMessage }}
      <v-btn color="white" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="9">
          <v-card shaped :color="whiteOpacity" id="addConference_base">
            <v-card-title class="display-2">
              Add Conference
            </v-card-title>
            <v-card-text>
              <v-form ref="form" class="ma-7 mb-n5">
                <v-text-field v-model="shortname" label="conference shortname" ref="shortname"
                              outlined clearable prepend-icon="mdi-file-document"
                              :rules="[() => !!shortname || 'conference shortname is required']"></v-text-field>
                <v-text-field v-model="fullname" label="conference fullname" ref="fullname"
                              outlined clearable prepend-icon="mdi-file-multiple"
                              :rules="[() => !!fullname || 'conference fullname is required']"></v-text-field>
                <v-text-field v-model="place" label="conference place" ref="place"
                              outlined clearable prepend-icon="mdi-map-marker"
                              :rules="[() => !!place || 'conference place is required']"></v-text-field>
                <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="50"
                        transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="dateHeld" label="conference date" ref="dateHeld"
                                  prepend-icon="mdi-calendar" outlined readonly v-on="on"
                                  :rules="[() => !!dateHeld || 'conference date is required']"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateHeld" @input="menu1 = false"></v-date-picker>
                </v-menu>
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="50"
                        transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="deadline" label="submission deadline" ref="deadline"
                                  prepend-icon="mdi-calendar-alert" outlined readonly v-on="on"
                                  :rules="[() => !!deadline || 'submission deadline is required']"></v-text-field>
                  </template>
                  <v-date-picker v-model="deadline" @input="menu2 = false"></v-date-picker>
                </v-menu>
                <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="50"
                        transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="dateReleased" label="result announcement date" ref="dateReleased"
                                  prepend-icon="mdi-calendar-check" outlined readonly v-on="on"
                                  :rules="[() => !!dateReleased || 'result announcement date is required']"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateReleased" @input="menu3 = false"></v-date-picker>
                </v-menu>
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
              <v-btn color="primary" text @click="addConference" class="title">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    export default {
        name: 'AddConference',
        data() {
            return {
                shortname: '',
                fullname: '',
                place: '',
                dateHeld: '',
                deadline: '',
                dateReleased: '',
                menu1: false,
                menu2: false,
                menu3: false,
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
                    shortname: this.shortname,
                    fullname: this.fullname,
                    place: this.place,
                    dateHeld: this.dateHeld,
                    deadline: this.deadline,
                    dateReleased: this.dateReleased
                }
            },
            whiteOpacity: function () {
                // 用来调整组件在不同主题下的透明度
                return this.$vuetify.theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
            }
        },
        methods: {
            resetForm() {
                this.formHasErrors = false;

                Object.keys(this.form).forEach(f => {
                    this.$refs[f].reset();
                });
            },
            addConference() {
                this.formHasErrors = false;

                Object.keys(this.form).forEach(f => {
                    this.$refs[f].validate(true);
                    if (!this.$refs[f].valid) {
                        this.formHasErrors = true;
                    }
                });

                if (!this.formHasErrors) {
                    this.overlay = true;
                    this.$axios.post('/registerConference',
                        {
                            ...this.form,
                            username: this.$store.state.userDetails.username
                        }
                    ).then(res => {
                        if (res.status === 200) {
                            this.showSnackbar = true;
                            this.snackbarMessage = 'submit success';
                            this.snackbarType = 'success';
                        } else {
                            this.showSnackbar = true;
                            this.snackbarMessage = 'submit fail';
                            this.snackbarType = 'error';
                        }
                    }).catch(error => {
                        this.showSnackbar = true;
                        this.snackbarMessage = (error.message === 'Request failed with status code 500' ?
                            'submit error, please check your network connection' : 'user authentication fail');
                        this.snackbarType = 'error';
                    }).finally(() => {
                        this.overlay = false;
                        setTimeout(() => {
                            this.resetForm();
                        }, 100);
                    });
                }
            }
        }
    }
</script>
