import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface states{
    allTags:any[],
    templateData:any[],
    allUser:any[],
    allAnnotationData:any[],
    selectData:any[]
}

const state:states ={
    allTags:[],
    templateData:[
        {
            name:'hello',
            data:[  {
                label: 'triangle',
                value: '自行车'
              },
              {
                label: 'rect',
                value: '汽车'
              }]
        },
        {
            name:'hi',
            data:[  {
                label: 'rect',
                value: '自行车'
              },
              {
                label: 'rect',
                value: '火车'
              }]
        }
    ],
    allUser:[],
    allAnnotationData:[],
    selectData:[]
};

const mutations={
     allTags(state,payload){
         state.allTags=payload.data;
     },

     allTemplate(state,payload){
        state.templateData.push(payload);
     },

     allUsers(state,payload){
        state.allUser=payload;
     },

     allAnnotationData(state,payload){
       state.allAnnotationData=payload;
     },

     selectData(state,payload){
       state.selectData = payload;
     }
};
const actions= {
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})
