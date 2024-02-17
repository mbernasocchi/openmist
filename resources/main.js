// Your access token can be found at: https://ion.cesium.com/tokens.
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzOTY1NDY1OS1jYzM5LTRkYjYtYjhhYS1lMDY1ZmY4ZjQ0MDEiLCJpZCI6MTk1OTgzLCJpYXQiOjE3MDgxMjY5OTR9.bzu6pC8p9wv8FE7hvIyDueS9yhSlCiUEPAl8meh79ik";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

viewer.extend(Cesium.viewerDragDropMixin, {
	clearOnDrop: true,
	flyToOnDrop: true
});

const clock = viewer.clock;
clock.multiplier = 120;



// Add Cesium OSM Buildings, a global 3D buildings layer.
// const buildingTileset = await Cesium.createOsmBuildingsAsync();
// viewer.scene.primitives.add(buildingTileset);


viewer.dataSources.dataSourceAdded.addEventListener(function(source) {
  console.log("Data source added");
  console.log(viewer.dataSources);
  viewer.clockViewModel.shouldAnimate = true;
  
});



/* viewer.dataSources
  .add(
    Cesium.GpxDataSource.load(
      ".dd/resources/test/20240216.gpx",
      //"https://api.sports-tracker.com/apiserver/v1/workouts/export/APCenfIheTmrSsiVq3HJ9YgaePUYn8IXCpdauq1XVuCY7ruoUQbTCupuE2ObMiUKFQ==?brand=SUUNTOAPP",
      {
        clampToGround: false,
      }
    )
  )
  .then(function (dataSource) {
    viewer.flyTo(dataSource.entities);
  });
 */