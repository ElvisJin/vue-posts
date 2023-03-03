<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('about.TITLE')" />
      <Description :description="description" />
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`,
      description: 'This is my simple test vue project.'
    }
  },
}
</script>
