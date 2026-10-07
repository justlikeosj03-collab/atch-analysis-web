(function(){

fetch("atch_stock_data.json")
.then(function(response){return response.json();})
.then(function(data){

var labels=[];
var volume=[];
var avg20=[];
var spike=[];

for(var i=0;i<data.length;i++){

labels.push(data[i].date.slice(0,10));

var v=Number(data[i].volume);
volume.push(v);

if(i<19){
avg20.push(null);
spike.push(false);
continue;
}

var sum=0;

for(var j=i-19;j<=i;j++){
sum+=Number(data[j].volume);
}

var avg=sum/20;
avg20.push(avg);
spike.push(v>=avg*1.5);

}

window.volumeData={
labels:labels,
volume:volume,
avg20:avg20,
spike:spike
};

if(typeof drawVolume==="function"){
drawVolume(365);
}

})
.catch(function(error){
console.error("거래량 데이터 오류:",error);
});

})();