import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/Home'
import myFile from '@/components/myFiles'
import Sidebar from '@/components/Sidebar'
import changePassword from '../pages/changePassword'
import showRes from '../pages/showRes'
import showExam from '../pages/showExam'
import seekRes from '../pages/seekRes'
import seekExam from '../pages/seekExam'
import hisRes from '../pages/hisRes'
import hisExam from '../pages/hisExam'
import personInfo from '../pages/personInfo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Homepage
        },
        {
            path: '/Main',
            component: Sidebar,
            children: [
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
                }
            ]
        }
    ]
})
