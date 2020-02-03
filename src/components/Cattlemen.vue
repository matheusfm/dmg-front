<template>
  <div>
    <b-button variant="outline-success" class="mb-3" :to="'/novo/pecuaristas'">Novo</b-button>
    <b-table striped hover :items="cattlemen" :fields="fields" primary-key="id" :busy="isBusy">
      <template v-slot:cell(action)="row">
        <b-button-group>
          <b-button :to="'/pecuaristas/' + row.item.id" variant="outline-success">Abrir</b-button>
          <b-button variant="outline-danger">Excluir</b-button>
        </b-button-group>
      </template>
      <div slot="table-busy" class="text-center text-success my-2">
        <b-spinner variant="success" class="align-middle"></b-spinner>
        <strong>Carregando...</strong>
      </div>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Cattlemen",
  data() {
    return {
      isBusy: false,
      fields: [
        { key: "code", sortable: false, label: "Código" },
        { key: "name", sortable: false, label: "Nome" },
        { key: "address", sortable: false, label: "Endereço" },
        { key: "city", sortable: false, label: "Cidade" },
        { key: "action", label: "Ações" }
      ],
      cattlemen: []
    };
  },
  created() {
    this.toggleBusy()
    this.$http.get("/api/cattlemen")
      .then(response => this.cattlemen = response.data._embedded.cattlemen)
      .finally(() => this.toggleBusy());
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy;
    }
  }
};
</script>
