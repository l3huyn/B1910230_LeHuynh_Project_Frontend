import { createWebHistory, createRouter } from "vue-router";
import ReviewBook from "@/views/ReviewBook.vue";
const routes = [
  {
    path: "/",
    name: "reviewbooks",
    component: ReviewBook,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },

  {
    path: "/book/edit/:id",
    name: "book.edit",
    component: () => import("@/views/BookEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },

  {
    path: "/books/add",
    name: "book.add",
    component: () => import("@/views/BookAdd.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Signup.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/detailbook/:id",
    name: "detailbook",
    component: () => import("@/views/DetailBook.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },

  {
    path: "/profile/:id",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
