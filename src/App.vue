<template>
  <div class="main-container">
    <hr>
    <div class="title">
      ToDo
    </div>
    <hr>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
  @import './assets/styles/down';

  .main-container {
    max-width: 1200px;
    margin: 40px auto 0;

    .title {
      margin: 20px 0;
      font-size: 20px;
      font-weight: 800;
      color: $green;
    }
  }
</style>
