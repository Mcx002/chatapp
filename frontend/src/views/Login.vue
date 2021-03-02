<template>
  <div>
    <form @submit.prevent="handleForm">
      <input required placeholder="username" v-model="user.username" />
      <input required placeholder="password" v-model="user.password"/>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default{
  data(){
    return{
      user:{
        username:'',
        password:''
      }
    }
  },
  mounted() {
    if(localStorage.getItem("auth")!=null){
      this.$store.commit('setUser', localStorage.getItem('auth'))
      this.$router.push('rooms')
    }
  },
  computed:{
    ...mapGetters([
        'getUser'
    ])
  },
  methods:{
    handleForm(){
      this.$store.dispatch('checkUser', this.user)
        .then(()=>{
          this.$router.push("rooms")
        })
        .catch(err=> {
          console.error(err)
        })
    }
  }
}
</script>