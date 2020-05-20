<template>
  <div class="alert">
    <div class="alert__txt">
      A you sure ?
    </div>

    <div class="alert__btns">
      <button @mouseup="ALERT_YES" class="alert__btn">YES</button>
      <button @mouseup="ALERT_ABORT" class="alert__btn">abort</button>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapActions({
        ALERT_YES: 'ALERT_YES',
        ALERT_ABORT: 'ALERT_ABORT'
      })
    },
    // methods: {
    //   ...mapMutations({
    //     ALERT_YES: 'ALERT_YES',
    //     ALERT_ABORT: 'ALERT_ABORT'
    //   })
    // }
  }
</script>

<style lang="scss" scoped>
  .alert {
    position: fixed;
    width: 50vw;
    height: 30vh;
    left: 10%;
    top: 10%;
    padding: 8%;
    background-color: $grey;
    text-transform: uppercase;
    opacity: 1;
    transition: all 1s ease;

    &__title {
      font-size: 24px;
      font-weight: 500;
      color: $secondary;
    }

    &__text {
      margin-top: 20px;
      font-size: 18px;
    }

    &__btns {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      align-self: flex-end;
      justify-content: space-around;
      margin: 60px 0 0;

      .alert__btn {
        width: 44%;
        min-width: 70px;
        min-height: 20px;
        height: fit-content;
      }

      .alert__btn:hover {
        background-color: $secondary;
        color: white;
        transition: all ease .2s;
        cursor: pointer;
      }
    }
  }

  .alert:hover {
    width: 57vw;
    height: 40vh;
    background-color: $very;
    color: $grey;
    font-size: 30px;
    transition: all 0.5s ease;
  }
</style>