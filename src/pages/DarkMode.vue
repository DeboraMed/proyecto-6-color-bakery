<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    /* guarda el tema en el localStorage */
    const theme = ref(localStorage.getItem('theme') || 'light');
    const toggleSwitchChecked = ref(theme.value === 'dark');

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    /* metodo que cambia el tema */
    const switchTheme = () => {
      theme.value = toggleSwitchChecked.value ? 'dark' : 'light';
      localStorage.setItem('theme', theme.value);
      document.documentElement.setAttribute('data-theme', theme.value);
    };
    return {
      switchTheme, toggleSwitchChecked
    };
  },
};
</script>

<template>
  <section>
    <input type="checkbox" class="toggle" v-model="toggleSwitchChecked" @change="switchTheme"/>
  </section>
</template>

<style>
/* Dark Mode CSS*/
[data-theme="light"] {
  --font-color: #000000;
  --font-color-h2-pri: #4c3b9a;
  --font-color-h2-sec: #c2431e;

  --a-color: #4c3b9a;
  --a-color-hover: #747bff;

  --bt-color-1: #ffffff;
  --bt-color-1-after: #7563c7;
  --bt-color-1-before: #4c3b9a;

  --bt-color-2: #fff;
  --bt-color-2-after: #e76c49;
  --bt-color-2-before: #C2431E;

  --bg-color-clear: #FFF8E8;
  --bg-color-medium: #FFEFC9;
  --bg-color-dark: #FCBD7A;

  --ft-bg-color-medium: #4E3D90;
  --ft-bg-color-dark: #2E2067;

}
[data-theme="dark"] {
  --font-color: #ffffff;
  --font-color-h2-pri: #ffffff;
  --font-color-h2-sec: #efce97;

  --a-color: #ffffff;
  --a-color-hover: #c5bde7;

  --bt-color-1: #ffffff;
  --bt-color-1-after: #7563c7;
  --bt-color-1-before: #4c3b9a;

  --bt-color-2: #fff;
  --bt-color-2-after: #e76c49;
  --bt-color-2-before: #C2431E;
  --bg-color-clear: #645c81;
  --bg-color-medium: #524b6e;
  --bg-color-dark: #3F3661;

  --ft-bg-color-medium: #292147;
  --ft-bg-color-dark: #1c1634;
}

/* boton Toggle */
.toggle {
  margin-top: 1rem ;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 60px;
  height: 30px;
  border-radius: 30px;
  background-color: #333;
  position: absolute;
  transition: all 0.5s ease-in;
  cursor: pointer;
  z-index: 1;
}
.toggle::before {
  content: "";
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #efce97;
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translateY(-50%);
  transition: all 0.5s ease-in;
}
.toggle:checked {
  background: #c5bde7;
}
.toggle:checked::before {
  background: #333;
  left: 32px;
}
</style>