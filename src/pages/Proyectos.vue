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

const projectData = computed(() => {
  return projectStore.projectData;
});
</script>

<template>
  <section class="container__center">
    <h2>Proyectos</h2>

    <!--itera proyectos-->
    <div v-for="project in projectData.projects" :key="project.id">
      <div v-if="project.editing">
        <form @submit.prevent="projectStore.editProjects(project.id, project.name, project.description)">
          <label for="name">Nombre:</label>
          <input id="name" v-model="project.name" type="text" />

          <label for="description">Descripción:</label>
          <textarea id="description" v-model="project.description"></textarea>

          <button type="submit" >Guardar</button>
          <button type="button" @click="project.editing = false">Cancelar</button>
        </form>
      </div>
      <div v-else>
        <button @click="project.editing = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon"/></button>
        <button @click="projectStore.deleteProjects(project.id)"><font-awesome-icon icon="fa-solid fa-xmark" class="icon"/></button>

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
    </div>

  </section>
</template>

<style scoped>
/* reset de estilos del botón */
button {
  background: none;
  border: 0;
  color: inherit;
  cursor: default;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0.3rem;
  -webkit-user-select: none; /* for button */
  -webkit-appearance: button; /* for input */
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>