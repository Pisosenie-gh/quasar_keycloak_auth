
<template>
  <div class="q-pa-md">
    <q-table
title="Response"
:rows="rows"
:columns="columns"
row-key="name"
binary-state-sort
>
<template v-slot:body="props">
<q-tr :props="props" v-on:click="returning(props.row)">
  <q-td key="name" :props="props" >
{{ props.row.id }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.authorId }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.createDate }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.createUser }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.responseState.nameRu }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.responseType.nameRu }}
</q-td>

</q-tr>
</template>
</q-table>
  </div>
  <div class="q-pa-md">
    <q-dialog v-model="dialog">
      <q-layout view="lhh LpR lff" container style="height: 50%" class="bg-grey-3">
        <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">ID {{dialog_data.id}}</div>
        <div class="text-subtitle2">Description: {{dialog_data.description}}</div>
        <div class="text-subtitle2">ApplicantID {{dialog_data.applicantId}}</div>
        <div class="text-subtitle2">Create Date {{dialog_data.createDate}}</div>
      </q-card-section>

      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Response Info" name="one" />
        <q-tab label="Interaction" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <div class="text-subtitle2">Response Type RU {{dialog_data.responseType.nameRu}}</div>
          <div class="text-subtitle2">Response Type KZ {{dialog_data.responseType.nameKz}}</div>
          <div class="text-subtitle2">Response State RU {{dialog_data.responseState.nameRu}}</div>
          <div class="text-subtitle2">Response State KZ {{dialog_data.responseState.nameKz}}</div>
        </q-tab-panel>

        <q-tab-panel name="two">
          <div class="text-subtitle2">Interaction Type RU {{dialog_data.interaction.interactionType.nameRu}}</div>
          <div class="text-subtitle2">Interaction Type KZ {{dialog_data.interaction.interactionType.nameKz}}</div>
          <div class="text-subtitle2">Title: {{dialog_data.interaction.title}}</div>

        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

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
  { name: 'authorId', align: 'center', label: 'authorId', field: 'authorId', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'createDate', label: 'createDate', field: 'createDate' },
  { name: 'createUser', label: 'createUser', field: 'createUser' },
  { name: 'responseState', label: 'responseState', field: 'responseState.nameRu' },
  { name: 'responseType', label: 'responseType', field: 'responseType.nameRu' }
]
export default {

  data () {
    return {
      rows: [],
      dialog_data: [],
      columns
    }
  },

  mounted () {
    const token = localStorage.getItem('token')
    console.log('Bearer ' + JSON.parse(token).access_token)
    axios
      .get('http://10.8.27.97:2929/employee-interaction/v1/response',
        { headers: { Authorization: 'Bearer ' + JSON.parse(token).access_token } })
      .then((response) => {
        this.rows = response.data
      })
  },
  setup () {
    return {
      dialog: ref(false),
      tab: ref('one')
    }
  },
  methods: {
    returning (data) {
      this.dialog_data = data
      this.dialog = true
      console.log(this.dialog_data)
    }
  }
}
</script>
