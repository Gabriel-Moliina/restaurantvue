<template lang="html">

  <section class="src-components-restaurant-view">
    <div class="saloon container-fluid text-center">
      <div class="row row-cols-1 row-cols-md-3 mt-3">
        <div class="col p-4">
          <span class="h4">Livres</span>
          <div class="row row-cols-1 row-cols-md-2 row-gap-3 mt-5">
            <div v-for="table in freeTables" class="col">
              <div class="table-reserve table-reserve-free">
                <div class="row justify-content-end m-1 fs-3">
                  {{ table.identification }}
                </div>
                <div class="row">
                  Cadeiras: {{ table.capacity }}
                </div>
                <div class="row justify-content-end m-1">
                  <div class="col-3 col-md-3">
                    <button type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="modal"
                      data-bs-target="#modalEditTable">Editar</button>
                  </div>
                  <div class="col-3 col-md-4">
                    <button type="button" class="btn btn-success btn-sm">Reservar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col p-4">
          <span class="h4">Reservadas</span>
          <div class="row row-cols-1 row-cols-md-2 row-gap-3 mt-5">
            <div v-for="table in reservedTables" class="col">
              <div class="table-reserve table-reserve-reserved">
                <div class="row justify-content-end m-1 fs-3">
                  {{ table.identification }}
                </div>
                <div class="row">
                  Cadeiras: {{ table.capacity }}
                </div>
                <div class="row justify-content-end m-1">
                  <div class="col-3 col-md-3">
                    <button type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="modal"
                      data-bs-target="#modalEditTable">Editar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col p-4">
          <span class="h4">Ocupadas</span>
          <div class="row row-cols-1 row-cols-md-2 row-gap-3 mt-5">
            <div v-for="table in busyTables" class="col">
              <div class="table-reserve table-reserve-busy">
                <div class="row justify-content-end m-1 fs-3">
                  {{ table.identification }}
                </div>
                <div class="row">
                  Cadeiras: {{ table.capacity }}
                </div>
                <div class="row justify-content-end m-1">
                  <div class="col-3 col-md-3">
                    <button type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="modal"
                      data-bs-target="#modalEditTable">Editar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>



  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> -->

  <div class="modal fade" id="modalEditTable" tabindex="-1" aria-labelledby="modalEditTable" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditTableLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          teste
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import RestaurantApi from '@/api/RestaurantApi';


export default {
  name: 'src-components-restaurant-view',
  props: [],
  mounted() {
    const id = this.$route.params.id
    RestaurantApi.GetById(id).then(response => {
      this.freeTables = response.data.data.tables.filter(x => x.status == 0);
      this.busyTables = response.data.data.tables.filter(x => x.status == 1);
      this.reservedTables = response.data.data.tables.filter(x => x.status == 2);
      console.log(response.data.data.tables)
    })
  },
  data() {
    return {
      freeTables: [],
      reservedTables: [],
      busyTables: []
    }
  },
  methods: {

  },
  computed: {

  }
}


</script>

<style scoped>
.table-reserve {
  background-color: rgb(255, 255, 255);
  border: solid;
  border-width: 2px;
  border-radius: 15px;
  height: 150px;
  padding: 15px;
}

.table-reserve-free {
  border-color: rgb(60, 211, 0);
}

.table-reserve-reserved {
  border-color: rgb(216, 184, 0);
}

.table-reserve-busy {
  border-color: rgb(211, 0, 0);
}
</style>
