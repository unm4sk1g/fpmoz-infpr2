<template>
  <v-navigation-drawer
      app
      color="blackish"
      width="100"
      dark
      mobile-breakpoint="600"
  >
    <v-icon size="48" color="white" class="d-flex mb-8 mt-4">mdi-gamepad</v-icon>
    <v-list class="pa-0">
      <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          router
          class="nav-list"
          :class="$route.name === 'locations' || $route.name === 'location' ? 'bg-color' : null"
          :to="item.route"
          active-class="bg-color"
      >
        <v-list-item-content class="py-2">
          <v-icon class="mb-2">
            {{ item.icon }}
          </v-icon>
          <v-list-item-title class="caption font-weight-medium text-center">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Popusti',
          icon: 'mdi-currency-usd',
          route: '/deals'
        },
      ],
    };
  },
  watch: {},
};
</script>

<style
    lang="scss"
    scoped>
.nav-list {
  height: 64px;
}

.avatar {
  width: 48px;
  height: 48px;

}
.bg-color {
  background-color: rgba(255, 255, 255, 0.08);
}

::v-deep {
  .v-list-item--active::before {
    display: none;
  }
}
</style>
