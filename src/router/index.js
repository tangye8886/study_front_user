import Vue from 'vue'
import Router from 'vue-router'
import Course from '@/components/Course'
import CourseInfo from '@/components/CourseInfo'
import Home from '@/components/Home'
import Index from '@/components/Index'
import CourseVedio from '@/components/CourseVedio'
import Login from '@/components/Login'
import UserInfo from '@/components/UserInfo'
import TeacherCourse from '@/components/TeacherCourse'

Vue.use(Router)

export default new Router({
  base:'/tht/',
  routes: [
    {
      path:'/',
      redirect:'/home',
      component: Index
    },
    {
      path:'/home',
      component: Home
    },
    {
      path:'/course',
      component: Course
    },
    {
      path:'/courseInfo',
      component: CourseInfo
    },
    {
      path:'/courseVedio',
      component: CourseVedio
    },
    {
      path:'/login',
      component: Login
    },
    {
      path:'/userInfo',
      component: UserInfo
    }
    ,
    {
      path:'/teacherCourse',
      component: TeacherCourse
    }
  ]
})
