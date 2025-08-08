<template>
    <div class="defaultLayout main-header" :class="{'active': isActive }">
        <header class="header" :class="[headerClass, {'headerAdded': isScrolled}]">
            <div class="inner-header">
                <div class="right-side d-flex align-items-center gap-3 flex-wrap">
                    <button class="nav-btn" @click="toggleActive" :class="{ active: isActive }">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </header>
    </div>
</template>


<script setup>
    
    const isActive = ref(false);

    const emit = defineEmits(['toggle-active']);

    const toggleActive = () => {
        isActive.value = !isActive.value;
        emit("toggle-active");
    };
    
    const isScrolled = ref(false);

    const handleScroll = () => {
        isScrolled.value = window.scrollY > 50;
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

</script>

<style lang="scss">
.add-margin {
    margin-bottom: 40px;
}
.defaultLayout {
    position: sticky;
    top: 0;
    z-index: 10;
}
.header {
    transition: all 0.4s ease-in-out;
    &.headerAdded {
        transform: translateY(10px);
    }
}
</style>
