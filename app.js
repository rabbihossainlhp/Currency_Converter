const Main_Url = "https://v6.exchangerate-api.com/v6/3e5fc955d4c0ac34e7db56f8/latest";

const accessDropSelect = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for(let select of accessDropSelect){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "BDT"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event)=>{
        updateFlage(event.target);
    });
}

const upddateExchange = async ()=>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === " " || amountValue <1){
        amountValue = 1;
        amount.value = "1";
    }
    const url = `${Main_Url}/${fromCurr.value}`;
    console.log(url);
    const url_2 = `${Main_Url}/${toCurr.value}`;
    console.log(url_2);
    let response = await fetch(url,url_2);
    let data = response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amountValue*rate;
    msg.innerText = `${amountValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`

}


const updateFlage = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let source = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let IMG = element.parentElement.querySelector("img");
    IMG.src = source;
};


button.addEventListener("click", async (event2)=>{
    event2.preventDefault();
    upddateExchange();
    })


window.addEventListener("load",()=>{
    upddateExchange();
});