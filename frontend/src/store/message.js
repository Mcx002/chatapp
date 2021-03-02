import client from "@/client";

export default {
    state:{
        messages:[]
    },
    mutations:{
        setMessages(state,payload){
            state.messages = payload
        }
    },
    actions:{
        getMessagesByRoom({commit}, payload){
            return new Promise((resolve, reject)=>{
                client.get('/messages/'+payload)
                    .then(({data})=>{
                        commit('setMessages', data.data)
                        resolve(data)
                    })
                    .catch(err=>reject(err))
            })
        }
    },
    getters:{
        getMessages(state){
            return state.messages
        }
    }
}