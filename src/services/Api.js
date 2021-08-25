import axios from "axios";

export default {
    getDeals(params) {
        return axios.get("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=60", {params: params});
    },
}
