<template>
  <div>
    <bar @changeFilter="changeFilter"/>

    <div v-for="(groupName, ind) in ACCEPT_GROUP_NAMES"
         :key="ind"
         class="carts-group"
    >
      <hr>
      <div class="carts-group__top">
        <div class="carts-group__name">
          Group name is {{groupName}}
        </div>
        <button @click="alertRunBeforeDelete(groupName)" class="carts-group__btn">
          Delete this group total
        </button>
      </div>
      <div class="carts-group__items">
        <cart v-for="(item, ind) in ACCEPT_FILTRED_DATA(filters).filter(it => it.groupName === groupName)"
              :key="ind + 'a'"
              :item="item"
              :groupName="groupName"
        />
      </div>
    </div>

    <alert :deletedItemId="deletedGroupName"
           :deleteFunction="DELETE_GROUP"
           :itemName="deletedGroupName"
           v-if="alertUp"
           @alertDown="alertDown"
    />
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import Bar from '@/components/bar'
  import Cart from '@/components/cart'
  import Alert from '@/components/alert'

  export default {
    components: {
      Bar,
      Cart,
      Alert
    },
    data: () => ({
      filters: {
        name: '',
        status: 'all'
      },
      deletedGroupName: '',
      alertUp: false
    }),
    computed: {
      ...mapGetters([
        'ACCEPT_GROUP_NAMES',
        'ACCEPT_FILTRED_DATA',
        'GET_TOKEN_FROM_STORE'
      ])
    },
    methods: {
      ...mapActions([
        'GET_DATA',
        'DELETE_GROUP'
      ]),
      ...mapMutations([
        'PUT_TOKEN'
      ]),
      changeFilter(filters) {
        this.filters = filters
      },
      onMakeItem(id) {
        this.$router.push({name: 'Add', query: {point: id}})
      },
      alertRunBeforeDelete(groupName) {
        this.deletedGroupName = groupName
        this.alertUp = true
      },
      alertDown() {
        this.alertUp = false
      }
    },
    created() {
      if (this.ACCEPT_FILTRED_DATA({name: '', status: 'all'}).length === 0)
        this.GET_DATA()

      if (!this.GET_TOKEN_FROM_STORE && localStorage.getItem('auth = '))
        this.PUT_TOKEN(localStorage.getItem('auth = '))
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