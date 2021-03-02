<template>
  <div style="padding-bottom: 8rem">
    <h3><button @click="$router.back()" style="margin-right: 10px">back</button>Room {{ getSelectedRoom!=null?getSelectedRoom.name:"" }}</h3>
    <div>
      <div v-for="(data,i) in getMessages" :key="data._id" style="margin-top:10px;" :style="[data.user._id===getUser._id?{'background':'#eef'}:i%2===1?{'background':'#eee'}:null]">
        <div v-if="data.user._id!==getUser._id">
          <span style="font-weight: bold;">{{data.user.username}}</span><br>
          <span>{{data.message}}</span>
        </div>
        <div v-else style="display: flex;flex-direction: column; justify-content: right; text-align:right">
          <span style="font-weight: bold;">{{data.user.username}}</span>
          <span>{{data.message}}</span>
        </div>
      </div>
    </div>
    <div style="display: flex;justify-content: center">
      <form @submit.prevent="handleForm" id="forminput">
        <input required v-model="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "RoomMessage",
  data(){
    return{
      message:'',
      messages:[],
      hasSubscribe:false,
    }
  },
  sockets:{
    connect(){
      // console.log('connected')
    }
  },
  computed:{
    ...mapGetters([
        'getRooms',
        "getMessages",
        "getUser"
    ]),
    getSelectedRoom(){
      let temp = this.getRooms.find(data=>data._id===this.$route.params.id)
      return temp
    }
  },
  beforeMount() {
    if(!this.hasSubscribe){
      this.sockets.subscribe(this.$route.params.id,(data)=>{
        this.messages.push(data)
        window.scrollTo(0,document.body.scrollHeight)
        // console.log(data)
      })
      this.hasSubscribe=true
    }
  },
  mounted(){
    this.$store.dispatch('getMessagesByRoom',this.$route.params.id)
        .then(({data})=> {
          this.messages = data
          window.scrollTo(0,document.body.scrollHeight)
          // console.log(this.messages)
        })
        // .catch(err=>console.log(err))
    if(this.getRooms.length===0){
      this.$store.dispatch('getRoomsServer')
    }
  },
  methods:{
    handleForm(){
      this.$socket.emit('chat message', {userId:this.getUser._id,roomId:this.$route.params.id,message:this.message})
      this.message = ''
    }
  }
}
</script>

<style scoped>
  body{
    padding-bottom: 3rem !important;
  }
  #forminput{
    position:fixed;
    bottom:20px;
    width:95%;
    display:grid;
    grid-template-areas: 'input input input input input button';
    grid-gap: 10px;
  }
  #forminput input{
    grid-area: input;
    padding:10px
  }
  #forminput button{
    grid-area: button;
  }
</style>