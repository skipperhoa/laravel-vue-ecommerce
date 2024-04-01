export default{
    namespaced: true,
    state:{
        redirectedFrom:null
    },
    getters:{
        getRedirectedFrom:(state)=>{
            return state.redirectedFrom
        }
    },
    mutations:{
        updateRedirectedFrom:(state,value)=>{
            state.redirectedFrom = value
        }
    },
    actions:{
        setRedirectedFrom:({commit},value)=>{
            commit("updateRedirectedFrom",value)
        }
    }
}
