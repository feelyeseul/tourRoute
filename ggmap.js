function initMap() {
  let map = new google.maps.Map(document.getElementById("section_map"), {
    center: { lat: 37, lng: 127 },
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
}

// window.initMap = initMap;

// 배열에 저장된 장소가 마킹된 지도 URL 생성(Maps Static API 이용)
function makeURL(Arr) {
  let dosiName = Arr[0];
  if(dosiName.includes(" ") === true) {
    dosiName = dosiName.replace(/ /g, "+");
  } else {
    alert("지역명이 없습니다. 다시 선택하세요.");
  }

  Arr.shift();
  
  const locationsArr = Arr.map(location => "".concat(dosiName, "+", location));

  const API_KEY = "AIzaSyD-dSDI9urkOy8dza_wY5R4sKYukFrNEVQ";
  const size = "640x640";
  const scale = "2";
  let locNames = locationsArr.join("%7C");
  
  // markersURL 텍스트 생성
  let markers = makeMarkerURL(locationsArr);
  let path = `color:0x0000ff%7Cweight:5%7C${locNames}`;

  const url = `https://maps.googleapis.com/maps/api/staticmap?size=${size}&scale=${scale}${markers}&path=${path}&key=${API_KEY}`;
  return url;
}

// 마커 URL 생성
function makeMarkerURL(Arr) {
  let markerURL = "";
  Arr.forEach((locName, arrIndex) => {
    if(arrIndex === 0) {
      markerURL = "".concat(markerURL, `&markers=color:red%7Clabel:S%7C${locName}`);
    } else if (arrIndex === Arr.length - 1) {
      markerURL = "".concat(markerURL, `&markers=color:yellow%7Clabel:L%7C${locName}`);
    } else {
      markerURL = "".concat(markerURL, `&markers=color:blue%7Clabel:${arrIndex}%7C${locName}`);
    }
  });
  return markerURL;
}