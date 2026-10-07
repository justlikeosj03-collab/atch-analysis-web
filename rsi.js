(function(){
function calculateRSI(data,period){
var gains=0;
var losses=0;
for(var i=1;i<=period;i++){
var diff=Number(data[i].close)-Number(data[i-1].close);
if(diff>0){gains+=diff;}
else{losses-=diff;}
}
var averageGain=gains/period;
var averageLoss=losses/period;
if(averageLoss===0){return 100;}
var rs=averageGain/averageLoss;
return 100-(100/(1+rs));
}

fetch("atch_stock_data.json")
.then(function(response){return response.json();})
.then(function(data){
if(data.length<15){return;}
var rsi=calculateRSI(data.slice(-15),14);
document.getElementById("rsiValue").innerText=rsi.toFixed(2);

var status="중립";
if(rsi>=70){status="과매수";}
else if(rsi<=30){status="과매도";}

document.getElementById("rsiStatus").innerText=status;
})
.catch(function(error){
console.error("RSI 오류:",error);
document.getElementById("rsiStatus").innerText="RSI 계산 오류";
});
})();