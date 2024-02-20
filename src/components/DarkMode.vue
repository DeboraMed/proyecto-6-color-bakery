<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const theme = ref(localStorage.getItem('theme') || 'light');
    const toggleSwitchChecked = ref(theme.value === 'dark');

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    const switchTheme = () => {
      theme.value = toggleSwitchChecked.value ? 'dark' : 'light';
      localStorage.setItem('theme', theme.value);
      document.documentElement.setAttribute('data-theme', theme.value);
    };

    return { switchTheme, toggleSwitchChecked };
  },
};
</script>

<template>
  <section>
    <input type="checkbox" id="toggle" v-model="toggleSwitchChecked" @change="switchTheme"/>
  </section>
</template>

<style>
/* Dark Mode CSS*/
[data-theme="dark"] {
  --font-color: #ffffff;
  --font-color-h2-pri: #ffffff;
  --font-color-h2-sec: #ffffff;

  --link-color: #ffffff;
  --link-white-color: #c5bde7;

  --bt-color-1: #333;
  --bt-color-1-hover: #333;
  --bt-color-2: #333;

  --bg-color-1: #333;
  --bg-color-2: #333;
  --bg-color-3: #333;
  --bg-color-4: #333;

}

[data-theme="light"] {
  --font-color: #ffffff;
  --link-color: #7563c7;
  --link-white-color: #c5bde7;
  --bg-color-1: #333;
  --bg-color-2: #333;
  --bg-color-3: #333;
  --bg-color-4: #333;
}

/* Toggle Button */
#toggle {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 60px;
  height: 30px;
  border-radius: 30px;
  background-color: #333;
  position: absolute;
  top: 50px;
  right: 50px;
  transition: all 0.5s ease-in;
  cursor: pointer;
  z-index: 1;
}

/* Making a dot switch inside the Toggle Button */
#toggle::before {
  content: "";
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #EEE;
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translateY(-50%);
  transition: all 0.5s ease-in;
}

/* Changing toggle button background when checked */
#toggle:checked {
  background: #7563c7;
}

/* Changing dot switch color and moving to the right side when checked */
#toggle:checked::before {
  background: #333;
  left: 32px;
}
</style>