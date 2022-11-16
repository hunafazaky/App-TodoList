<template>
  <div class="container px-6">
    <!-- Modals -->
    <div v-if="modalForm" data-cy="modal-add" class="modal d-block shadow-lg" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 data-cy="modal-add-title" v-if="modalForm === 'POST'" class="modal-title fs-5" id="modalLabel">Tambah List Item</h1>
            <h1 v-if="modalForm === 'PATCH'" class="modal-title fs-5" id="modalLabel">Ubah List Item</h1>
            <button data-cy="modal-add-close-button" @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 text-start">
              <label data-cy="modal-add-name-title" for="formTodoItemsTitle" class="form-label fs-6 fw-bold">NAMA LIST ITEM</label>
              <input data-cy="modal-add-name-input" type="email" class="form-control" id="formTodoItemsTitle" placeholder="Tuliskan sesuatu..." v-model="formTodoItems.title">
            </div>
            <div class="row mb-3 text-start">
              <div class="col-md-6">
                <label data-cy="modal-add-priority-title" for="formTodoItemsPriority" class="form-label fs-6 fw-bold">PRIORITY</label>
                <select data-cy="modal-add-priority-drop" class="form-control form-select" id="formTodoItemsPriority" aria-label="Default select example" v-model="formTodoItems.priority">
                  <option class="fw-bold text-danger" value="very-high">Very High</option>
                  <option class="fw-bold text-warning" value="high">High</option>
                  <option class="fw-bold text-success" value="normal">Normal</option>
                  <option class="fw-bold text-info" value="low">Low</option>
                  <option class="fw-bold text-primary" value="very-low">Very Low</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button data-cy="modal-add-save-button" v-if="modalForm === 'POST'" @click="postTodoItems" type="button" class="btn btn-primary rounded-pill">Simpan</button>
            <button data-cy="modal-add-save-button" v-if="modalForm === 'PATCH'" @click="patchTodoItems(formTodoItems.id)" type="button" class="btn btn-primary rounded-pill">Simpan</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Pages -->
    <header class="row my-5">
      <div class="col-sm-12 col-md-6 p-2">
        <h1 class="fw-bold text-start">
          <div class="input-group d-flex">
            <span data-cy="todo-back-button" @click="goBack" class="click mx-2 my-auto" id="postTitle">&lt;</span>
            <template v-if="editTitleForm === false">
              <span data-cy="todo-title" class="mx-2 my-auto">{{post.title}}</span>
              <span data-cy="todo-title-edit-button" @click="openEditTitle" class="click mx-2 my-auto" id="postTitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </span>
            </template>
            <template v-else>
              <input type="text" class="form-control no-border" aria-label="Edit Data" aria-describedby="postTitle" v-model="post.title">
              <span @click="patchActivityGroupsById(post.id)" class="click mx-2 my-auto fw-bold text-success" id="postTitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
              </span>
              <span @click="closeEditTitle" class="click mx-2 my-auto fw-bold text-danger" id="postTitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </span>
            </template>
          </div>
        </h1>
      </div>
      <div data-cy="todo-add-button" class="col-sm-12 col-md-6 p-2 d-grid gap-2 d-md-flex justify-content-md-end">
        <button 
          @click="openModal('POST')"
          type="button" data-bs-toggle="modal" data-bs-target="#modal"
          class="btn btn-lg px-4 bg-info rounded-pill fw-bold text-light">+ Tambah</button>
      </div>
    </header>
    <main>
      <div class="row my-5 d-flex flex-row" v-if="items.data?.length > 0">
        <Loading v-if="loading === true"/>
        <template v-else v-for="item, index in items.data">
          <div :data-cy="'todo-item-'+index" class="col-sm-12 my-2" :key="item.id">
            <div 
              class="card m-auto rounded-4 click shadow" 
              style="width: 100%;"
            >
              <div class="card-body d-flex flex-row justify-content-between">
                <div class="text-start d-flex">
                  <span data-cy="todo-item-checkbox" class="click mx-2 my-auto">
                    <input @click.stop="activeToggle(item.id, item.is_active)" class="form-check-input" type="checkbox" :checked="item.is_active === 0" aria-label="Checkbox for following text input">
                  </span>
                  <span 
                    data-cy="todo-item-priority-indicator"
                    class="mx-2 my-auto" 
                    :class="{'text-danger':item.priority === 'very-high', 'text-warning':item.priority === 'high', 'text-success':item.priority === 'normal', 'text-info':item.priority === 'low', 'text-primary':item.priority === 'very-low'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16"
                  >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                  </span>
                  <span data-cy="todo-item-title" class="mx-2 my-auto" :class="{'text-decoration-line-through':item.is_active === 0}">{{item.title}}</span>
                  <span data-cy="todo-item-edit-button" @click="openModal('PATCH', item)" class="click mx-2 my-auto" id="postTitle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </span>
                </div>
                <div data-cy="todo-item-delete-button" @click.stop="deleteTodoItemsById(item.id)" class="click mx-2 my-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-else data-cy=”todo-empty-state” class="col-sm-12 col-md-6 offset-md-3 my-5 mx-auto">
        <img class="m-auto" alt="Empty Item" src="../assets/todo-empty-state.png">
      </div>
    </main>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'

