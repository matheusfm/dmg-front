<template>
  <div id="app">
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand to="/">DMG</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/pecuaristas">Pecuaristas</b-nav-item>
        <b-nav-item to="/fornecedores">Fornecedores</b-nav-item>
        <b-nav-item to="/movimentacoes">Movimentações</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container class="mt-4">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>