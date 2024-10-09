import { createWebHashHistory, createRouter } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Welcome from "./pages/Welcome.vue";
import Home from "./pages/Home.vue";
import { suscribeToAuth } from "./services/auth";
import MyProfile from "./pages/MyProfile.vue";
import MyProfileEdit from "./pages/MyProfileEdit.vue";

let isAuthenticated = false;

suscribeToAuth((userCredentials) => {
  isAuthenticated = !!userCredentials.id;
});

const routes = [
  { path: "/", name: "welcome", component: Welcome },
  { path: "/register", name: "register", component: Register },
  { path: "/login", name: "login", component: Login },
  {
    path: "/profile",
    name: "MyProfile",
    component: MyProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: MyProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile-edit",
    name: "profile-edit",
    component: MyProfileEdit,
    meta: { requiresAuth: true },
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// es basicamente un middleware que se ejecuta para revisar la autenticacion del user
router.beforeEach((to, from, next) => {
  //to.matched hace referencia a la ruta 'encontrada'
  const requiresAuth = to.matched.some((ruta) => ruta.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
