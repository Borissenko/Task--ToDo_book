<template>
  <div class="cart">
    <div class="cart__title">{{item.title}}</div>
    <div class="cart__status">

      <label :for="item.id">
        <input type="checkbox" :id="item.id" v-model="status">Status
      </label>
    </div>
    <div class="cart__description" v-clampy="5">
      {{item.description}}
    </div>
    <div class="cart__btns">
      <button @mouseup="DELETE_ITEM(item.id)" class="cart__btn">Delete</button>
      <button @mouseup="onChangeItem(item.id)" class="cart__btn">Change</button>
    </div>
  </div>
</template>

<script>
  import clampy from '@clampy-js/vue-clampy';
  import {mapActions} from 'vuex'

  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      status: {
        get: function () {
          return Boolean(this.item.status)
        },
        set: function (newValue) {
          this.CHANGE_STATUS({id: this.item.id, newValue})
        }
      }
    },
    directives: {
      clampy
    },
    methods: {
      ...mapActions({
        CHANGE_STATUS: 'CHANGE_STATUS',
        DELETE_ITEM: 'DELETE_ITEM'
      }),
      onChangeItem(id) {
        this.$router.push({name: 'Add', query: {point: id}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cart {
    display: flex;
    flex-direction: column;
    width: 24%;
    height: 200px;
    margin-bottom: 7px;
    outline: $darkgrey 1px solid;

    :last-child {
      margin-right: 0;
    }

    &__title, &__status {
      height: 30px;
      font-size: 22px;
      line-height: 22px;
      padding-left: 5px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &__status {
      font-size: 16px;
      line-height: 16px;
      user-select: none;
    }

    &__description {
      padding: 5px;
    }

    &__btns {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      align-self: flex-end;
      justify-content: space-around;
      margin: auto 0 7px;

      .cart__btn {
        width: 44%;
        min-width: 70px;
        min-height: 20px;
        height: fit-content;
      }

      .cart__btn:hover {
        background-color: $secondary;
        color: white;
        transition: all ease .2s;
        cursor: pointer;
      }
    }
  }

  label, input {
    cursor: pointer;
  }

</style>