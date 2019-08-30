<template>

    <div id="changeShifts">

    </div>

</template>

<script>
  import * as esriLoader from 'esri-loader';
  let options = {
    url: window.DSE.arcgis_startJS,
    dojoConfig: window.DSE.gisConfig
  };
  esriLoader.loadCss(window.DSE.arcgis_mainCss);
  export  default {
        data(){
            return{

            };
        },
      methods:{
        loadGis(){
          esriLoader.loadModules( [ 'esri/Map',
            'esri/views/MapView',
            'esri/Graphic',
            'dojo/domReady!'], options)
            .then(([Map, MapView, Graphic]) => {
              var map = new Map({
                basemap: 'gray'
              });



              var view = new MapView({
                container: 'changeShifts',
                map: map,
                zoom: 16,
                center: [114.353545,30.612641]
              });


              var point = {
                type: 'point', // autocasts as /Point
                x: 114.353545,
                y: 30.612641,
                spatialReference: view.spatialReference
              };

              var graphic = new Graphic({
                geometry: point,
                symbol: {
                  type: 'simple-marker', // autocasts as SimpleMarkerSymbol
                  style: 'square',
                  color: 'red',
                  size: '16px',
                  outline: { // autocasts as SimpleLineSymbol
                    color: [255, 255, 0],
                    width: 3
                  }
                }
              });
              view.graphics.add(graphic);
            })
            .catch(err => {
              // handle any script or module loading errors
              console.error(err);
            });
        },
        drawLine(){

        }

      },
      mounted(){
        this.loadGis();
      },
      created() {
      }

    };

</script>

<style scoped lang="scss">
#changeShifts{
  width: 100%;
  height: 100%;
  position: relative;
}


</style>
