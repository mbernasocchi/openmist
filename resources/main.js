// Your access token can be found at: https://ion.cesium.com/tokens.
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzOTY1NDY1OS1jYzM5LTRkYjYtYjhhYS1lMDY1ZmY4ZjQ0MDEiLCJpZCI6MTk1OTgzLCJpYXQiOjE3MDgxMjY5OTR9.bzu6pC8p9wv8FE7hvIyDueS9yhSlCiUEPAl8meh79ik";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

viewer.extend(Cesium.viewerDragDropMixin, {
	clearOnDrop: true,
	flyToOnDrop: true,
  clampToGround: true,
});

const clock = viewer.clock;
clock.multiplier = 120;


// adding eventListener to html-input-Element with type="file"
document.getElementById('gpxfile').addEventListener('change', loadFile, false);

// function for loading local gpx
function loadFile (event) {
  viewer.dataSources.removeAll();
  let tmppath = URL.createObjectURL(event.target.files[0]);
  viewer.dataSources.add(
    Cesium.GpxDataSource.load(
      tmppath,
      {
        clampToGround: false,
      }
    )
  )
}

// fly to the first added dataSource
viewer.dataSources.dataSourceAdded.addEventListener(function(source) {
  viewer.clockViewModel.shouldAnimate = true;
  viewer.flyTo(viewer.dataSources.get(0));  
});
