
<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import axios from 'axios'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'id',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'applicantId', align: 'center', label: 'applicantId', field: 'applicantId', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'createApp', label: 'createApp', field: 'createApp', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'createDate', label: 'createDate', field: 'createDate' },
  { name: 'createUser', label: 'createUser', field: 'createUser' },
  { name: 'description', label: 'description', field: 'description' },
  { name: 'responseState', label: 'responseState', field: 'responseState.nameRu' },
  { name: 'responseType', label: 'responseType', field: 'responseType.nameRu' }
]
export default {

  data () {
    return {
      rows: [],
      columns
    }
  },
  mounted () {
    const token = localStorage.getItem('token')
    console.log('Bearer ' + JSON.parse(token).access_token)
    axios
      .get('http://10.8.27.97:2929/employee-interaction/v1/request/?applicantEmployeeId=2202',
        { headers: { Authorization: 'Bearer ' + JSON.parse(token).access_token } })
      .then((response) => {
        this.rows = response.data
        console.log(this.rows)
      })
  }
}
</script>
