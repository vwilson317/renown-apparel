<template>
  <b-col v-show="!item.isInCart" class="listing-item-container" cols="10" sm="3">
    <div class="shine">
      <figure>
        <b-img
          fluid
          class="banner-img box-shadow"
          :src="item.ImageUrls[0]"
          @click="itemClick(item)"
        />
      </figure>
      <!-- <b-popover
          :target="getTargetId"
          placement="rightbottom"
          title="Add item to cart"
          triggers="hover focus"
      ></b-popover>-->
    </div>
    <div class="detail-container">
      <b-row align-content="center">
        <b-col class="detail-col" sm="12">
          <div class="divider"></div>
          <h5>{{shortenName(item.Name)}}</h5>
          <h6>${{item.Price}}</h6>
          <AddToCardButton is-small :item="item" />
        </b-col>
      </b-row>
    </div>
  </b-col>
</template>

<script lang="ts">
import Vue from 'vue';
import { IListing } from '../business-logic/getListings';
import router from '../router';
import store from '../store';
import AddToCardButton from '../components/AddToCartButton.vue';

// const getTargetId = (obj: any): string => {
//   return 'popover-' + obj.index;
// };

const shortenName = (input: string): string => {
  const parts = input.split(' ');
  return [parts[0], parts[1], parts[2]].join(' ');
};

export default Vue.extend({
  name: 'Listing',
  props: {
    item: Object as () => IListing,
    index: Number,
  },
  data() {
    return {};
  },
  methods: {
    itemClick: (item: IListing): void => {
      router.push({ name: 'detail', params: { id: item.id } });
    },

    shortenName,
    // getTargetId,
  },
  components: {
    AddToCardButton,
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.banner-img {
  margin-top: 2em;

  :hover {
    cursor: pointer;
  }

  .detail-container {
    margin-top: 2em;
  }
}



/* Shine */
// figure {
//     width: 100%;
//     height: 100%;
//     margin: 0;
//     padding: 0;
//     overflow: hidden;
// }

// .shine {
// 	position: relative;
// }

// .shine figure::after {
// 	position: absolute;
// 	top: 0;
// 	left: -75%;
// 	z-index: 2;
// 	display: block;
// 	content: '';
// 	width: 50%;
// 	height: 100%;
// 	background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
// 	background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
// 	-webkit-transform: skewX(-25deg);
// 	transform: skewX(-25deg);
// }

// .shine figure:hover::after {
// 	-webkit-animation: shine .75s;
// 	animation: shine .75s;
// }

/* Zoom In */
.shine img {
  // -webkit-transform: scale(.8);
  // transform: scale(.8);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.shine:hover img {
  -webkit-transform: scale(1.08);
  transform: scale(1.08);
}

@-webkit-keyframes shine {
  100% {
    left: 125%;
  }
}

@keyframes shine {
  100% {
    left: 125%;
  }
}
</style>