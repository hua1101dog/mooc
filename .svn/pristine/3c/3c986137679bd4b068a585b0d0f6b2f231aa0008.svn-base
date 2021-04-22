const base64 = require("js-base64").Base64;

export default {
  data() {
    return {
      otherHeight: 210
    };
  },
  computed: {
    maxHeight() {
      return this.$store.getters["settings/getClientHeight"] - this.otherHeight;
    }
  },
  created() {
    this.assignQuery();
  },
  methods: {
    assignQuery() {
      const query = this.$route.query;
      const currentQuery = {};
      Object.keys(query).forEach(key => {
        if (query.hasOwnProperty(key) && query[key]) {
          try {
            const data = JSON.parse(base64.decode(query[key]));
            if (!data.value) return;
            if (data.type === "string") {
              currentQuery[key] = data.value;
            } else if (data.type === "number") {
              currentQuery[key] = parseFloat(data.value);
            }
          } catch (err) {}
        }
      });
      Object.assign(this.listQuery, currentQuery);
    },
    handleFilter() {
      this.listQuery.currentPage = 1;
      const { path, query } = this.$route;
      const currentQuery = {};
      Object.keys(this.listQuery).forEach(key => {
        currentQuery[key] = base64.encode(
          JSON.stringify({
            type: typeof this.listQuery[key],
            value: this.listQuery[key]
          })
        );
        if (typeof this.listQuery[key] === "string")
          this.listQuery[key] = this.listQuery[key].trim();
      });
      this.$router.push({
        path,
        query: Object.assign({}, query, currentQuery)
      });
      this.getList();
    }
  }
};
