  var fDrawGroup= new L.FeatureGroup();
          map.addLayer(fDrawGroup);
          var drawControl = new L.Control.Draw(
            {
            draw: {
                polyline: true,
                polygon: false,
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false
            },
            edit: {
                    featureGroup: fDrawGroup,
                    remove: false
                  },
          });
          map.addControl(drawControl);

            map.on("draw:created", function(e)
            {
              var type = e.layerType;
              var layer= e.layer;
              console.log(e)
              fDrawGroup.addLayer(layer);
              alert(JSON.stringify(e.layer.toGeoJSON()));
            });
     //edit colors
     var ctlStyle;
  
     ctlStyle = L.control.styleEditor({position:'topleft'}).addTo(map);
     function latLngToString(ll) {
       return "["+ll.lat.toFixed(5)+","+ll.lng.toFixed(5)+"]";
     }