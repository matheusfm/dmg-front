<template>
  <div>
    <b-alert variant="danger" v-model="showErrorAlert" dismissible>Erro ao salvar fornecedor. Tente novamente mais tarde.</b-alert>
    <b-button :pressed.sync="readOnly" variant="outline-primary" class="mb-4" v-if="hasUrlId()">Editar</b-button>
      <b-card class="mb-4">
        <b-form @submit.prevent="onSubmit">
          <div class="text-center text-success my-2" v-if="isBusy">
            <b-spinner variant="success" class="align-middle"></b-spinner>
            <strong>Carregando...</strong>
          </div>
          <b-form-group id="id-input-group" label="ID:" label-for="id-input" v-if="!isBusy && hasUrlId()">
            <b-form-input id="id-input" type="text" v-model="supplier.id" readonly></b-form-input>
          </b-form-group>
          <b-form-group id="code-input-group" label="Código:" label-for="code-input" v-if="!isBusy">
            <b-form-input id="code-input" type="text" v-model="supplier.code" placeholder="123" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-form-group id="name-input-group" label="Nome:" label-for="name-input" v-if="!isBusy">
            <b-form-input id="name-input" type="text" v-model="supplier.name" required placeholder="Nome do fornecedor" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-form-group id="document-type-input-group" label="Tipo de documento:" label-for="document-type-input" v-if="!isBusy">
            <b-form-radio-group :disabled="readOnly" id="document-type-input" v-model="supplier.documentType" :options="documentTypeOptions" name="radio-inline"></b-form-radio-group>
          </b-form-group>
          <b-form-group id="document-input-group" label="Documento:" label-for="document-input" v-if="!isBusy">
            <b-form-input id="document-input" type="text" v-model="supplier.document" required placeholder="Número do CPF ou CNPJ" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-form-group id="zip-input-group" label="CEP:" label-for="zip-input" v-if="!isBusy">
            <b-form-input id="zip-input" type="text" v-model="supplier.zipCode" placeholder="15170-000" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-form-group id="address-input-group" label="Endereço:" label-for="address-input" v-if="!isBusy">
            <b-form-input id="address-input" type="text" v-model="supplier.address" required placeholder="Rua Coronel Militão, 123" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-form-group id="city-input-group" label="Cidade:" label-for="city-input" v-if="!isBusy">
            <b-form-input id="city-input" type="text" v-model="supplier.city" required placeholder="Tanabi" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-form-group id="state-input-group" label="Estado:" label-for="state-input" v-if="!isBusy">
            <b-form-input id="state-input" type="text" v-model="supplier.state" required placeholder="SP" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-form-group id="state-registration-input-group" label="Inscrição Estadual:" label-for="state-registration-input" v-if="!isBusy">
            <b-form-input id="state-registration-input" type="text" v-model="supplier.stateRegistration" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-form-group id="cnae-input-group" label="CNAE:" label-for="cnae-input" v-if="!isBusy">
            <b-form-input id="cnae-input" type="text" v-model="supplier.cnae" :readonly="readOnly"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="success" :disabled="readOnly">Salvar</b-button>
        </b-form>
      </b-card>
  </div>
</template>

<script>
export default {
  name: "SupplierForm",
  data() {
    return {
      isBusy: false,
      readOnly: true,
      showErrorAlert: false,
      documentTypeOptions: ['CPF', 'CNPJ'],
      supplier: {}
    };
  },
  created() {
    if (this.hasUrlId()) {
      this.readOnly = true;
      this.toggleBusy();
      this.$http
        .get("/api/suppliers/" + this.getUrlId())
        .then(response => (this.supplier = response.data))
        .finally(() => this.toggleBusy());
    } else {
        this.readOnly = false;
    }
  },
  methods: {
    onSubmit() {
      this.toggleBusy();
      this.readOnly = true;
      delete this.supplier['_links']
      
      this.$http({method: this.getHttpMethod(), url: this.buildUrl(), data: this.supplier})
      .then(() => this.$router.push("/fornecedores"))
      .catch(() => {
        this.showErrorAlert = true;
        this.readOnly = false;
      })
      .finally(() => this.toggleBusy());
    },
    toggleBusy() {
      this.isBusy = !this.isBusy;
    },
    hasUrlId() {
      return this.$route.params.id != null;
    },
    hasSupplierId() {
      return this.supplier.id != null;
    },
    getUrlId() {
      return this.$route.params.id;
    },
    getHttpMethod() {
      return this.hasUrlId() ? 'PATCH' : 'POST';
    },
    buildUrl() {
      let path = this.hasSupplierId() ? this.supplier.id : "";
      return "/api/suppliers/" + path;
    }
  }
};
</script>