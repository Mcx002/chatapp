<template>
  <div>
    <h1>Rooms</h1>
    <button @click="logout">logout</button>
    <div id="rooms">
      <div class="item" v-for="data in getRooms" :key="data._id" @click="itemClicked(data._id)">
        <span style="font-weight: bold; font-size: 20px">{{ data.name }}</span>
        <small style="color:darkgrey">Created by {{data.user.username}}</small>
      </div>
    </div>
    <div id="addClass">
      <form @submit.prevent="handleAddRoom">
        <input required placeholder="roomName" v-model="roomName" />
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Room.vue",
  data(){
    return{
      roomName:''
    }
  },
  computed:{
    ...mapGetters([
        'getRooms',
        'getUser'
    ])
  },
  mounted(){
    this.$store.dispatch('getRoomsServer')
  },
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push('/')
    },
    handleAddRoom(){
      this.$store.dispatch('addRoom', {name:this.roomName, userId:this.getUser._id})
        .catch(err=>console.error(err))
      this.roomName = ''
      // console.log(this.getUser)
    },
    itemClicked(id){
      this.$router.push('/rooms/'+id)
    }
  }
}
</script>

<style>
  #rooms > .item{
    padding:20px;
    border: 1px solid #eaeaea;
    margin-top:10px;
    cursor:pointer;
    display: flex;
    flex-direction: column;
  }
  #addClass{
    position:fixed;
    top:20px;
    right:20px;
    width:250px;
    height: 250px;
  }
</style>