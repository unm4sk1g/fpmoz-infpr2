<template>
  <div
      class="alert--bottom-fixed d-flex flex-column align-center justify-center ml-n3 px-2"
  >
    <v-alert
        prominent
        v-for="alert in alerts"
        v-bind:key="alert.uuid"
        :type="alert.type || 'success'"
    >
      <v-row align="center">
        <v-col class="grow">
          {{ alert.message }}
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ alerts: "common/alerts" }),
  },
  data: () => ({
    currentAlerts: [],
    emptyUrl: "",
  }),
  methods: {
    ...mapActions({
      removeAlert: "common/removeAlert",
    }),
    openLink(alert) {
      this.removeAlert(alert.uuid)
    },
    reinitializeTimers() {
      this.currentAlerts.forEach((alert, i) => {
        if (alert.constant) {
          return;
        } else {
          if (!alert.timer) {
            this.currentAlerts[i].timer = setTimeout(() => {
              this.removeAlert(alert.uuid);
            }, 3000);
          }
        }
      });
    },
  },
  watch: {
    alerts: {
      handler(val) {
        this.currentAlerts = val;
        this.reinitializeTimers();
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss"></style>
