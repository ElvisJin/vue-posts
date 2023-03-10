<template v-slot:activator="{ on }">
  <div>
    <v-app-bar flat>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <div class="headline text-uppercase ml-0">
        <div v-resize-text>
          <router-link
            :to="{ name: 'home' }"
            tag="span"
            style="cursor: pointer"
            >{{ appTitle }}</router-link
          >
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
          :class="['hidden-sm-and-down', item.class]"
        >
          <v-icon>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>
        <v-list-item class="hidden-sm-and-down">
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action>
            <v-switch v-model="isDark" inset></v-switch>
          </v-list-item-action>
          <v-icon class="pl-2">mdi-weather-night</v-icon>
        </v-list-item>
        <LocaleChanger />
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="sidebar" absolute disable-resize-watcher>
      <v-list>
        <v-list-item>
          <v-list-item-content>{{ appTitle }}</v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="sidebar = !sidebar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action></v-list-item-action>
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action class="ml-2">
            <v-switch id="themeSwitcher" v-model="isDark" inset></v-switch>
          </v-list-item-action>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LocaleChanger from '@/components/core/LocaleChanger';
import ResizeText from 'vue-resize-text';

export default {
  name: 'Toolbar',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'apple-mobile-web-app-title',
          content: this.$store.getters.appTitle,
        },
        { name: 'application-name', content: this.$store.getters.appTitle },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'favicon', href: '/favicon.ico' },
      ],
    }
  },
  components: {
    LocaleChanger,
  },
  directives: {
    ResizeText,
  },
  data() {
    return {
      isDark: false,
      sidebar: false,
    }
  },
  computed: {
    ...mapGetters(['appTitle']),
    menuItems() {
      return [
        {
          title: this.$t('menuItems.HOME'),
          link: 'home',
          icon: 'mdi-home',
        },
        {
          title: this.$t('menuItems.ABOUT'),
          link: 'about',
          icon: 'mdi-help-circle-outline',
          class: 'btnAbout',
        },
      ]
    },
  },
  watch: {
    isDark() {
      this.$vuetify.theme.dark = this.isDark
      localStorage.setItem('dark', this.isDark)
    },
  },
  created() {
    const dark = localStorage.getItem('dark');
    this.isDark = dark ? JSON.parse(dark) : false
  },
}
</script>
