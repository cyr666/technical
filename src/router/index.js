import Vue from 'vue'
import Router from 'vue-router'
import Common from '@/components/common'
import Login from '@/components/login'
import Find from '@/view/source/Find'
import Institution from '@/view/source/Institution'
import Secientific from '@/view/source/secientific'
import Special from '@/view/source/Special'
import searchHead from '@/view/searchResult/searchHead'
import searchInstitution from '@/view/searchResult/searchInstitution'
import searchSpecial from '@/view/searchResult/searchSpecial'
import searchAchievement from '@/view/searchResult/searchAchievement'
import InsDel  from '@/view/source/InsDel'
import ScientificDetail from '@/view/source/scientificDetail'
import Reference from '@/view/service/reference/reference'
import ReferenceList from '@/view/service/reference/referenceList'
import ReferenceDetail from '@/view/service/reference/referenceDetail'
import Global from '@/view/global/Global'
import China from '@/view/china/China'
import Innovation from '@/view/innovation/Innovation'
import InnovationDel from '@/view/innovation/innovationDel/InnovationDel'
import ChainMap from '@/view/chainMap/ChainMap'
import Dynamic from '@/view/dynamic/dynamic'
import NewsDel from '@/view/dynamic/newsDetail'
import { resolve } from 'upath';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/technical',
      redirect:'/technical/global',
      name: 'common',
      component: Common,
      children:[{
        path: '/technical/find',
        name: 'find',
        component: (resolve)=>{
          require(["@/view/source/Find"],resolve)
        },
      },{
        path: '/technical/institution',
        name: 'institution',
        component: (resolve)=>{
          require(["@/view/source/Institution"],resolve)
        },
      },{
        path: '/technical/special',
        name: 'special',
        component: (resolve)=>{
          require(["@/view/source/Special"],resolve)
        },
      },{
        path: '/technical/searchResult',
        name: 'searchResult',
        component: searchHead,
        redirect: '/technical/searchResult/searchInstitution',
        children:[
          {
            path: '/technical/searchResult/searchInstitution',
            name: 'searchInstitution',
            component: (resolve)=>{
              require(["@/view/searchResult/searchInstitution"],resolve)
            },
          },{
            path: '/technical/searchResult/searchSpecial',
            name: 'searchSpecial',
            component: searchSpecial,
          },{
            path: '/technical/searchResult/searchAchievement',
            name: 'searchAchievement',
            component: searchAchievement,
          }
        ]
      },{
        path: '/technical/insDel',
        name: 'insDel',
        component: (resolve)=>{
          require(["@/view/source/InsDel"],resolve)
        },
      },{
        path: '/technical/secientific',
        name: 'Secientific',
        component: Secientific,
      },
      {
        path: '/technical/scientificDetail',
        name: 'scientificDetail',
        component: ScientificDetail,
      },{
        path: '/technical/reference',
        name: 'reference',
        component: Reference,
      },{
        path: '/technical/referenceList',
        name: 'referenceList',
        component: ReferenceList,
      },{
        path: '/technical/referenceDetail',
        name: 'referenceDetail',
        component: ReferenceDetail,
      },{
        path: '/technical/global',
        name: 'global',
        component: Global,
      },{
        path: '/technical/china',
        name: 'china',
        component: China,
      },{
        path: '/technical/innovation',
        name: 'innovation',
        component: Innovation,
      },{
        path: '/technical/InnovationDel',
        name: 'innovationDel',
        component: InnovationDel,
      },{
        path: '/technical/ChainMap',
        name: 'chainMap',
        component: ChainMap,
      },{
        path: '/technical/dynamic',
        name: 'Dynamic',
        component: Dynamic,
      },{
        path: '/technical/NewsDel',
        name: 'NewsDel',
        component: NewsDel,
      }]
    }
  ]
})
