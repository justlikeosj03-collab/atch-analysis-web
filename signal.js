(function(){
fetch("atch_stock_data.json")
.then(function(response){return response.json();})
.then(function(data){
var i=data.length-1;
var close=Number(data[i].close);
function sma(period){if(i<period-1)return null;var sum=0;for(var j=i-period+1;j<=i;j++)sum+=Number(data[j].close);return sum/period;}
var ma20=sma(20);
var ma60=sma(60);
var gains=0;var losses=0;
for(var r=i-13;r<=i;r++){var diff=Number(data[r].close)-Number(data[r-1].close);if(diff>0)gains+=diff;else losses-=diff;}
var rs=losses===0?100:gains/losses;
var rsi=100-(100/(1+rs));
var ema12=null;var ema26=null;var mult12=2/13;var mult26=2/27;
for(var e=0;e<=i;e++){var c=Number(data[e].close);if(e===11)ema12=c;else if(e>11)ema12=(c-ema12)*mult12+ema12;}
for(var f=0;f<=i;f++){var c2=Number(data[f].close);if(f===25)ema26=c2;else if(f>25)ema26=(c2-ema26)*mult26+ema26;}
var macd=ema12-ema26;
var highest=-Infinity;var lowest=Infinity;
for(var s=i-13;s<=i;s++){var h=Number(data[s].high);var l=Number(data[s].low);if(h>highest)highest=h;if(l<lowest)lowest=l;}
var range=highest-lowest;
var stochastic=range===0?50:((close-lowest)/range)*100;
var volume=Number(data[i].volume);var volumeSum=0;
for(var v=i-19;v<=i;v++)volumeSum+=Number(data[v].volume);
var avgVolume=volumeSum/20;
var score=0;
if(ma20!==null&&close>ma20)score+=1;else score-=1;
if(ma60!==null&&close>ma60)score+=1;else score-=1;
if(rsi<30)score+=2;else if(rsi>70)score-=2;else if(rsi<50)score+=1;else score-=1;
if(macd>0)score+=1;else score-=1;
if(stochastic<20)score+=2;else if(stochastic>80)score-=2;else if(stochastic<50)score+=1;else score-=1;
if(volume>=avgVolume*1.5){if(close>Number(data[i-1].close))score+=1;else score-=1;}
var signal="중립";
if(score>=3)signal="매수 우세";
if(score<=-3)signal="매도 우세";
window.signalData={signal:signal,score:score,rsi:rsi,macd:macd,stochastic:stochastic,ma20:ma20,ma60:ma60,volumeRatio:volume/avgVolume};
if(typeof showSignal==="function")showSignal();
})
.catch(function(error){console.error("종합 신호 오류:",error);});
})();