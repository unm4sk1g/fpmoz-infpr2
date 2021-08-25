<template>

  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12" sm="12" lg="12">
        <v-data-table
            class="row-pointer"
            @click:row="goToDeal"
            :headers="headers"
            hide-default-footer
            :items-per-page="60"
            :server-items-length="10000"
            :multi-sort="false"
            @update:page="updatePage"
            @update:options="updateOptions"
            :items="deals">
          <template v-slot:[`item.title`]="{ item }">
            <span class="font-weight-bold">{{ item.title }}</span>
          </template>
          <template v-slot:[`item.salePrice`]="{ item }">
            <span class="font-weight-bold green--text">${{ item.salePrice }}</span>
            <span>({{ Math.round(parseFloat(item.savings)) }}% off)</span>
          </template>
          <template v-slot:[`item.normalPrice`]="{ item }">
            <span>${{ item.normalPrice }}</span>
          </template>
          <template v-slot:[`item.dealRating`]="{ item }">
            <span :class="['font-weight-bold', getRatingColor(item.dealRating)]">{{ item.dealRating }}</span>
          </template>
          <template v-slot:[`item.releaseDate`]="{ item }">
            <span>{{ formatDate(item.releaseDate, false) }}</span>
          </template>
          <template v-slot:[`item.lastChange`]="{ item }">
            <span>{{ formatDate(item.lastChange, true) }}</span>
          </template>
        </v-data-table>
        <v-pagination :length="5" :total-visible="null"
                      @input="goToPage"
                      :value="currentPage" @next="goToNextPage" @previous="goToPreviousPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from "moment";

export default {
  data: () => ({
    currentPage: 1,
    headers: [
      {
        text: 'Game ID',
        value: 'gameID',
        sortable: false,
      },
      {
        text: 'Naziv igre',
        value: 'title'
      },
      {
        text: 'Cijena sa popustom',
        value: 'salePrice',
      },
      {
        text: 'Normalna cijena',
        value: 'normalPrice',
        sortable: false
      },
      {
        text: 'Ocjena popusta',
        value: 'dealRating'
      },
      {
        text: 'Datum izlaska',
        value: 'releaseDate'
      },
      {
        text: 'Zadnja promjena',
        value: 'lastChange'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      "deals": "games/deals",
    })
  },
  methods: {
    ...mapActions({
      "getDeals": "games/getDeals",
      "addAlert": "common/addAlert",
    }),
    formatDate(date, ago) {
      return ago ? moment(date * 1000).fromNow() : moment(date * 1000).format("DD MMM YYYY HH:ss")
    },
    goToDeal(deal) {
      return window.open(`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`);
    },
    updatePage(page) {
      this.currentPage = page;
    },
    goToPage(page) {
      this.getDeals({pageNumber: page});
      this.currentPage = page;
    },
    updateOptions(options) {
      if (options.sortBy.length > 0) {
        let sortField;
        switch(options.sortBy[0]) {
          case 'dealRating':
            sortField = 'Deal Rating';
            break;
          case 'title':
            sortField = 'Title';
            break;
          case 'salePrice':
            sortField = 'Price';
            break;
          case 'releaseDate':
            sortField = 'Release';
            break;
          case 'lastChange':
            sortField = 'recent';
            break;
        }
        let sortDirection = options.sortDesc[0] ? 1 : 0;
        this.getDeals({sortBy: sortField, desc: sortDirection, pageNumber: this.currentPage})
      } else {
        return false;
      }
    },
    goToNextPage() {
      this.getDeals({pageNumber: this.currentPage + 1}).then(() => {
        this.currentPage = this.currentPage + 1;
      });
    },
    goToPreviousPage() {
      if (this.currentPage === 1) {
        return false;
      } else {
        this.getDeals({pageNumber: this.currentPage + 1}).then(() => {
          this.currentPage = this.currentPage - 1;
        })
      }
    },
    getRatingColor(rating) {
      rating = parseInt(rating, 2)
      if (rating < 2) {
        return 'red--text'
      } else if (rating >= 2 && rating < 4) {
        return 'orange--text'
      } else if (rating >= 4 && rating < 6) {
        return 'yellow--text'
      } else if (rating >= 6 && rating < 8) {
        return 'lime--text'
      } else {
        return 'green--text'
      }
    }
  },
  mounted() {
    this.addAlert({
      type: "warning",
      message: "Bug sa sortiranjem je izazvan caching-om na Public API-u."
    })
    this.getDeals();
  }
}
</script>

<style scoped lang="scss">

</style>
