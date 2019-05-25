import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/Home'
import Sidebar from '@/components/Sidebar'
import changePassword from '../pages/changePassword'
import showRes from '../pages/showRes'
import seekRes from '../pages/seekRes'
import showExam from '../pages/showExam'
import seekExam from '../pages/seekExam'
import hisRes from '../pages/hisRes'
import hisExam from '../pages/hisExam'
import personInfo from '../pages/personInfo'
import cal from '../pages/cal'
// import TestTable from '../pages/TestTable'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Homepage
        },
        {
            path: '/cal',
            component: Sidebar,
            children: [
                {
                    path: '/Main',
                    component: showRes,
                },
                {
                    path: '/showRes',
                    component: showRes,
                },
                {
                    path: '/showExam',
                    component: showExam,
                },
                {
                    path: '/changePassword',
                    component: changePassword
                },
                {
                    path: '/seekRes',
                    component: seekRes
                },
                {
                    path: '/seekExam',
                    component: seekExam
                },
                {
                    path: '/hisRes',
                    component: hisRes
                },
                {
                    path: '/hisExam',
                    component: hisExam
                },
                {
                    path: '/personInfo',
                    component: personInfo
                },
                {
                    path: '/',
                    component: cal
                }
            ]
        }
    ]
})
