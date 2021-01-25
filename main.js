var geturl = url2array();
var svgreg;
window.onload = function () {
	generator(function* () {
		window.onkeydown = function () {
			keydown(event.keyCode);
		};
		yield {
			nextfunc: function (callback) {
				openfile("style.svg", function (text) {
					svgreg = text2xml(text);
					callback();
				});
			},
			cbfunc: function () { }
		};
		decode.onclick = transform;
		if (typeof geturl['st'] != 'undefined') {
			inputstring.value = geturl['st'];
			transform();
		} else {
			svgreg.getElementsByTagName('text')[0].textContent = '字';
			svgtopngurl(svgreg, function (url) {
				let lk = document.querySelectorAll("[rel='icon']")[0];
				lk.href = url;
			});
		}
	});
};

function keydown(key) {
	if (key == 13)
		transform();
}

function transform() {
	if (inputstring.value != '') {
		svgreg.getElementsByTagName('text')[0].textContent = inputstring.value;
		geturl['st'] = inputstring.value;
	}
	else {
		svgreg.getElementsByTagName('text')[0].textContent = '字';
		geturl['st'] = inputstring.value;
		delete geturl['st'];
	}
	array2url(geturl);
	svgtopngurl(svgreg, function (url) {
		let lk = document.querySelectorAll("[rel='icon']")[0];
		lk.href = url;
	});
	svgreg.getElementsByTagName('text')[0].textContent = inputstring.value;
	svgtoimg(svgreg, function (img) {
		var i1 = img;
		var i2 = document.createElement("canvas");
		var w = i2.width = i1.naturalWidth;
		var h = i2.height = i1.naturalHeight;
		var n = 1;

		var ctx = i2.getContext('2d');
		ctx.drawImage(i1, 0, 0);
		var imgdt = ctx.getImageData(0, 0, w, h);
		var a = imgdt.data;
		var s = '';
		var isv = inputstring.value;
		for (var i = 0; i < 40; i++) {
			for (var j = 0; j < 40; j++)
				s += a[(i * 40 * 5 + j) * 4 * 5] ? '　' : isv;
			s += '\n';
		}
		outputstring.value = s;
		ctx.putImageData(imgdt, 0, 0);
	});
}