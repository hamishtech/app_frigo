import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueLayers from "vuelayers";
import "vuelayers/dist/vuelayers.css"; // needs css-loader
import { Map, TileLayer, OsmSource, Geoloc } from "vuelayers";
import { ImageLayer } from "vuelayers";
import vueFabricWrapper from "vue-fabric-wrapper";
import VueKonva from "vue-konva";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import LDrawToolbar from "vue2-leaflet-draw-toolbar";
import { DrawInteraction } from "vuelayers";
import vuetify from './plugins/vuetify'

Vue.use(VueKonva);

Vue.use(VueLayers);
Vue.component("l-draw-toolbar", LDrawToolbar);

Vue.use(vueFabricWrapper);
Vue.use(Map);
Vue.use(TileLayer);
Vue.use(OsmSource);
Vue.use(Geoloc);
Vue.use(ImageLayer);

Vue.use(DrawInteraction);

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
