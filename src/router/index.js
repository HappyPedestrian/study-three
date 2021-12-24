import VueRouter from 'vue-router'

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: "/",
      name: "Home",
      meta: {
        isMenu: false,
        label: "首页"
      },
      component: () => import("../views/Home/home.vue")
    },
    {
      path: "/besic-modules",
      meta: {
        isMenu: true,
        label: "基础模块"
      },
      name: "BasicModules",
      component: () => import("../views/BasicModules/basicModules.vue")
    },
    {
      path: "/line-modules",
      meta: {
        isMenu: true,
        label: "线条"
      },
      name: "LineModules",
      component: () => import("../views/Line/line.vue")
    },
    {
      path: "/textrue-modules",
      meta: {
        isMenu: true,
        label: "纹理"
      },
      name: "TextrueModules",
      component: () => import("../views/Texture/texture.vue")
    },
    {
      path: "/sprite-modules",
      meta: {
        isMenu: true,
        label: "精灵模型、粒子系统"
      },
      name: "SpriteModules",
      component: () => import("../views/Sprite/sprite.vue")
    },
    {
      path: "/animation-frame-modules",
      meta: {
        isMenu: true,
        label: "帧动画"
      },
      name: "AnimationFrameModules",
      component: () => import("../views/AnimationFrame/animationFrame.vue")
    },
    {
      path: "/bone-animation-modules",
      meta: {
        isMenu: true,
        label: "骨骼动画"
      },
      name: "BoneAnimationModules",
      component: () => import("../views/BoneAnimation/boneAnimation.vue")
    }
  ]
})

export default router;