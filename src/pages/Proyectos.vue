<script setup>
import {computed, onMounted} from "vue";
import {useProjectStore} from '../stores/ProjectStore.js';
import Alert from "../shared/Alert.vue";
import Modal from "../shared/Modal.vue";

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

<script>
import {useUserStore} from "../stores/UserStore.js";
import {useProjectStore} from '../stores/ProjectStore.js';
import axios from "axios";

export default {
  data() {
    return {
      newProjectModal: false,
      editProjectModal: false,
      project_name: '',
      project_description: '',
      project_palettes: [],
      project_id: ''
    }
  },
  methods: {
    showNewProject() {
      this.project_name = '';
      this.project_description = '';
      this.newProjectModal = true;
    },
    showEditProject(project) {
      this.project_id = project.id;
      this.project_name = project.name;
      this.project_description = project.description;
      this.editProjectModal = true;
    },
    closeModal() {
      this.newProjectModal = false;
      this.editProjectModal = false;
    },
    async createNewProject() {
      await useProjectStore().createNewProject(this.project_name, this.project_description);
      this.closeModal()
    },
    async editProject() {
      await useProjectStore().editProject(this.project_id, this.project_name, this.project_description);
      this.closeModal()
    },
  }
}
</script>

<template>
  <section class="container__center">
    <article >
    <h2>Crea tu nuevo proyecto y <span class="h2__color__sec">añade tus paletas</span> favoritas_</h2>
    <p>Desde aqui puedes añadir un nuevo proyecto o editar los existentes. Tambien puedes añadir nuevas paletas.</p>

    <button class="button" @click="showNewProject">Nuevo Proyecto</button>

    <router-link to="/" custom v-slot="{ navigate }">
      <button class="button" @click="navigate" role="link">
        <font-awesome-icon icon="fa-solid fa-palette" class="icon" title="ir a añadir paleta"/>Añadir paletas</button>
    </router-link>
      
    </article>
    <!-- Modal para la Creacion de Proyectos -->
    <modal :isOpen="newProjectModal" @modal-close="closeModal" name="first-modal">
      <template #header><h2>Nuevo Proyecto_</h2></template>
      <template #content><p>Crear nuevo</p>
        <form @submit.prevent="createNewProject">
          <fieldset class="section__article">
            <label>Nombre del Proyecto:</label><br>
            <input v-model="project_name" type="text" id="project_name" name="project_name" required><br>
            <label>Descripción:</label><br>
            <textarea v-model="project_description" id="project_description" name="project_description" rows="5" cols="50" required></textarea>
            <br>
            <button class="button" type="submit">Crear proyecto</button>
          </fieldset>
        </form>
      </template>
    </modal>

    <!-- Modal para la Edicion de Proyectos -->
    <modal :isOpen="editProjectModal" @modal-close="closeModal" name="first-modal">
      <template #header><h2>Editar Proyecto_</h2></template>
      <template #content><p>Cambia los datos del proyecto</p>
        <form @submit.prevent="editProject()">
          <fieldset class="section__article">
            <label>Nombre del Proyecto:</label><br>
            <input v-model="project_name" type="text" id="project_name" name="project_name" required><br>
            <label>Descripción:</label><br>
            <textarea v-model="project_description" id="project_description" name="project_description" rows="5" cols="50" required></textarea>
            <br>
            <button class="button" type="submit">Aceptar cambios</button>
          </fieldset>
        </form>
      </template>
    </modal>

    <alert></alert>

    <!--itera proyectos-->
    <article v-for="project in projectData.projects" :key="project.id" class="card container_project">

        <button class="button__reset" @click="showEditProject(project)"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon" title="editar proyecto"/></button>
        <button class="button__reset" @click="projectStore.deleteProjects(project.id)"><font-awesome-icon icon="fa-solid fa-xmark" class="icon" title="eliminar proyecto"/></button>

        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <p>Creado en: {{ new Date(project.created_at).toISOString().replace('T', ' - ').substring(0, 18) }}</p>
        <!--itera paletas-->
        <ul v-for="palette in project.palettes" :key="palette.id">

          <!--boton: eliminar paleta-->
          <button class="button__reset" @click="projectStore.deletePalette(palette.id)"><font-awesome-icon icon="fa-solid fa-xmark" class="icon" title="eliminar paleta"/></button>

          <!--itera colores de paletas-->
          <li class="main__article__li" v-for="color in palette.colors" :key="color.id"
              :style="{
                backgroundColor: '#'+color.hex,
                width: 47 + '%',
                height: 14 + '%'
             }">
            {{ color.name }}
          </li>
        </ul>
    </article>

  </section>
</template>

<style scoped>
.content__article{
  padding-top: 4rem;
}
/* reset de estilos del botón */
.button__reset {
  background: none;
  border: 0;
  color: inherit;
  cursor: default;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0.3rem;
  -webkit-user-select: none;
  -webkit-appearance: button;
  -moz-user-select: none;
  -ms-user-select: none;
}
.icon{
  padding-right: 0.3rem;
}
.icon:hover{
  cursor:pointer;
}
</style>