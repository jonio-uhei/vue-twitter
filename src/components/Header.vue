<template>
    <header>
        <router-link to="/">
            <h1>whisp</h1>
        </router-link>
        <div v-if="currentUser" class="btns">
          <router-link v-bind:to="'/user/'+currentUser.uid">
            <button v-bind:style="'background-image: url('+currentUser.photoURL+')'"></button>
          </router-link>
          <button><fa icon="sign-out-alt" v-on:click="signOut"/></button>
        </div><!--/.btns-->
        <div v-else class="btns">
          <button><fa icon="user" v-on:click="signIn"/></button>
        </div><!--/.btns-->
    </header>
</template>

<script>
  import firebase from 'firebase'
  import { auth } from '../main' 
  import { db } from '../main'

  export default {
    data(){
      return{
        currentUser:{}
      }
    },
    created(){
      auth.onAuthStateChanged(user => {
      this.currentUser = user
      })
    },
    methods: {
      signIn () {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
        .then((result) => {
          this.$router.push('/user/'+result.user.uid) 
          alert('こんにちは, '+result.user.displayName+'さん!')
          this.createUser(result.user)
        })
      },
      signOut () {
        if (window.confirm('サインアウトしますか?')) {
          auth.signOut()
          .then(() => {
            alert('サインアウトしました')
            this.$router.push('/'),
            location.reload()
          })
        }
      },
      createUser (user) {
        db.collection('users').doc(user.uid).set({
          'name': user.displayName,
          'photoURL': user.photoURL,
          'email':user.email
        }, { merge: true })
      },
    }
  }
</script>

<style lang="stylus" scoped>
header
  position fixed
  top 0
  width 100%
  text-align center
  padding 10px
  h1
    width fit-content
    margin 0 auto
    font-size 1.4rem
  .btns
    position absolute
    top 10px
    right 30px
    cursor pointer
    img
      width 100%
</style>