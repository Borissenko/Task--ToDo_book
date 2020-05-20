<template>
  <div>
    <bar @changeFilter="changeFilter"/>

    <pre>
      {{ACCEPT_FILTRED_DATA(filters)}}
    </pre>

    <div v-for="(groupName, ind) in ACCEPT_GROUP_NAMES"
         :key="ind"
         class="carts-group"
    >
      <hr>
      <div class="carts-group__top">
        <div class="carts-group__name">
          Group name is {{groupName}}
        </div>
        <button @click="DELETE_GROUP(groupName)" class="carts-group__btn">Delete this group total</button>
      </div>
      <div class="carts-group__items">
        <cart v-for="(item, ind) in ACCEPT_FILTRED_DATA(filters).filter(it => it.groupName === groupName)"
              :key="ind + 'a'"
              :item="item"
              :groupName="groupName"
        />
      </div>
    </div>


  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Bar from '@/components/bar'
  import Cart from '@/components/cart'

  export default {
    components: {
      Bar,
      Cart
    },
    data: () => ({
      filters: {
        name: '',
        status: 'all'
      }
    }),
    computed: {
      ...mapGetters({
        ACCEPT_GROUP_NAMES: 'ACCEPT_GROUP_NAMES',
        ACCEPT_FILTRED_DATA: 'ACCEPT_FILTRED_DATA'
      })
    },
    methods: {
      ...mapActions({
        GET_DATA: 'GET_DATA',
        DELETE_GROUP: 'DELETE_GROUP'
      }),
      changeFilter(filters) {
        this.filters = filters
      },
      onMakeItem(id) {
        this.$router.push({name: 'Add', query: {point: id}})
      }
    },
    created() {
      this.GET_DATA()
    }
  }
</script>

<style lang="scss" scoped>
  .carts-group {
    &__top {
      display: flex;
      flex-direction: column
    }

    &__name {
      text-transform: uppercase;
      color: $green;
      margin-bottom: 10px;
    }

    &__btn {
      width: 298px;
    }

    &__items {
      display: flex;
      flex-flow: row wrap;
      margin-top: 20px;
    }

    &__items :not(:nth-child(4n+1)) {
      margin-left: 1.33333%;
    }

    &__btn {
      cursor: pointer;
    }

    &__btn:hover {
      background-color: $secondary;
      color: white;
      transition: all ease .2s;
      cursor: pointer;
    }

  }
</style>