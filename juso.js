// html select value 변경
window.onload = async () => {
  const fileURL = "/dataBase/juSo.csv";
  const locNameArr = await getLocalData(fileURL);
  console.log(getLocalData(fileURL));

  let changeDosi = document.getElementById("sel_doSi");

  createDosiList(locNameArr);
  createSigunguList(locNameArr);

  // 도/광역시 변경 이벤트 발생 시
  changeDosi.onchange = function() {
    deleteSigunguList();
    createSigunguList(locNameArr);
  };
}


//=====================================사용된 함수 목록=====================================
// 1-1.텍스트 나누고 배열에 저장(1.개행 기준, 2.comma 기준)
function textSplit(text) {
  let rows = text.split("\r\n"); // 읽은 파일을 개행을 기준으로 나누고 빈 객체에 입력

  let i = 0;
  for (let index in rows) {
    rows[i] = rows[index].split(",");
    rows[i] = rows[i].filter((e) => {return e !== "";}); // 배열에서 빈 값("")이 아닌 요소만 선택하여 저장
    i += 1;
  }

  rows.pop(); // 1차 배열 마지막 빈 배열 삭제
  return rows;
}

// 1-2.저장된 배열을 도/광역시, 시/군/구 배열로 분리
function arrayModify(arr) {
  let newArr = [];
  let i = 0;

  for(let index in arr) {
    newArr[i] = arr[i][0];
    arr[i].shift();
    i++;
  }

  // csv 첫 행 내용(항목명) 삭제
  newArr.shift();
  arr.shift();

  return [newArr, arr];
}




// 2-1.로컬주소에서 file 읽고 텍스트를 배열에 저장
async function getLocalData(local) {
  const promise = await fetch(local)
    .then((Response) => Response.arrayBuffer())
    .then((f) => new TextDecoder("euc-kr").decode(f));
    // .then((e) => textSplit(e));

  const arrPromise = textSplit(promise);
  const modifiedArr = arrayModify(arrPromise);

  return modifiedArr;
}

// 2-2.HTML <input>태그 통하여 file 읽고 텍스트를 배열에 저장
function readCSV(input) {
  let csv = input.files[0];
  let reader = new FileReader();
  reader.readAsText(csv, "euc-kr");
  reader.onload = () => {
    const arrResult = textSplit(reader.result);
    arrayModify(arrResult);
  };
  
  reader.onerror = function () {
    alert(reader.error);
  };
}




// 3-1.도/광역시 행정구역 리스트 생성
function createDosiList(arr) {
  let selectDoSi = document.getElementById("sel_doSi");
  const doSi = arr[0];
  
  for(let i in doSi) {
    selectDoSi.options[i] = new Option(doSi[i],doSi[i]);
  }
  
  return doSi;
}

// 3-2.시/군/구 행정구역 리스트 생성
function createSigunguList(arr) {
  let selectDoSi = document.getElementById("sel_doSi");
  let selectSiGunGu = document.getElementById("sel_siGunGu");
  const doSi = arr[0];
  const siGunGu = arr[1];

  if(doSi.includes(selectDoSi.value) === true) {
    let j = doSi.indexOf(selectDoSi.value);

    for(let k in siGunGu[j]) {
      selectSiGunGu.options[k] = new Option(siGunGu[j][k],siGunGu[j][k]);
    }
  }
}

// 3-3.시/군/구 행정구역 리스트 초기화
function deleteSigunguList() {
  let selectSiGunGu = document.getElementById("sel_siGunGu");
  selectSiGunGu.options.length = 0;
}