<template>
  <div class="container px-6">
    <header class="row my-5">
      <div class="col-sm-12 col-md-6 p-2">
        <h1 class="fw-bold text-start">Activity</h1>
      </div>
      <div class="col-sm-12 col-md-6 p-2 d-grid gap-2 d-md-flex justify-content-md-end">
        <button 
          @click="postActivityGroups"
          class="btn btn-lg px-4 bg-info rounded-pill fw-bold text-light">+ Tambah</button>
      </div>
    </header>
    <main class="row my-5 d-flex flex-row">
      <Loading v-if="loading === true"/>
      <template v-else v-for="post in posts.data">
        <div class="col-sm-12 col-md-6 col-lg-3 p-2" :key="post.id">
          <div 
            @click="detail(post.id)"
            class="card m-auto rounded-4 click shadow" 
            style="width: 235px; height: 235px;"
          >
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title text-start fw-bold">{{post.title}}</h5>
              <div class="card-title text-start text-muted d-flex justify-content-between">
                <span class="fs-6 my-auto">{{post.created_at | formatDate}}</span>
                <span @click.stop="deleteActivityGroupsById(post.id)" class="click my-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue';

export default {
  name: 'HomeView',
  components: {
    Loading
  },
  props: {
    // msg: String
  },
  data() {
    return {
      posts: [],
      loading: true
    };
  },
  methods: {
    async getActivityGroups() {
      this.loading = true;
      try {
        const response = await this.$http.get(
          "https://todo.api.devcode.gethired.id/activity-groups"
        );
        // JSON responses are automatically parsed.
        this.posts = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async postActivityGroups() {
      try {
        await this.$http.post(
          'https://todo.api.devcode.gethired.id/activity-groups', 
          { title: 'New Activity', email: 'hunafa.zaky@gmail.com', _comment: 'new group email'}
        );
        this.getActivityGroups();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteActivityGroupsById(id) {
      try {
        await this.$http.delete(
          `https://todo.api.devcode.gethired.id/activity-groups/${id}`
        );
        this.getActivityGroups();
      } catch (error) {
        console.log(error);
      }
    },
    detail(id) {
      this.$router.push('/detail/' + id)
    }
  },
  created() {
    this.getActivityGroups();
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
