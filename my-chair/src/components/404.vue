<template>
  <v-card width="100%" height="100%" color="black">
    <v-container>
      <v-row justify="center" class="mt-12">
        <v-card-title class="display-3 font-weight-bold white--text text-no-wrap">404 Not Found</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-card-subtitle class="title white--text">This page has jumped to another world line</v-card-subtitle>
      </v-row>
      <v-row justify="center">
        <v-img src="../assets/NotFound.jpg"></v-img>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>
