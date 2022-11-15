<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-info">
      <div class="container px-5">
        <a class="navbar-brand text-light fw-bold" href="#">TO DO LIST APP</a>
      </div>
    </nav>
    <main class="container px-5">
      <header class="row my-5">
        <div class="col">
          <h1 class="fw-bold text-start">Activity</h1>
        </div>
        <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
          <button 
            @click="postData"
            class="btn btn-lg px-4 bg-info rounded-pill fw-bold text-light">+ Tambah</button>
        </div>
      </header>
      <main class="row my-5 mx-auto d-flex flex-row">
        <template v-for="post in posts.data">
          <div 
            @click="details"
            :key="post.id"
            class="card rounded-4 m-2 click" 
            style="width: 235px; height: 235px;"
          >
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title text-start fw-bold">{{post.title}}</h5>
              <div class="card-title text-start text-muted d-flex justify-content-between">
                <div>
                  {{post.created_at | formatDate}}
                </div>
                <div @click="deleteData(post.id)" class="click">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </template>
      </main>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    // msg: String
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "https://todo.api.devcode.gethired.id/activity-groups"
        );
        // JSON responses are automatically parsed.
        this.posts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async postData() {
      try {
        await this.$http.post(
          'https://todo.api.devcode.gethired.id/activity-groups', 
          { title: 'New Activity', email: 'hunafa.zaky@gmail.com', _comment: 'new group email'}
        );
        this.getData();
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
    details() {
      console.log('ok');
    }
  },
  created() {
    this.getData();
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
.click {
  cursor: pointer;
}
</style>
