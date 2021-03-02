import client from '@/client'

export default {
    state:{
        user:{
            _id:'',
            username:''
        },
        hasLogin:false,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
            state.isLoading = false
            state.hasLogin = true
        }
    },
    actions: {
        async checkUser({commit},payload){
            return new Promise((resolve,reject)=>{
                client.post('/auth',payload)
                    .then(({data})=>{
                        // console.log(data)
                        localStorage.setItem("auth",JSON.stringify(data.data))
                        commit('setUser', data.data)
                        resolve(data)
                    })
                    .catch(err=>{
                        reject(err)
                    })
            })
        }
    },
    getters:{
        getUser(state){
            if(!state.hasLogin)
                state.user = JSON.parse(localStorage.getItem('auth'))
            return state.user
        }
    }

}
