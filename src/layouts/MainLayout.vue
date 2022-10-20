<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-btn stretch flat to="/login" v-if="!isAuthenticated">Вход</q-btn>
        <q-btn stretch flat @click="logout" v-else>Выйти</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable target="_blank" rel="noopener" href="">
          <q-item-section avatar>
          </q-item-section>
          <q-item-section>
            <router-link to="/response"><q-item-label>Response</q-item-label></router-link>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MyLayout',
  setup () {
    const leftDrawerOpen = ref(false)
    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('auth/signOut')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
}
</script>
