import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Room from "@/views/Room";
import RoomMessage from "@/views/RoomMessage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/rooms',
    name: 'Room',
    meta:{
      auth:true
    },
    component: Room
  },
  {
    path: '/rooms/:id',
    name: 'RoomMessage',
    meta:{
      auth:true
    },
    component: RoomMessage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.auth)){
    if(localStorage.getItem('auth') == null){
  // console.log(to.matched.some(record=>record.meta.auth))
      next('/')
    }else{
  // //   console.log('beforeEach')
      next()
    }
  }else{
    next()
  }
})

export default router
