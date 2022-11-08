
<template>
  <div class="q-pa-md">
    <q-table
title="Request"
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
{{ props.row.applicantId }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.number }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.createDate }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.requestType.nameRu }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.requestType.requestGroup.nameRu }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.requestState.nameRu }}
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
        <div class="text-subtitle2">NUMBER {{dialog_data.number}}</div>
        <div class="text-subtitle2">ApplicantID {{dialog_data.applicantId}}</div>
        <div class="text-subtitle2">Create Date {{dialog_data.createDate}}</div>
      </q-card-section>

      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Request Info" name="one" />
        <q-tab label="Interaction" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <div class="text-subtitle2">Request Type RU {{dialog_data.requestType.nameRu}}</div>
          <div class="text-subtitle2">Request Type KZ {{dialog_data.requestType.nameKz}}</div>
          <div class="text-subtitle2">Request Group RZ {{dialog_data.requestType.requestGroup.nameRu}}</div>
          <div class="text-subtitle2">Request Group KZ {{dialog_data.requestType.requestGroup.nameKz}}</div>
          <div class="text-subtitle2">Request State RU {{dialog_data.requestState.nameRu}}</div>
          <div class="text-subtitle2">Request State KZ {{dialog_data.requestState.nameKz}}</div>
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
  { name: 'applicantId', align: 'center', label: 'applicantId', field: 'applicantId', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'number', align: 'center', label: 'number', field: 'number', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'createDate', label: 'createDate', field: 'createDate' },
  { name: 'requestType', label: 'requestType', field: 'requestType' },
  { name: 'requestGroup', label: 'requestGroup', field: 'requestGroup' },
  { name: 'requestState', label: 'requestState', field: 'requestState.nameRu' }
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
      .get('http://10.8.27.97:2929/employee-interaction/v1/request/?applicantEmployeeId=2202',
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
