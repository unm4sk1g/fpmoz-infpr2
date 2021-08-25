<template>
  <div class="d-flex align-center justify-center flex-column full-height">
    <img src="../assets/game-icon-png-4488.png" alt="logo" />
    <h1>Popusti igrica</h1>
    <router-link to="/deals" class="mt-4">
      <v-btn color="primary">Idi na popuste</v-btn>

    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.full-height {
  height: 100vh;
}
</style>
