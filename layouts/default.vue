<template>
    <div>

        <LayoutHeader @toggle-active="toggleActive"/>
        

        <div :class="[dynamicClass, {'active': isActive }]">

          <div class="main-content">
            
            <slot />

          </div>

        </div>

        <!-- <LayoutSidebar :is-active="isActive" @toggle-active="toggleActive"  /> -->

    </div>
</template>

<script setup>


const isActive = ref(false);

const toggleActive = () => {
  isActive.value = !isActive.value;
};

</script>



<style>

.fixed_class {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5000;
  transition: all 0.5s;
  transform: translate3d(0, 0, 0);
  height: 100vh;
  background-color: #000;
}
</style>



