<template>
  <div>
    <v-row>
      <v-col cols="4">
        <!-- select the active floor/shop  -->
        <v-select
          v-model="activeShop"
          :items="shops"
          item-text="label"
          item-value="id"
          label="Choisir un magasin"
        ></v-select>
      </v-col>
    </v-row>

    <!-- the canvas -->
    <div class="stage-parent">
      <v-stage
        :config="configStage"
        ref="stage"
        @mousedown="handleStageMouseDown"
        @touchstart="handleStageMouseDown"
        @contextmenu="stopBrowserMenu"
      >
        <v-layer>
          <v-rect :config="configBackground" ref="background"></v-rect>
          <v-rect
            v-for="item in fridges"
            :key="item.id"
            :config="item"
            @mouseenter="addMousePointerStyle"
            @mouseleave="removeMousePointerStyle"
            @mouseover="openShapeInfoPopup"
            @mouseout="closeInfoPopup"
            @contextmenu="openShapeContextMenu"
            @dragend="handleDragEnd"
            @transformend="handleTransformEnd"
          />
          <v-transformer ref="transformer" />
        </v-layer>
      </v-stage>

      <!-- the context menus and popups -->
      <div
        class="interaction-menu"
        v-if="infoPopup.show"
        :style="{
          left: infoPopup.left,
          top: infoPopup.top,
          width: '200px',
        }"
      >
        <div>
          <v-card color="light">
            <v-card-title>{{ selectedShape.name }}</v-card-title>
            <v-card-text>
              <div>Consumption: {{ selectedShape.consumption }}</div>
              <div>Temperature: {{ selectedShape.temperature }}°C</div>
              <div>Ambience: {{ selectedShape.ambience }}</div>
              <div>Soufflage: {{ selectedShape.soufflage }}</div>
              <v-progress-linear
                :value="selectedShape.doors"
                color="green"
                height="5"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div
        v-if="shapeContextMenu.show"
        :style="{
          left: shapeContextMenu.left,
          top: shapeContextMenu.top,
          width: '100px',
        }"
        class="interaction-menu"
      >
        <v-list>
          <v-list-item link @click="handleDelete">
            <v-list-item-title>Delete </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <div
        v-if="backgroundContextMenu.show"
        :style="{
          left: backgroundContextMenu.left,
          top: backgroundContextMenu.top,
          width: 'px',
        }"
        class="interaction-menu"
      >
        <v-list>
          <v-list-item link @click="addFridge">
            <v-list-item-title>Ajouter meuble </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mockData } from "../data/mock_data.js";
