import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    dd: [
      {
        "groupName": "first",
        "id": 1,
        "title": "Graham",
        "status": true,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloremque eos exercitationem harum illum modi molestias quia tenetur, veniam voluptatum?"
      },
      {
        "groupName": "first",
        "id": 2,
        "title": "Graham",
        "status": true,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloremque eos exercitationem harum illum modi molestias quia tenetur, veniam voluptatum?"
      },
      {
        "groupName": "first",
        "id": 3,
        "title": "Graham",
        "status": true,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloremque eos exercitationem harum illum modi molestias quia tenetur, veniam voluptatum?"
      },
      {
        "groupName": "first",
        "id": 4,
        "title": "Graham",
        "status": true,
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloremque eos exercitationem harum illum modi molestias quia tenetur, veniam voluptatum?"
      }
    ]
  },
  mutations: {
    SET_DATA_TO_STORE(st, data) {
      st.data = data
    },
    CHANGE_STATUS(st, {id, newValue}) {
      let itemIndex = st.data.items.findIndex(it => it.id === id)
      st.data.items[itemIndex].status = newValue
    },
    DELETE_ITEM_IN_STORE(st, itemIndex) {
      st.data.items.splice(itemIndex, 1)
    },
    DELETE_GROUP_IN_STORE(st, groupName) {
      st.data.items = st.data.items.filter(it => it.groupName !== groupName)
      st.data.groupNames = st.data.groupNames.filter(it => it !== groupName)
    },

    ADD_ITEM_TO_STORE(st, item) {
      console.log('item \=====', item)  //
      console.log('st.data.items \=====', st.data.items)

      let old = JSON.parse(JSON.stringify(st))
      old.data.items.unshift(item)
      console.log('old.data.items \=====', old.data.items)

      st = old
      console.log('st - 2 \=====', st)

      // st.dd.unshift(item)


//I need also add a new group of name.

    },




    CHANGE_ITEM_TO_STORE(st, item) {
      let aa = st.data.filter(it => it.id !== item.id)
      st.data = [...aa, item]
    }
  },


  actions: {
    async GET_DATA({commit}) {    //инициализирующий запрос и получение данных с сервера
      let {data} = await axios.get('/data.json')
      commit('SET_DATA_TO_STORE', data)
    },
    CHANGE_STATUS({commit}, {id, newValue}) {
      commit('CHANGE_STATUS', {id, newValue})
      //при наличии бакенда здесь необходимо делать запрос на CHANGE status в bd сервера
    },
    DELETE_ITEM({commit, state: {data}}, id) {
      let itemIndex = data.items.findIndex(it => it.id === id)
      commit('DELETE_ITEM_IN_STORE', itemIndex)
      //при наличии бакенда здесь необходимо делать запрос на удаление item в bd сервера
    },
    DELETE_GROUP({commit, state: {data}}, groupName) {
      commit('DELETE_GROUP_IN_STORE', groupName)
      //при наличии бакенда здесь необходимо делать запрос на удаление группы в bd сервера
    },

    MAKE_TASK({commit, state: {data}}, item) {
      if (item.id == null) {    //если id- нет, то здесь НОВЫЙ item.
        const id = Date.now()
        commit('ADD_ITEM_TO_STORE', {...item, id})
        //при наличии бакенда здесь необходимо делать запрос на добавление item в bd сервера
        return Promise.resolve()    //для редиректа на '/'
      } else {
        commit('CHANGE_ITEM_TO_STORE', item)
        //при наличии бакенда здесь необходимо делать запрос на изменение item'a в bd сервера
        return Promise.resolve()
      }
    }





  },
  getters: {
    ACCEPT_FILTRED_DATA: state => filters => {
      if (filters.status === 'all') {
        if (filters.name === '') {  // любой статус, без фильтра по имени
          return state.data.items
        } else {                   // любой статус, фильтр по имени
          return state.data.items.filter(it => it.title.toLowerCase().includes(filters.name.toLowerCase()))
        }
      } else {                    // отфильтруем по статусу и по имени
        if (filters.name === '') {
          return state.data.items.filter(it => Boolean(it.status) === Boolean(filters.status))
        } else {
          return state.data.items.filter(it => it.title.toLowerCase().includes(filters.name.toLowerCase()) && Boolean(it.status) === Boolean(filters.status))
        }
      }
    },
    ACCEPT_GROUP_NAMES: state => state.data.groupNames,
    ACCEPT_ITEM: state => id => state.data.items.find(it => it.id === Number(id))
  }
})
