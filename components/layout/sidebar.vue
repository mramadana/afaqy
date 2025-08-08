<template>
  <div>

      <div class="sidebar" :class="{ 'active': isActive }">

          <!-- ***** close icon to close sidebar ***** -->
          <div class="colse-icon" @click="$emit('toggle-active')"><i class="fas fa-times"></i></div>

          <!-- ***** sidebar logo ***** -->
          <div class="sidebar-logo">
              <nuxt-link to="/" class="logo">
                  <img src="@/assets/images/logo.png" loading="lazy" alt="logo" class="logo-img">
              </nuxt-link>
          </div>
          
          <div ref="linksList" class="links" @scroll="saveScrollPosition">

              <nuxt-link class="link" to="/" :class="{ 'active': isActiveLink('/') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/home.svg" class="colored-svg" alt="hint-img">
                  </div>
                  Home
              </nuxt-link>

              <nuxt-link class="link" v-if="typeCategory == 1 || typeCategory == undefined" to="/categories" :class="{ 'active': isActiveLink('/categories') }">
                  <div class="hint-img">
                    <img src="@/assets/images/sidebar/box.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" v-if="typeCategory == 2" to="/Cuisine" :class="{ 'active': isActiveLink('/Cuisine') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/home.svg" class="colored-svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>
              
              <nuxt-link class="link" v-if="typeCategory == 3" to="/category" :class="{ 'active': isActiveLink('/category') }">
                  <div class="hint-img">
                    <img src="@/assets/images/sidebar/box.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/orders" v-if="typeCategory == 1 || typeCategory == undefined" :class="{ 'active': isActiveLink('/orders') || route.path.startsWith('/orders/orderDetails/') || route.path.startsWith('/productsOrders') || route.path.startsWith('/ReturnOrders') }">
                  <div class="hint-img">
                    <img src="@/assets/images/sidebar/orders.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/FoodOrders" v-if="typeCategory == 2" :class="{ 'active': isActiveLink('/FoodOrders') || route.path.startsWith('/FoodDetails/') }">
                  <div class="hint-img">
                    <img src="@/assets/images/sidebar/orders.svg" alt="hint-img">
                  </div>
                  test 
              </nuxt-link>

              <nuxt-link class="link" to="/ServiceRequests" v-if="typeCategory == 3" :class="{ 'active': isActiveLink('/ServiceRequests') || route.path.startsWith('/DetailsServices') }">
                  <div class="hint-img">
                    <img src="@/assets/images/sidebar/orders.svg" alt="hint-img">
                  </div>
                  test 
              </nuxt-link>

              <nuxt-link class="link" to="/settings" :class="{ 'active': isActiveLink('/settings') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/setting.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/financialTransactions" :class="{ 'active': isActiveLink('/financialTransactions') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/financial.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/contactUs" :class="{ 'active': isActiveLink('/contactUs') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/contact-us.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/Complaints" :class="{ 'active': isActiveLink('/Complaints') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/complaints.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/ratings" :class="{ 'active': isActiveLink('/ratings') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/star.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/profile" :class="{ 'active': isActiveLink('/profile') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/user.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/faq" :class="{ 'active': isActiveLink('/faq') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/message-question.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/terms" :class="{ 'active': isActiveLink('/terms') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/terms.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/about" :class="{ 'active': isActiveLink('/about') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/about.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <nuxt-link class="link" to="/privacyPolicy" :class="{ 'active': isActiveLink('/privacyPolicy') }">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/category-2.svg" alt="hint-img">
                  </div>
                  test
              </nuxt-link>

              <button class="link w-100 logout-text" @click="logout">
                  <div class="hint-img">
                      <img src="@/assets/images/sidebar/logout.svg" alt="hint-img">
                  </div>
                  test
              </button>
          </div>

      </div>

      <div class="overlay-sidebar" @click="$emit('toggle-active')" :class="{ 'show': isActive }"></div>
  </div>
</template>

<script setup>

const props = defineProps({
    isActive: Boolean,
});

const scrollPosition = ref(0);
const linksList = ref(null);
const router = useRouter();
const route = useRoute();

const isActiveLink = (path) => {
if (path === '/') {
  return route.path === path;
}
return route.path.startsWith(path);
};

const emit = defineEmits(['toggle-active']);


// Scroll to the middle of the previously clicked link on mount
const scrollToClickedLink = () => {
const clickedLinkPath = localStorage.getItem('clickedLinkPath');
if (clickedLinkPath) {
  const target = linksList.value.querySelector(`.link[to='${clickedLinkPath}']`);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}
};

const saveScrollPosition = () => {
if (linksList.value) {
  scrollPosition.value = linksList.value.scrollTop;
  localStorage.setItem('sidebarScrollPosition', scrollPosition.value);
}
};

const restoreScrollPosition = () => {
const savedPosition = localStorage.getItem('sidebarScrollPosition');
if (linksList.value && savedPosition !== null) {
  smoothScrollTo(savedPosition);
}
};

// Smooth scroll function
const smoothScrollTo = (position) => {
if (linksList.value) {
  linksList.value.scrollTo({
    top: position,
    behavior: 'smooth',
  });
}
};

const handleRouteChange = () => {
console.log('Route changed:', router);
if (window.innerWidth <= 1250) {
  emit('toggle-active');
  handleResize();
}
};

watch(router, handleRouteChange);

router.afterEach((to, from) => {
    if (window.innerWidth <= 1250) {
    emit('toggle-active');
    handleResize();
    }
});

onMounted(() => {
restoreScrollPosition();
scrollToClickedLink();
});

</script>
