<template>
  <div class="alert-fon">
    <div class="alert">
      <div class="alert__title">
        <div>A YOU SURE</div>
        <div>to delete "{{itemName}}" ?</div>
      </div>

      <div class="alert__btns">
        <button @mouseup="onYes" class="alert__btn">YES</button>
        <button @mouseup="onAbort" class="alert__btn">abort</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      deletedItemId: {
        type: String | Number,
        required: true
      },
      deleteFunction: {
        type: Function,
        required: true
      },
      itemName: {
        type: String,
        required: true
      }
    },
    methods: {
      onYes() {
        this.deleteFunction(this.deletedItemId)
        this.$emit('alertDown')
      },
      onAbort() {
        this.$emit('alertDown')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .alert-fon {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;

    .alert {
      position: absolute;
      width: 50vw;
      max-width: 250px;
      height: 30vh;
      max-height: 100px;
      left: 10%;
      top: 10%;
      padding: 8%;
      background-color: $grey;
      opacity: 1;
      transition: all 1s ease;
      margin-left: 0;

      &__title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 18px;

        :first-child {
          color: $orange;
          margin-bottom: 5px;
        }
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
  }
</style>