<script setup>
import {computed, onMounted} from "vue";
import {useProjectStore} from '../stores/ProjectStore.js';
import Alert from "../shared/Alert.vue";
import Modal from "../shared/Modal.vue";

const projectStore = useProjectStore();

/**
 * llamar a getProjects en el hook `onMounted` para obtener la información del usuario cuando se monta el componente
 */
onMounted(async () => {
  await projectStore.getProjects();
});

const projectData = computed(() => {
  return projectStore.projectData;
});
</script>

<script>
import {useProjectStore} from '../stores/ProjectStore.js';

export default {
  /**
   * Define las propiedades reactivas del componente
   * @returns {{project_description: string, project_id: string, newProjectModal: boolean, project_palettes: *[], editProjectModal: boolean, project_name: string}}
   */
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
    /**
     * Limpia los campos del formulario para la creación de un nuevo proyecto.
     */
    showNewProject() {
      this.project_name = '';
      this.project_description = '';
      this.newProjectModal = true;
    },
    /**
     * Pre-carga los datos de un proyecto existente en el formulario de edición
     * @param project
     */
    showEditProject(project) {
      this.project_id = project.id;
      this.project_name = project.name;
      this.project_description = project.description;
      this.editProjectModal = true;
    },
    /**
     * Cierra ambos modales: newProjectModal y editProjectModal.
     */
    closeModal() {
      this.newProjectModal = false;
      this.editProjectModal = false;
    },
    /**
     * Utiliza el projectStore (a través de useProjectStore()) para crear un nuevo proyecto con el nombre y descripción ingresados en el formulario.
     * @returns {Promise<void>}
     */
    async createNewProject() {
      await useProjectStore().createNewProject(this.project_name, this.project_description);
      this.closeModal()
    },
    /**
     * Utiliza el projectStore (a través de useProjectStore()) para editar un proyecto existente con la información modificada en el formulario.
     * @returns {Promise<void>}
     */
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
          <font-awesome-icon icon="fa-solid fa-palette" class="icon__paleta" title="ir a añadir paleta"/>
          Añadir paletas
        </button>
      </router-link>

    </article>
    <!-- Modal para la Creacion de Proyectos -->
    <modal :isOpen="newProjectModal" @modal-close="closeModal" name="first-modal">
      <template #header><h2>Nuevo <span class="h2__color__sec">Proyecto_</span></h2></template>
      <template #content><p>Crear nuevo</p>
        <form @submit.prevent="createNewProject">
          <fieldset>
            <label>Nombre del Proyecto:</label><br>
            <input v-model="project_name" type="text" id="project_name" name="project_name" required><br>
            <label>Descripción:</label><br>
            <textarea v-model="project_description" id="project_description" name="project_description" rows="5"
                      cols="50" required></textarea>
            <br>
            <button class="button" type="submit">Crear proyecto</button>
          </fieldset>
        </form>
      </template>
    </modal>

    <!-- Modal para la Edicion de Proyectos -->
    <modal :isOpen="editProjectModal" @modal-close="closeModal" name="first-modal">
      <template #header><h2>Editar <span class="h2__color__sec">Proyecto_</span></h2></template>
      <template #content><p>Cambia los datos del proyecto</p>
        <form @submit.prevent="editProject()">
          <fieldset>
            <label>Nombre del Proyecto:</label><br>
            <input v-model="project_name" type="text" id="project_name" name="project_name" required><br>
            <label>Descripción:</label><br>
            <textarea v-model="project_description" id="project_description" name="project_description" rows="5"
                      cols="50" required></textarea>
            <br>
            <button class="button" type="submit">Aceptar cambios</button>
          </fieldset>
        </form>
      </template>
    </modal>

    <alert></alert>

    <!--itera proyectos-->
    <section v-for="project in projectData.projects" :key="project.id" class="project__container">
      <article class="container__center__text">
        <button class="button__reset" @click="showEditProject(project)">
          <font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon" title="editar proyecto"/>
        </button>
        <button class="button__reset" @click="projectStore.deleteProjects(project.id)">
          <font-awesome-icon icon="fa-solid fa-xmark" class="icon" title="eliminar proyecto"/>
        </button>

        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <p class="p__small">Creado en:
          {{ new Date(project.created_at).toISOString().replace('T', ' - ').substring(0, 18) }}</p>
      </article>
      <!--itera paletas-->
      <section class="container__paletas">
        <div class="container__paletas__color" v-for="palette in project.palettes" :key="palette.id">
          <div class="card__proyecto">
            <button class="button__reset" @click="projectStore.deletePalette(palette.id)">
              <font-awesome-icon icon="fa-solid fa-xmark" class="icon" title="eliminar paleta"/>
            </button>
            <div class="color__palette">
              <div v-for="color in palette.colors" class="color" :style="{ 'background-color': '#' + color.hex }">
                <span class="color__name">{{ '#' + color.hex }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<style scoped>

.icon {
  font-size: 1.5rem;
  padding-right: 0.3rem;
}

.icon:hover {
  cursor: pointer;
}

.project__container{
  width: 67%;
}

.container__paletas__color {
  margin: 0.2rem;
}

.card__proyecto {
  width: 200px;
  padding: 10px;
  background-color: var(--bg-color-medium);
  border-radius: 0.7rem;
}

.container__paletas {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}

.container__center__text {
  align-items: flex-start;
}

.color__palette {
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

.color__name {
  margin-left: 10px;
  color: black;
  font-size: 1rem;
  text-shadow: #a4a4a4 1px 1px;
}

input {
  width: 50%;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;

}

textarea {
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}

@media screen and (max-width: 75rem /*1200px*/
) {
  .container__center{
    padding: 2rem;
  }

  .project__container{
    width: 80%;
  }

  input {
    width: 50%;
  }

  input,
  textarea {
    width: 100%;
  }
}

@media only screen and (max-width: 48rem /*768px*/
) {
  .project__container{
    width: 80%;
  }

  .container__paletas{
    justify-content: space-between;
  }

  input,
  textarea {
    width: 100%;
  }

  form {
    padding: 0;
    margin: 0;
  }
}

@media only screen and (max-width: 29.8125rem /*477px*/
) {
  .project__container{
    width: 100%;
  }
  .container__paletas{
    justify-content: space-between;
  }
}
</style>