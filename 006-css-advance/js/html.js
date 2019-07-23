;(function(win,doc){
	var root = document.getElementsByTagName('html')[0];
	function count(){
		var width = doc.body.clientWidth || doc.documentElement.clientWidth;
		console.log(width);
		var fontSize = width / 10 + 'px';
		console.log(fontSize);
		root.style.fontSize = fontSize;
	}
	win.addEventListener('DOMContentLoaded',count,false);
	win.addEventListener('resize',count,false);
})(window,document)