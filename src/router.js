import { createWebHashHistory, createRouter } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Welcome from "./pages/Welcome.vue";
import Home from "./pages/Home.vue";
import MyProfile from "./pages/MyProfile.vue";
import { suscribeToAuth } from "./services/auth"; 

let isAuthenticated = false; 

suscribeToAuth((userCredentials) => {
  isAuthenticated = !!userCredentials.id; 
});

const routes = [
  { path: "/", name: "welcome", component: Welcome },
  { path: "/register", name: "register", component: Register },
  { path: "/login", name: "login", component: Login },
  { path: "/profile", name: "myprofile", component: MyProfile, meta: { requiresAuth: true } },
  { path: "/home", name: "home", component: Home, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
