// 목적지 추가 버튼 설정
function destinationAddBtn() {
  const destSection = document.getElementById("section_destination");
  let inputBox = destSection.getElementsByClassName("section_inputs");
  let boxLength = inputBox.length + 1;

  if (boxLength >= 11) {
    alert("목적지가 너무 많습니다.");
  } else {
    let newOuterDiv = document.createElement("div");
    newOuterDiv.className = "section_inputs";
    newOuterDiv.id = "d" + boxLength;

    destSection.appendChild(newOuterDiv);
    const newDivSection = document.getElementById(newOuterDiv.id);

    let newLabel = document.createElement("label");
    newLabel.htmlFor = "location_des" + boxLength;
    newLabel.textContent = "목적지" + boxLength;

    let newInput = document.createElement("input");
    newInput.id = newLabel.htmlFor;
    newInput.type = "text";

    newDivSection.appendChild(newLabel);
    newDivSection.appendChild(newInput);
  }
}

// 목적지 삭제 버튼 설정
function destinationDelBtn() {
  const destSection = document.getElementById("section_destination");
  let inputBox = destSection.getElementsByClassName("section_inputs");
  if (inputBox.length <= 1) {
    alert("목적지는 최소 한 군데 이상 입력해야 합니다.");
  } else {
    const delDIV = document.getElementById("d" + inputBox.length);
    delDIV.remove();
  }
}

// 입력된 정보 배열에 저장 후 새창 열기
function destinationInfo() {
  const dosiName = document.getElementById("sel_doSi").value;
  const sigunguName = document.getElementById("sel_siGunGu").value;
  const arrivalName = document.getElementById("location_start").value;

  let dosigunguName = "";

  if (dosiName === "세종특별자치시") {
    dosigunguName = dosiName;
  } else {
    dosigunguName = dosiName + " " + sigunguName;
  }

  let arrDestinations = [dosigunguName, arrivalName];

  const destSection = document.getElementById("section_destination");
  let inputBox = document.querySelectorAll("div#section_destination div.section_inputs");

  const arr = Array.from(inputBox); // NodeList to Array

  const deStinations = arr.map(
    (e, index) =>
      document.getElementById("".concat("location_des", index + 1)).value
  );

  arrDestinations = arrDestinations.concat(deStinations);

  const result = confirmEmptyElement(arrDestinations);

  // 목적지가 없으면 openNewPage() 실행불가
  if (result !== undefined) {
    openNewPage(result);
  } else {
    return;
  }
}

// 빈 배열, 목적지 없음 판단
function confirmEmptyElement(arr) {
  if (arr[0] === "") {
    alert("행정구역을 선택하세요.(도/광역시, 시/군/구)");
  } else if (arr[1] === "") {
    alert("출발지를 입력하세요.");
  } else if (arr.includes("") === true) {
    arr = arr.filter((element) => {return element !== "";});
    if (arr.length < 3) {
      alert("목적지는 최소 한 군데 이상 입력해야 합니다.");
    } else {
    return arr;
    }
   } else {
    return arr;
  }
}

// 새 창 열어서 값 전달
function openNewPage(receivingArr) {
  let newPage = window.open("2.html");
  newPage.onload = function () {
    let returnArr = this.createInputResult(receivingArr);

    const imgContainer = this.document.getElementById("section_map");
    imgContainer.src = this.makeURL(returnArr);
  };
}

// 입력 값 초기화
function resetInputValue() {
  let inputDIV = document.querySelectorAll("div#section_destination div.section_inputs");
  const arr = Array.from(inputDIV); // NodeList to Array

  arr.forEach((e, index) => {
    let inputBox = document.getElementById("".concat("location_des", index + 1));
    if(inputBox.value !== ""){inputBox.value = null;}
    }
  )
}


// 사용자 입력 내용 div 생성 및 값 채우기
function createInputResult(receivingArr) {
  const mainDiv = document.getElementById("userInput_result");

  const arrFirstElement = [receivingArr[0]];

  let firstDiv = document.createElement("div");
    firstDiv.className = "section_textresult"
    firstDiv.textContent = receivingArr[0];

  mainDiv.appendChild(firstDiv);

  receivingArr.shift();

  receivingArr.forEach((locName, indexNum) => {
    let outerDiv = document.createElement("div");
      outerDiv.className = "section_textresult";
      outerDiv.id = "".concat("UI_r", indexNum);

    mainDiv.appendChild(outerDiv);

    createInnerDiv(receivingArr, locName, outerDiv.id, indexNum);
    }
  )
  receivingArr = arrFirstElement.concat(receivingArr);

  return receivingArr;
}
// 안쪽 img, div, div 생성
function createInnerDiv(Arr, name, idString, index) {
  let newInnerImg = document.createElement("img");
      // newInnerImg.style = "margin-left: 1.8rem";
      newInnerImg.className = "marker_img";

  let newInnerDiv1 = document.createElement("div");
      newInnerDiv1.className = "marker_text";

  let newInnerDiv2 = document.createElement("div");
      newInnerDiv2.className = "marker_text2";

  if (index === 0) {
    newInnerImg.src = "/icon/marker_s.png";
    newInnerDiv1.textContent = "출발지";
    newInnerDiv2.textContent = name;
  } else if (index === Arr.length - 1) {
    newInnerImg.src = "/icon/marker_l.png";
    newInnerDiv1.textContent = "최종목적지";
    newInnerDiv2.textContent = name;
  } else {
    newInnerImg.src = "/icon/marker_n.png";
    newInnerDiv1.textContent = "목적지";
    newInnerDiv2.textContent = "".concat(index, ". ", name);
  }

  document.getElementById(idString).appendChild(newInnerImg);
  document.getElementById(idString).appendChild(newInnerDiv1);
  document.getElementById(idString).appendChild(newInnerDiv2);
}