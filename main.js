function searchTheNoun() {
    const noun = document.getElementById('search-noun').value;
    let address = 'https://www.google.co.kr/search?q='
    let s_noun = address + noun

    // document.getElementById('search-result').innerText = s_noun
    window.open(s_noun)
}

function pressEnterKey() {
    if(window.event.keyCode == 13) {
        searchTheNoun()
    }
}

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


// 메뉴바 언더라인 생성
let horizontalUnderLine = document.getElementById("underline-h");
let horizontalMenu = document.querySelectorAll("header nav div a");

horizontalMenu.forEach(menu=>menu.addEventListener("mouseover",(e)=>horizontalSelect(e)))

function horizontalSelect(e) {
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}