<template>
  <v-footer absolute padless color="rgba(255,255,255,0)">
    <v-card flat class="text-center" width="100%" :color="whiteOpacity">
      <v-card-text>
        Copyright&nbsp;&copy;&nbsp;2020&nbsp;MyChair&nbsp;GLXLG.&nbsp;All&nbsp;rights&nbsp;reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
    export default {
        name: 'Footer',
        computed: {
            whiteOpacity: function () {
                // 用来调整组件在不同主题下的透明度
                return this.$vuetify.theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
            }
        }
    }
</script>
