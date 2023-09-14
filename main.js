let geturl = url2obj();
let svg = text2svg(await loadfile('text', 'style.svg'));
let text = svg.querySelector('text');

async function transform() {
	if (inputstring.value != '') {
		text.textContent = inputstring.value;
		geturl.st = inputstring.value;
	} else {
		text.textContent = '字';
		geturl.st = inputstring.value;
		delete geturl.st;
	}
	obj2url(geturl);
	document.querySelector("[rel='icon']").href = await svgtopngurl(svg);
	text.textContent = inputstring.value;
	let i1 = await svgtoimg(svg);
	let i2 = document.createElement("canvas");
	let w = i2.width = i1.naturalWidth;
	let h = i2.height = i1.naturalHeight;
	let ctx = i2.getContext('2d');
	ctx.drawImage(i1, 0, 0);
	let imgdt = ctx.getImageData(0, 0, w, h);
	let a = imgdt.data;
	let s = '';
	let isv = inputstring.value;
	for (let i = 0; i < 40; i++) {
		for (let j = 0; j < 40; j++)
			s += a[(i * 40 * 5 + j) * 4 * 5] ? '　' : isv;
		s += '\n';
	}
	outputstring.value = s;
	ctx.putImageData(imgdt, 0, 0);
}

function keydown(key) {
	if (key == 13) transform();
}

window.onkeydown = e => keydown(e.keyCode);
inputstring.value = decodeURIComponent(geturl.st ?? '');
decode.onclick = transform;
transform();
