import router from "./router";

router.beforeEach((to, from, next) => {
  const myToken = sessionStorage.getItem('token')

  if (myToken) {
    if (to.path == "/Index") {
      next("/")
    } else {
      next()
    }
  } else {
    if (to.path == "/Index") {
      next()
    } else {
      console.log('....////')
      next()
    }
  }
})