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
    <article>
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

    <article v-for="project in projectData.projects" :key="project.id" class="project__container">
      <!--itera proyectos-->
      <section class="container__center card_project container_project">
        <article>
          <button class="button__reset" @click="showEditProject(project)">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon" title="editar proyecto"/>
          </button>
          <button class="button__reset" @click="projectStore.deleteProjects(project.id)">
            <font-awesome-icon icon="fa-solid fa-xmark" class="icon" title="eliminar proyecto"/>
          </button>

          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <p>Creado en: {{ new Date(project.created_at).toISOString().replace('T', ' - ').substring(0, 18) }}</p>
          <!--itera paletas-->
        </article>
        <section class="container__center container_project">
          <div v-for="palette in project.palettes" :key="palette.id" style="padding: 1rem;">
            <button class="button__reset" @click="projectStore.deletePalette(palette.id)">
              <font-awesome-icon icon="fa-solid fa-xmark" class="icon" title="eliminar paleta"/>
            </button>
            <div class="card">
              <div class="color-palette">
                <div v-for="color in palette.colors" class="color" :style="{ 'background-color': '#' + color.hex }">
                  <span class="color-name">{{ '#' + color.hex }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </article>
  </section>
</template>

<style scoped>
.project__container{
  padding-top: 1rem;
  width: 80%;
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

.icon:hover {
  cursor: pointer;
}


/*estilos card*/
.card_project {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.card_project:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container_project {
  padding: 2px 16px;
}


.card {
  width: 200px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.color-palette {
  display: flex;
  flex-direction: column;
}

.color {
  height: 30px;
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.color-name {
  margin-left: 10px;
  text-shadow: -1px 0 dimgrey, 0 1px dimgrey, 1px 0 dimgrey, 0 -1px dimgrey;
}

</style>