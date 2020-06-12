<!--  -->
<template>
  <div>
    <h1 v-for="(item, index) in questions" :key="index">
      {{ item.question }}TypeContent
    </h1>
    <!-- <router-link to="/type-content/commit">commit</router-link>
    <router-link to="/type-content/answer">answer</router-link> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      listsContent: [],
      id: this.$route.query.id,
      questions: []
    };
  },

  components: {},

  computed: {},

  created() {
    this.getListsContent();
    // alert(this.$route.query.id);
    // console.log(this.id);
  },

  mounted() {},

  methods: {
    getListsContent() {
      this.axios({
        method: "POST",
        url: "http://localhost:8080/api/list/" + this.id,
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {}
      }).then(res => {
        this.listsContent = res.data.data;
        this.questions = this.listsContent.oneList;
        console.log(this.listsContent);
      });
    },
    set() {
      alert(this.$route.params.id);
    }
  }
};
</script>
<style lang="scss" scoped></style>
