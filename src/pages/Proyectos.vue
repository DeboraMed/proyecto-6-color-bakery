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
        try {
          const config = {
            headers: {Authorization: `Bearer ${useUserStore().token}`}
          };
          const response = await axios.post('/api/v1/projects', {
            name: this.project_name,
            description: this.project_description
          }, config);
          await useProjectStore().getProjects();
          this.closeModal()

          console.log(response.data); // Hacer algo con la respuesta del servidor si es necesario
        } catch (error) {
          console.error('Error al crear proyecto:', error);
        }
    },
    async editProject() {
      try {
        const config = {
          headers: {Authorization: `Bearer ${useUserStore().token}`}
        };
        const response = await axios.put('/api/v1/projects/' + this.project_id, {
          name: this.project_name,
          description: this.project_description
        }, config);
        await useProjectStore().getProjects();
        this.closeModal()

        console.log(response.data); // Hacer algo con la respuesta del servidor si es necesario
      } catch (error) {
        console.error('Error al crear proyecto:', error);
      }
    }
  }
}
</script>

<template>
  <section class="container__center">
    <h2>Proyectos</h2>

    <button class="button" @click="showNewProject">Nuevo Proyecto</button>

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

    <!--itera proyectos-->
    <div v-for="project in projectData.projects" :key="project.id" class="card container_project">

        <button @click="showEditProject(project)"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon"/></button>
        <button @click="projectStore.deleteProjects(project.id)"><font-awesome-icon icon="fa-solid fa-xmark" class="icon"/></button>

        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <p>Creado en: {{ new Date(project.created_at).toISOString().replace('T', ' - ').substring(0, 18) }}</p>
        <!--itera paletas-->
        <ul v-for="palette in project.palettes" :key="palette.id">

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
        <alert></alert>
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

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.container_project {
  padding: 2px 16px;
}
</style>