export default {
  name: 'DetailView',
  components: {
    Loading
  },
  props: {
    // msg: String
  },
  data() {
    return {
      loading: true,
      post: [],
      items: [],
      editTitleForm: false,
      modalForm: false,
      activity_group_id: null,
      formTodoItems: { 
        priority: 'very-high'
      }
    };
  },
  methods: {
    async getActivityGroupsById(id) {
      this.loading = true;
      try {
        const response = await this.$http.get(
          `https://todo.api.devcode.gethired.id/activity-groups/${id}`
        );
        // JSON responses are automatically parsed.
        this.post = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async getTodoItems(id) {
      this.loading = true;
      try {
        const response = await this.$http.get(
          `https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`
        );
        // JSON responses are automatically parsed.
        this.items = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async patchActivityGroupsById(id) {
      try {
        await this.$http.patch(
          `https://todo.api.devcode.gethired.id/activity-groups/${id}`, 
          { title: this.post.title }
        );
        this.getActivityGroupsById(id);
        this.editTitleForm = false;
      } catch (error) {
        console.log(error);
      }
    },
    async activeToggle(id, isActive) {
      try {
        await this.$http.patch(
          `https://todo.api.devcode.gethired.id/todo-items/${id}`, 
          { is_active: !isActive }
        );
        this.getTodoItems(this.activity_group_id);
      } catch (error) {
        console.log(error);
      }
    },
    async postTodoItems() {
      try {
        await this.$http.post(
          'https://todo.api.devcode.gethired.id/todo-items', {
            activity_group_id: this.activity_group_id,
            title: this.formTodoItems.title,
            priority: this.formTodoItems.priority
          }
        );
        this.getTodoItems(this.activity_group_id);
        this.modalForm = false;
        this.formTodoItems = { priority: 'very-high'};
      } catch (error) {
        console.log(error);
      }
    },
    async patchTodoItems(id) {
      try {
        await this.$http.patch(
          `https://todo.api.devcode.gethired.id/todo-items/${id}`, {
            title: this.formTodoItems.title,
            priority: this.formTodoItems.priority
          }
        );
        this.getTodoItems(this.activity_group_id);
        this.modalForm = false;
        this.formTodoItems = { priority: 'very-high'};
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTodoItemsById(id) {
      try {
        await this.$http.delete(
          `https://todo.api.devcode.gethired.id/todo-items/${id}`
        );
        this.getTodoItems(this.activity_group_id);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData(id) {
      try {
        await this.$http.delete(
          `https://todo.api.devcode.gethired.id/activity-groups/${id}`
        );
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
    openEditTitle() {
      this.editTitleForm = true;
    },
    closeEditTitle() {
      this.editTitleForm = false;
    },
    goBack() {
      this.$router.push('/');
    },
    openModal(form, item) {
      if (form === 'PATCH') this.formTodoItems = item;
      this.modalForm = form;
    },
    closeModal() {
      this.modalForm = false;
    }
  },
  created() {
    const thisID = this.$route.params.id;
    this.activity_group_id = thisID;
    this.getActivityGroupsById(thisID);
    this.getTodoItems(thisID);
  }
}

</script>

<style scoped>
  input[type="text"] {
    font-weight: bold;
  }
  .no-border {
    border: 0;
    background-color:  #F4F4F4;
  }
</style>