
import colorspaces from '../lib/vendor/colorspaces.modified.js' 




// Get CSS array of colors of n-length with different Hues, with fixed Lightness and Chroma
function getColors(n, colorOptions) {
	// L: 0 to 100
	// C: -200 to 200
	// H: 0 to 360

	// For the given lightness L, the highest chroma is C, in order for a complete Hue circle

	let L = 75
	let C = 59


	colorOptions = colorOptions || {}
	colorOptions.L = colorOptions.L || L
	colorOptions.C = colorOptions.C || C

	let colors = new Array(n).fill().map((e, i) => {

		let H = i * 360 / n

		let color = colorspaces.make_color('CIELCHuv', [colorOptions.L, colorOptions.C, H])
		let [r, g, b] = color.as('sRGB').map(c => parseInt(c * 255) )

		return `rgb(${r}, ${g}, ${b})`
	})

	return colors
}

// function getRandomNumber(max) {
// 	return Math.floor(Math.random() * max)
// }



class ColorChart {
	constructor(nColors, rowLength, colorOptions) {
		nColors = nColors || 12
		rowLength = rowLength || 6

		// Create table elements
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

		// Set table cells size
		let $cells = $table.querySelectorAll('td')
		$cells.forEach(($cell, i) => {
			$cell.style.width = '6px'
			$cell.style.height = '6px'
		})

		this.$el = $table

		// Color table cells
		this.nColors = nColors
		this.render(colorOptions)
	}
	render(colorOptions) {
		let colors = getColors(this.nColors, colorOptions)

		// Set table cells background 
		let $cells = this.$el.querySelectorAll('td')
		$cells.forEach(($cell, i) => {
			$cell.style.background = colors[i]
		})
	}
}


const presetL = []
presetL[25] = { L: 25, C: 19 }
presetL[50] = { L: 50, C: 39 }
presetL[75] = { L: 75, C: 59 }
presetL[85] = { L: 85, C: 34 }
presetL[90] = { L: 90, C: 22 }
presetL[95] = { L: 95, C: 10 }
presetL[97] = { L: 97, C: 6 }
presetL[99] = { L: 99, C: 2 }



// Create color chart
let cc = new ColorChart(20, 5)
document.querySelector('nav').prepend(cc.$el)

// Cycle through different lighness for color chart when it's clicked
let optionsForPresetL = [25, 50, 75]
let i = 0
cc.$el.addEventListener('click', e => {
	let o = optionsForPresetL[i++ % optionsForPresetL.length]
	cc.render(presetL[o])
})


// document.querySelector('nav').addEventListener('click', e => {
// 	let $el = e.target

// 	let $old = document.querySelector('nav table.color-chart')
// 	if ($old)

// 	$el.prepend(createColorChart(20, 5, { L: 85, C: presetL[85]}))
// })