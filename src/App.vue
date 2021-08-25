<template>
  <v-app>
    <Alert />
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <left-sidebar />
    <v-main class="container-padding overflow-y-lg-hidden bg">
      <div class="pt-4 mx-4 pb-6 mt-n1 grey--text text--darken-3 font-weight-bold">
        <span>{{ this.$route.name }}</span>
      </div>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import LeftSidebar from "./components/LeftSidebar";
import Alert from "./components/Alert"
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    LeftSidebar,
    Alert
  },
  computed: {
    ...mapGetters({"loading": "common/loading"})
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.alert--bottom-fixed {
  width: 100%;
  z-index: 999;
  bottom: 0px;
  position: fixed !important;
}
.row-pointer tbody tr:hover {
  cursor: pointer;
}
</style>
