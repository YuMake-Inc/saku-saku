var key = "q5Un5baIhoFxRE5CXTpD";
var map = L.map("map", { center: [34.60438909041995, 135.83959579467776], zoom: 14 });

var gl = L.maplibreGL({
  attribution:
    '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e \u003ca href="https://www.mierune.org/copyright" target="_blank"\u003e\u0026copy; MIERUNE\u003c/a\u003e',
  style: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${key}`,
}).addTo(map);


// sakuraマーカー
var sakuraIcon = L.icon({
	iconUrl:'./icon/sakura.png',
	iconSize:[33,50],
	iconAnchor:[15,41],
	popupAnchor:[2,-40]
	});

  var csv0 = omnivore.csv('https://rawcdn.githack.com/YuMake-Inc/saku-saku/main/csvdata/data.csv?token=GHSAT0AAAAAAB7NR7OHCKXNUCQCVLIRQNS4ZALDV3A',
  {latfield:'lat',lonfield:'lng',delimiter:','},
  L.geoJson(null,
  {pointToLayer:function(feature,latlng)
  {return L.marker(latlng,{icon:sakuraIcon});},
  onEachFeature:function(feature,layer)
  {layer.bindPopup("<h3>"+feature.properties['title']+"</h3>"+feature.properties['season']+"<p><img src=\"" + feature.properties['image'].substring(feature.properties['image'].indexOf("(") + 1, feature.properties['image'].indexOf(")")) + "\">"+ "<a href='" + feature.properties['url'] + "'>詳細はこちら</a>"+"</p>");}
  })).on( 'click', function(e) { clickEvt(e); });
map.addLayer(csv0);

// 現在地表示ボタン
var watch_id = 0;
var curMarker = null;	// 現在地マーカー
var currentWatchBtn = null;
L.easyButton({		// 現在地表示ボタン
	states: [{
		stateName: 'current-watch',
		icon:	'fas fa-map-marker-alt',
		title:	 '現在地',
		onClick: function(btn, map) {
			currentWatch();
			btn.state('current-watch-reset');
			currentWatchBtn = btn;
		}
	}, {
		stateName: 'current-watch-reset',
		icon:	'fa fa-user',
		title:	 '現在地オフ',
		onClick: function(btn, map) {
			currentWatchReset();
			btn.state('current-watch');
		}
	}]
}).addTo( map );

// 現在地に表示
function currentWatch() {
	function success(pos) {
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		map.setView([ lat,lng ]);
		// 現在地に表示するマーカー
		if (curMarker) {
			map.removeLayer(curMarker);
		}
		var curIcon = L.icon({	/* アイコン */
			iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
			iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
			iconAnchor: [15, 34]
		});
		curMarker = L.marker([lat, lng], {icon: curIcon}).addTo(map);
	}
	function error(err) {
		alert('位置情報を取得できませんでした。');
	}
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	if (watch_id == 0) {
		watch_id = navigator.geolocation.watchPosition(success, error, options); // 現在地情報を定期的に
	}
}
function currentWatchReset() {
	if (watch_id > 0) {
		navigator.geolocation.clearWatch(watch_id);
		watch_id = 0;
	}
	if (curMarker) {
		map.removeLayer(curMarker);
		curMarker = null;
	}
}