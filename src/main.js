import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faSignOutAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faSignOutAlt,
  faEllipsisV
)

Vue.component('fa', FontAwesomeIcon)

import { firestorePlugin } from 'vuefire'          
import firebase from 'firebase'     
import 'firebase/firestore'

Vue.use(firestorePlugin)

firebase.initializeApp({                
  apiKey: "AIzaSyCD2BZ1tqlctjql52Uz9JmE0iK3aGABJrs",
  authDomain: "twitter-sns.firebaseapp.com",
  databaseURL: "https://twitter-sns.firebaseio.com",
  projectId: "twitter-sns",
  storageBucket: "twitter-sns.appspot.com",
  messagingSenderId: "522000365242",
  appId: "1:522000365242:web:52792c804287cfcce23483"
})

export const db = firebase.firestore()
export const auth = firebase.auth()


Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
