<template>
  <v-app>
    <v-app-bar
            app
            dark
    >
      <v-toolbar-title>
        <v-btn text>
          <v-toolbar-title><router-link to="/" style="font-size: 1.5rem; text-decoration: none;color:white">Health Connection</router-link></v-toolbar-title>
        </v-btn></v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >
          <v-col class="text-center">
            <transition name="zoom" mode="out-in" appear>
            <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
            app
            dark
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>


<script>
  export default {
    name:'App',
    data(){
      return{
        auth:null,
        paginate:null,
        error_messages:null,
        error:false,
        agency_choix:null,
        dialog: false,
        dialog1:false,
        agencies:[],
        drawer:false,
      }
    },
    methods:{
    },
  };
</script>
<style>
  .zoom-enter-active{
    animation: zoomIn 0.5s;
  }
  .zoom-leave-active{
    animation: zoomOut 0.5s;
  }
  @-webkit-keyframes zoomIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }
  @-webkit-keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      opacity: 0;
    }
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      opacity: 0;
    }
  }

  .zoomIn {
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
  }

</style>
