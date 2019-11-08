<template>
  <div>
    <h2>Movimentações</h2>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-cattleman" label="Pecuarista:" label-for="datalist-cattleman">
        <b-form-input
          v-model="cattlemanSearchText"
          placeholder="Nome ou CPF/CNPJ do pecuarista..."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-eventType" label="Histórico:" label-for="radio-eventType">
        <b-form-radio-group
          id="radio-eventType"
          v-model="form.eventType"
          :options="eventTypeOptions"
          stacked
          @input="getCattleTypes"
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group id="input-group-cattle">
        <b-row>
          <b-col v-for="cattleType in cattleTypes" :key="cattleType.value" cols="1">
            <label>{{ cattleType.text }}</label>
            <b-form-input
              :id="`input-cattleType-${cattleType.value}`"
              v-model.number="form.cattle[cattleType.value]"
              type="number"
              min="0"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group id="input-group-date" label="Data:" label-for="input-date">
        <b-form-input id="input-date" type="date" v-model="form.date"></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-fiscalDocumentType"
        label="Espécie (NFP, GTA):"
        label-for="input-fiscalDocumentType"
      >
        <b-form-input id="input-fiscalDocumentType" type="text" v-model="form.fiscalDocumentType"></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-fiscalDocumentSeries"
        label="Série:"
        label-for="input-fiscalDocumentSeries"
      >
        <b-form-input
          id="input-fiscalDocumentSeries"
          type="text"
          v-model="form.fiscalDocumentSeries"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-fiscalDocumentNumber"
        label="Número:"
        label-for="input-fiscalDocumentNumber"
      >
        <b-form-input
          id="input-fiscalDocumentNumber"
          type="text"
          v-model="form.fiscalDocumentNumber"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-supplier" label="Fornecedor:" label-for="select-supplier">
        <b-form-select
          id="select-supplier"
          v-model="form.supplierId"
          :options="suppliers"
          value-field="id"
          text-field="name"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="success">Salvar</b-button>

      <!-- TODO remover -->
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Events",
  data() {
    return {
      form: {
        cattlemanId: "",
        eventType: "",
        date: "2019-07-16",
        fiscalDocumentType: "",
        fiscalDocumentSeries: "",
        fiscalDocumentNumber: "",
        supplierId: "",
        cattle: {}
      },
      cattlemen: [],
      suppliers: [],
      eventTypeOptions: [],
      cattleTypes: [],
    };
  },
  created() {
    this.$http
      .get("/eventTypes")
      .then(response => (this.eventTypeOptions = response.data));
    this.$http.get("/api/cattlemen").then(
      response =>
        (this.cattlemen = response.data._embedded.cattlemen.map(function(c) {
          return { value: c.name, text: c.name };
        }))
    );
    this.$http
      .get("/api/suppliers")
      .then(response => (this.suppliers = response.data._embedded.suppliers));
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$http.post("/events", this.form);
    },
    getCattleTypes(checked) {
      this.form.cattle = {};
      this.$http
        .get("/cattleTypes?eventType=" + checked)
        .then(response => (this.cattleTypes = response.data));
    }
  }
};
</script>
