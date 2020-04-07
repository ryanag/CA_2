<template>
  <div>
    Login / Logout <br>
    <button @click="login()">Login</button>

    <button @click="logout()">Logout</button>
    <br>

    View Courses, Lectureres or Enrolments <br>
    <button @click="getCourses()">Get Courses</button>
    <button @click="getLecturers()">Get Lecturers</button>
    <button @click="getEnrolments()">Get Enrolments</button>
    <br><br>

    <ul>
      <li v-for="course in courses"> {{ "ID: " + course.id + " | " + "Title: " + course.title }}
        <button @click="dropCourse()">Delete</button>
        <button>Edit</button> 
      </li>
      <li v-for="lecturer in lecturers"> {{ "ID: " + lecturer.id + " | " + "Name: " + lecturer.name }}
        <button>Delete</button>
        <button>Edit</button>
      </li>
      <li v-for="enrolment in enrolments"> {{ "ID: " + enrolment.id + " | " + "Date: " + enrolment.date }}
        <button>Delete</button>
        <button>Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
  name: 'Example',
  components: {
  },
  data () {
    return {
      name: "",
      email: "",
      courses: [],
      lecturers: [],
      enrolments: [] //Storing and dispalying the data within Vue
    }
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

    // Using axios, connects to courses url, gives it a header using Auth,
    // gives it the token, displaying the response or displaying an error -->

    getCourses() {
      let app = this;
      let token = localStorage.getItem('token');
      axios.get('/api/courses', {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function(response){
        console.log(response);
        app.courses = response.data.data;
      })
      .catch(function(error){
        console.log(error);
      });
    },

    // Failed attempt at creating a Delete button

    // dropCourse() {
    //   let app = this;
    //   let token = localStorage.getItem('token');
    //   function destroy($id) {
    //     courses destroy($id);
    //     return response()->json(['message'=>'course deleted successfully']);
    //   }
    // },

    // Using axios, connects to lecturers url, gives it a header using Auth,
    // gives it the token, displaying the response or displaying an error -->

    getLecturers() {
      let app = this;
      let token = localStorage.getItem('token');
      axios.get('/api/lecturers', {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function(response){
        console.log(response);
        app.lecturers = response.data.data;
      })
      .catch(function(error){
        console.log(error);
      });
    },

    // Using axios, connects to enrolments url, gives it a header using Auth,
    // gives it the token, displaying the response or displaying an error -->

    getEnrolments() {
      let app = this;
      let token = localStorage.getItem('token');
      axios.get('/api/enrolments', {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function(response){
        console.log(response);
        app.enrolments = response.data.data;
      })
      .catch(function(error){
        console.log(error);
      });
    },

    // Logout Method

    logout() {
      let token = localStorage.getItem('token');
      axios.get('/api/logout', {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function(response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      });

      console.log("Logged out");

      localStorage.removeItem('token');
    }
    }
  }
</script>

<style>
  .example {
    text-align: center;
  }
</style>
