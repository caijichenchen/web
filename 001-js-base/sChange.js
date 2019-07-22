
function sChange(obj,attr,oTarget){
		clearInterval(obj.time);
		var iSpeed = 0;
		obj.time = setInterval(function(){
			var iVal = parseFloat(getComputedStyle(obj,false)[attr]);
			if(iVal == 'opacity'){
				iVal = Math.round(iVal * 100);
			}
			if(iVal < oTarget){
				iSpeed = 7;
			}else{
				iSpeed = -7;
			}
			if(Math.abs(oTarget - iVal) < Math.abs(iSpeed)){
				if(attr == 'opacity'){
					obj.style[attr] = oTarget/100;
				}else{
					obj.style[attr] = oTarget + 'px';
				}
				clearInterval(obj.time);
			}else{
				if(attr == 'opacity'){
					obj.style[attr] = (iVal + iSpeed) / 100;
				}else{
					obj.style[attr] = iVal + iSpeed + 'px';
				}
			}
		},30)
	}