export default {
  data() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    return {
      configStage: {
        width,
        height,
      },
      mockData: JSON.parse(localStorage.getItem("mockData")) ?? mockData,
      configBackground: {
        x: 0,
        y: 0,
        width,
        height,
        name: "background",
      },
      selectedShapeId: null,
      shops: [
        {
          id: 1,
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sample_Floorplan.jpg/640px-Sample_Floorplan.jpg",
          label: "Magasin 1",
        },
        {
          id: 2,
          url: "https://images.livspace-cdn.com/plain/https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2020/05/29213556/Floor-plan-Directions-3.jpg",
          label: "Magasin 2",
        },
      ],
      activeShop: 1,
      backgroundContextMenu: { show: false, left: 0, top: 0 },
      shapeContextMenu: { show: false, left: 0, top: 0 },
      infoPopup: { show: false, left: 0, top: 0 },
    };
  },
  computed: {
    fridges() {
      return this.mockData
        .map((item) => {
          let name = "rect" + item.id;
          return {
            ...item,
            rotation: 0,
            x: item.x,
            y: item.y,
            opacity: 0.8,
            cornerRadius: 5,
            width: item.width,
            height: item.height,
            fill: item.fill,
            name: name,
            draggable: true,
            id: item.id,
            image_id: item.image_id,
          };
        })
        .filter((item) => item.image_id === this.selectedShop.id);
    },
    selectedShop() {
      return this.shops.find((item) => item.id === this.activeShop);
    },
    selectedShape() {
      return this.mockData.find((item) => item.id === this.selectedShapeId);
    },
  },
  methods: {
    // INTERACTIONS

    // opens the context menu for an object
    openShapeContextMenu(e) {
      if (e.evt.button === 2) {
        this.setItemVisible(this.shapeContextMenu);
      }
      e.evt.preventDefault();
    },

    // opens the stage/background context menu
    openStageContextMenu() {
      this.setItemVisible(this.backgroundContextMenu);
    },

    //shows the popup/tooltip of the shape
    openShapeInfoPopup(e) {
      this.selectedShapeId = this.mockData.find(
        (item) => item.id === e.target.id()
      ).id;

      this.setItemVisible(this.infoPopup);
    },
    // stops the browser menu from opening
    stopBrowserMenu(e) {
      e.evt.preventDefault();
    },
    closeShapeMenu() {
      this.shapeContextMenu.show = false;
    },
    closeInfoPopup() {
      this.infoPopup.show = false;
    },
    closeBackgroundMenu() {
      this.backgroundContextMenu.show = false;
    },
    closeAllInteraction() {
      const transformerNode = this.$refs.transformer.getNode();
      this.closeShapeMenu();
      this.closeBackgroundMenu();
      this.closeInfoPopup();
      transformerNode.nodes([]);
    },

    // DATA/PERSISTENCE
    handleDelete() {
      this.mockData = this.mockData.filter(
        (item) => item.id !== this.selectedShapeId
      );
      this.closeAllInteraction();
    },
    addFridge() {
      const colors = ["yellow", "red", "green", "grey"];
      let stage = this.$refs.stage.getStage();
      this.mockData.push({
        rotation: 0,
        x: stage.getPointerPosition().x,
        y: stage.getPointerPosition().y,
        width: 50,
        height: 50,
        fill: colors[Math.floor(Math.random() * colors.length)], // select a random color from the colors array
        name: "fridge" + this.mockData.length,
        id: this.mockData.length + 1,
        image_id: this.selectedShop.id,
        draggable: true,
        temperature: +(Math.random() * 10 + 5).toFixed(1), // random temperature rounded to 1 decimal place
        soufflage: +(Math.random() * 10 + 5).toFixed(1), // random soufflage rounded to 1 decimal place
        consumption: +(Math.random() * 10 + 5).toFixed(1) + "Kwh", // random consumption rounded to 1 decimal place with kwh suffix
        ambience: +(Math.random() * 10 + 5).toFixed(1), // random ambience rounded to 1 decimal place
      });
      localStorage.setItem("mockData", JSON.stringify(this.mockData));
      //select shape with transform
      this.selectedShapeId = this.mockData[this.mockData.length - 1].id;
      this.closeAllInteraction();
      this.$nextTick(() => {
        this.updateTransformer();
      });
    },
    // SHAPE TRANSORMATIONS
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      // update the state
      this.mockData = this.mockData.map((item) => {
        if (item.id === this.selectedShapeId) {
          console.log(item.width, e.target.width());
          return {
            ...item,
            x: e.target.x(),
            y: e.target.y(),
            rotation: e.target.rotation(),
            scaleX: e.target.scaleX(),
            scaleY: e.target.scaleY(),
          };
        } else return item;
      });
      localStorage.setItem("mockData", JSON.stringify(this.mockData));
    },
    handleDragEnd(e) {
      this.mockData = this.mockData.map((item) => {
        if (item.id === e.target.id()) {
          return {
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          };
        }
        return item;
      });
      localStorage.setItem("mockData", JSON.stringify(this.mockData));
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection

      if (e.target === e.target.getStage()) {
        this.selectedShapeId = null;
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      const clickedOnBackground = e.target.name() === "background";
      this.closeAllInteraction();
      if (clickedOnBackground) {
        if (e.evt.button === 2) {
          this.openStageContextMenu();
          return;
        }
      }
      const currentId = e.target.id();
      // find clicked rect by its name

      const rect = this.fridges.find((r) => r.id === currentId);
      if (rect) {
        this.selectedShapeId = currentId;
      } else {
        this.selectedShapeId = 0;
      }
      this.closeInfoPopup();
      this.closeShapeMenu();
      this.updateTransformer();
    },

    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeId } = this;
      if (selectedShapeId === 0) {
        transformerNode.nodes([]);
        return;
      }
      const shapeName =
        this.fridges.find((item) => item.id === selectedShapeId).name ?? "";

      const selectedNode = stage.findOne("." + shapeName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
    },
    // BACKGROUND IMAGE
    toggleImage() {
      let image1 = {
        id: 1,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sample_Floorplan.jpg/640px-Sample_Floorplan.jpg",
        label: "Magasin 1",
      };
      let image2 = {
        id: 2,
        url: "https://www.livehome3d.com/assets/img/articles/how-to-draw-a-floor-plan/floor-plan-of-a-house-with-a-pool.jpg",
        label: "Magasin 2",
      };

      this.image = this.selectedShop.id === image1.id ? image2 : image1;
    },

    setBackground() {
      let background = this.$refs.background.getNode();
      const imageObj = new Image();
      let stage = this.$refs.stage.getNode();

      imageObj.onload = () => {
        background.fillPatternImage(imageObj);
        background.width(imageObj.width);
        background.height(imageObj.height);
        stage.width(imageObj.width);
        stage.height(imageObj.height);
        background.fillPatternRepeat("no-repeat");
      };
      background.zIndex(0);
      imageObj.src = this.selectedShop.url;
    },

    //HELPERS
    setItemVisible(item) {
      let stage = this.$refs.stage.getStage();
      var containerRect = stage.container().getBoundingClientRect();
      item.show = true;
      item.left = containerRect.left + stage.getPointerPosition().x - 10 + "px";
      item.top = containerRect.top + stage.getPointerPosition().y - 10 + "px";
    },
  },
  mounted() {
    this.setBackground();
  },
  watch: {
    activeShop() {
      this.setBackground();
    },
    // watch for image change
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 10px;
  overflow: auto;
}
.stage-parent {
  padding: 1px;
  overflow: auto;
}

.interaction-menu {
  background-color: white;
  box-shadow: 0 0 5px grey;
  border-radius: 3px;
  position: absolute;
}

@media (min-width: 768px) {
  .stage-parent {
    width: 700px;
    height: 350px;
  }
}

@media (min-width: 992px) {
  .stage-parent {
    width: 900px;
    height: 450px;
  }
}

@media (min-width: 1200px) {
  .stage-parent {
    width: 800px;
    height: 500px;
  }
}
</style>
