<template>
  <div class="alert">
    {{alertRun}}
    <div class="alert__title">
      A you sure ?
    </div>

    <div class="alert__btns">
      <button @mouseup="" class="alert__btn">YES</button>
      <button @mouseup="" class="alert__btn">abort</button>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'

  export default {
    props: {
      deletedGroupName: {
        type: String,
        required: true
      },
      deleteFunction: {
        type: Function,
        required: true
      },
      alertUp: {
        type: Boolean,
        required: true
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .alert {
    position: fixed;
    width: 50vw;
    max-width: 250px;
    height: 30vh;
    max-height: 100px;
    left: 10%;
    top: 10%;
    padding: 8%;
    background-color: $grey;
    text-transform: uppercase;
    opacity: 1;
    transition: all 1s ease;

    &__title {
      font-size: 18px;
      color: $orange;
    }

    &__btns {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      align-self: flex-end;
      justify-content: space-between;
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
</style>