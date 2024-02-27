<script setup>
import {computed, onMounted} from "vue";
import {useProjectStore} from '../stores/ProjectStore.js';
import Alert from "../shared/Alert.vue";

const projectStore = useProjectStore();

// llamar a fetchUser en el hook `onMounted` para obtener la información del usuario cuando se monta el componente
onMounted(async () => {
  await projectStore.getProjects();
  console.log(projectStore.projectData)
});
// llama a la api con el token del usuario logueado
const projectData = computed(() => {
  return projectStore.projectData;
});
</script>

<template>
  <section class="container__center">
    <h2>Proyectos</h2>

    <!--itera proyectos-->
    <div v-for="project in projectData.projects" :key="project.id">
      <h3>{{ project.name }}</h3>
      <p>{{ project.description }}</p>
      <p>Creado en: {{ project.created_at }}</p>

      <!--itera paletas-->
      <ul v-for="palette in project.palettes" :key="palette.id">

        <!--itera colores de paletas-->
        <li class="main__article__li" v-for="color in palette.colors" :key="color.id"
            :style="{
              backgroundColor: '#'+color.hex,
              width: 47 + '%',
              height: 14 + '%',
           }">
          {{ color.name }}
        </li>
      </ul>
      <alert></alert>
    </div>

  </section>
</template>

<style scoped>

</style>