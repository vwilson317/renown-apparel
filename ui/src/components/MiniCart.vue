<template>
  <div class="col-md-4 order-md-2 mb-4">
    <!-- start of cart section -->
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span>Your cart</span>
      <span class="badge badge-secondary badge-pill">{{cartItems.length}}</span>
    </h4>
    <ul class="list-group mb-3">
      <li
        v-for="(currentItem, index) in cartItems"
        :key="index"
        class="list-group-item d-flex justify-content-between lh-condensed"
      >
        <div>
          <h6 class="my-0">{{currentItem.Name}}</h6>
          <small class="text-muted">{{currentItem.Name}}</small>
        </div>
        <span class="text-muted">${{currentItem.Price}}</span>
      </li>
            <li class="list-group-item d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>${{total}}</strong>
      </li> 

      <!-- <li class="list-group-item d-flex justify-content-between bg-light">
        <div class="text-success">
          <h6 class="my-0">Promo code</h6>
          <small>EXAMPLECODE</small>
        </div>
        <span class="text-success">-$5</span>
      </li>-->
    </ul>

    <!-- <form class="card p-2">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Promo code" />
        <div class="input-group-append">
          <button type="submit" class="btn btn-secondary">Redeem</button>
        </div>
      </div>
    </form> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Minicart',
  computed: {
    cartItems() {
      return this.$store.state.cartItems;
    },
    total() {
      return this.$store.getters.total;
    },
  },
});
</script>