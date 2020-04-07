<template>
  <div>
    This is the Home Page <br>

    Login / Logout <br>
    <button @click="login()">Login</button>

    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },

  mounted() {
    if(localStorage.getItem('token') !== null) {
      // this.$router.replace({name: 'home'});
      console.log("USER LOGGED IN");
    }
  },

  //Login Method

  methods: {
    login() {
      let app = this; // This is so Axios can understand that this is for our Vue instance
      axios.post('/api/login', {
        email: "sam@bloggs.com", // Hard Coded Login
        password: "secret"  // Will attemp login page later
      })
      .then(function(response){
        console.log(response.data);
        app.name = response.data.name;
        app.email = response.data.email;

        // Stores Auth Token in local storage so when a new page is accessed the
        // Site is aware the user is authortized.

        localStorage.setItem('token', response.data.token);
      })
      .catch(function(error){
        console.log(error);
      });
    },
  }
}
</script>

<style>
.home {
  text-align: center;
}
</style>
