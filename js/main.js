
import colorspaces from '../lib/vendor/colorspaces.modified.js' 




// Get CSS array of colors of n-length with different Hues, with fixed Lightness and Chroma
function getColors(n) {
	// L: 0 to 100
	// C: -200 to 200
	// H: 0 to 360

	// For the given lightness L, the highest chroma is C, in order for a complete Hue circle

	let L = 75
	let C = 59

	// let L = 85
	// let C = 34

	// let L = 90
	// let C = 22

	// let L = 95
	// let C = 10

	// let L = 97
	// let C = 6

	// let L = 99
	// let C = 2

	let colors = new Array(n).fill().map((e, i) => {

		let H = i * 360 / n

		let color = colorspaces.make_color('CIELCHuv', [L, C, H])
		let [r, g, b] = color.as('sRGB').map(c => parseInt(c * 255) )

		return `rgb(${r}, ${g}, ${b})`
	})

	return colors
}

// function getRandomNumber(max) {
// 	return Math.floor(Math.random() * max)
// }




// Create color table
const interval = 100	// in ms
const nColors = 12
const $nav = document.querySelector('nav')

let colors = getColors(nColors)

// Create table elements
let rowLength = 6
let $table = document.createElement('table')
for (let tr = 0; tr < Math.ceil(nColors/rowLength); tr++) {
	let $tr = document.createElement('tr')
	for (let td = 0; td < rowLength; td++) {
		let i = tr * rowLength + td
		if (i >= nColors) break
		let $td = document.createElement('td')
		$tr.append($td)
	}
	$table.append($tr)
}
$nav.prepend($table)

// Set table cells background
let $cells = $table.querySelectorAll('td')
$cells.forEach(($cell, i) => {
	$cell.style.background = colors[i]
	$cell.style.width = '6px'
	$cell.style.height = '6px'
})

