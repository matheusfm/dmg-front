<template>
  <div>
    <b-button variant="outline-success" class="mb-3" :to="'/novo/fornecedores'">Novo</b-button>
    <b-table striped hover :items="suppliers" :fields="fields" primary-key="id" :busy="isBusy">
      <template v-slot:cell(action)="row">
        <b-button-group>
          <b-button :to="'/fornecedores/' + row.item.id" variant="outline-success">Abrir</b-button>
          <b-button @click="delete(row.item.id)" variant="outline-danger">Excluir</b-button>
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
  name: "Suppliers",
  data() {
    return {
      isBusy: false,
      fields: [
        { key: "name", sortable: false, label: "Nome" },
        { key: "address", sortable: false, label: "Endereço" },
        { key: "city", sortable: false, label: "Cidade" },
        { key: "action", sortable: false, label: "Ações" }
      ],
      suppliers: []
    };
  },
  created() {
    this.toggleBusy();
    this.$http.get("/api/suppliers")
      .then(response => this.suppliers = response.data._embedded.suppliers)
      .finally(() => this.toggleBusy());
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy;
    },
    delete(id) {
      //FIXME
      this.toggleBusy();
      this.$http.delete("/api/suppliers/" + id)
      .finally(() => this.toggleBusy());
    }
  }
};
</script>
