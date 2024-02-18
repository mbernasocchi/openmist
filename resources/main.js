// Your access token can be found at: https://ion.cesium.com/tokens.
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzOTY1NDY1OS1jYzM5LTRkYjYtYjhhYS1lMDY1ZmY4ZjQ0MDEiLCJpZCI6MTk1OTgzLCJpYXQiOjE3MDgxMjY5OTR9.bzu6pC8p9wv8FE7hvIyDueS9yhSlCiUEPAl8meh79ik";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});
window.viewer = viewer;
viewer.clock.multiplier = 120;


// init UI
// Move HTML buttons to Cesium toolbar
const toolbar = document.querySelector("div.cesium-viewer-toolbar");
const modeButton = document.querySelector("span.cesium-sceneModePicker-wrapper");
const buttons = document.getElementById("buttons").children;
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  toolbar.insertBefore(button, modeButton);
};


// add DragDropMixin to the viewer
viewer.extend(Cesium.viewerDragDropMixin, {
  clearOnDrop: true,
  flyToOnDrop: true,
  clampToGround: true,
});

// add eventListener to html-input-Element with type="file"
document.getElementById("fileupload").addEventListener("change", loadFile, false);

// fly to the added dataSource
viewer.dataSources.dataSourceAdded.addEventListener(function (source) {
  viewer.clockViewModel.shouldAnimate = true;
  viewer.flyTo(viewer.dataSources.get(0));
});

// function for loading local gpx
function loadFile(event) {
  viewer.dataSources.removeAll();
  let tmppath = URL.createObjectURL(event.target.files[0]);
  viewer.dataSources.add(
    Cesium.GpxDataSource.load(tmppath, {
      clampToGround: false,
    })
  );
}


document.body.classList.remove("cesium-loading");