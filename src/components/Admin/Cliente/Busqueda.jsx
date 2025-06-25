import React from 'react'

const Busqueda = () => {
  return (
    <div>
      <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Filtrar Clientes" aria-label="Search"/>
      <button class="btn btn-outline-primary" type="submit"><i class="bi bi-search"></i></button>
    </form>
  </div>
</nav>
    </div>
  )
}

export default Busqueda
