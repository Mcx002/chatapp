import client from "@/client";

export default {
    state:{
        rooms:[]
    },
    mutations:{
        setRooms(state,payload){
            state.rooms = payload
        }
    },
    actions:{
        getRoomsServer({commit}){
            return new Promise((resolve, reject)=> {
                client.get('/rooms')
                    .then(({data})=>{
                        commit('setRooms',data.data)
                        resolve(data)
                    })
                    .catch(err=>{
                        reject(err)
                    })
            })
        },
        addRoom({dispatch}, payload){
            return new Promise((resolve, reject)=>{
                client.post('/rooms', payload)
                    .then(({data})=>{
                        dispatch('getRoomsServer')
                        resolve(data)
                    })
                    .catch(err=>reject(err))
            })
        }
    },
    getters:{
        getRooms(state){
            return state.rooms
        }
    }
}