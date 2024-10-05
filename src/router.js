import { createWebHashHistory, createRouter } from "vue-router";

import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Welcome from "./pages/Welcome.vue";

const routes = [
  { path: "/", name: "welcome", component: Welcome },
  { path: "/register", name: "register", component: Register },
  { path: "/login", name: "login", component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
