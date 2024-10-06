import { createWebHashHistory, createRouter } from "vue-router";

import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Welcome from "./pages/Welcome.vue";
import Home from "./pages/Home.vue";

const routes = [
  { path: "/", name: "welcome", component: Welcome },
  { path: "/register", name: "register", component: Register },
  { path: "/login", name: "login", component: Login },
  { path: "/home", name: "home", component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
