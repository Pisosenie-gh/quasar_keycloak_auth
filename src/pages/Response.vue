<template>

  <div class="col-lg-12">
      <div class="card">
          <div class="card-header">
              <h3 class="card-title"></h3>
          </div>
          <div class="card-body">
              <table class="table table-hover">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Author Id</th>
                      <th>createUser</th>
                      <th>updateUser</th>
                      <th>createApp</th>
                      <th>updateApp</th>
                      <th>Data Load</th>
                      <th>Message Code</th>
                      <th>Log Type</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="list in lists" :key="list.id">
                      <td>{{list.id}}</td>
                      <td>{{list.authorId}}</td>
                      <td>{{list.createUser}}</td>
                      <td>{{list.updateUser}}</td>
                      <td>{{list.createApp}}</td>
                      <td>{{list.updateApp}}</td>
                      <td>{{list.data_load}}</td>
                      <td>{{list.msg_code}}</td>
                      <td>{{list.log_type}}</td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>

</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    const token = localStorage.getItem('token')
    console.log('Bearer ' + JSON.parse(token).access_token)
    axios
      .get('http://10.8.27.97:2929/employee-interaction/v1/response/',
        { headers: { Authorization: 'Bearer ' + JSON.parse(token).access_token } })
      .then((response) => {
        this.lists = response.data
      })
  }
}
</script>
