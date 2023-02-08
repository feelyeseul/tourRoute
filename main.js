// 검색창 이용
function searchTheNoun() {
    const noun = document.getElementById('search-noun').value;
    let address = 'https://www.google.co.kr/search?q='
    let s_noun = address + noun

    // document.getElementById('search-result').innerText = s_noun
    window.open(s_noun)
}

// 검색창 엔터키
function pressEnterKey() {
    if(window.event.keyCode == 13) {
        searchTheNoun();
    }
}

// 메뉴바 언더라인 생성 및 숨김
let outerUnderline = document.getElementById("underline-h1");
let innerUnderline = document.getElementById("underline-h2");
let horizontalMenu = document.querySelectorAll(".dropdown_menu");
let horizontalContents = document.querySelectorAll(".dropdown_contents a");

console.log(horizontalMenu);

horizontalMenu.forEach(menu=>menu.addEventListener("mouseover",(e)=>horizontalSelect(outerUnderline.style, e)));
horizontalMenu.forEach(menu=>menu.addEventListener("mouseout",()=>horizontalVanish(outerUnderline.style)));

horizontalContents.forEach(menu=>menu.addEventListener("mouseover",(e)=>horizontalSelect(innerUnderline.style, e)));
horizontalContents.forEach(menu=>menu.addEventListener("mouseout",()=>horizontalVanish(innerUnderline.style)));

function horizontalSelect(hs, e) {
    hs.left = e.currentTarget.offsetLeft + "px";
    hs.width = e.currentTarget.offsetWidth + "px";
    hs.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

function horizontalVanish(hs) {
    hs.width = 0;
}



// CSV 파일 저장 연습
function mkCSV() {
    const data = [
        ["김진필", 35, "JangAn"],
        ["Lee", 30, "우성5차"],
        ["Na", 35, "Feelyou"]
    ];
    
    // let csvContent = "type:'text/csv;charset=utf-8'" + "\ufeff"

    let arrayCon = data.map(e => e.join(",")).join("\n");
    console.log(arrayCon)

    let blob = new Blob(["\ufeff"+arrayCon], {type: 'text/csv;charset=utf-8;'});
    console.log(blob)
    // let CA = csvContent + arrayCon

    // return(csvContent)
    // console.log(csvContent)
    
    
    let url = URL.createObjectURL(blob);
    console.log(url)


    var pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute("download", "tourList.csv");
        pom.click();

    // window.open(CA);

    // var encodedUri = csvContent + encodeURI(arrayCon);
    // window.open(encodedUri);
}