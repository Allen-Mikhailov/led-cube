const x_input = document.getElementById("x-dim")
const y_input = document.getElementById("y-dim")
const z_input = document.getElementById("z-dim")
const slot_grid = document.getElementById("grid-container")
const phase_input = document.getElementById("phase-input")

const active_color = "#fff"
const unactive_color = "#000"

let dimensions = [1, 1, 1]
let phases = []
let selected_phase = 0
let z_axis = 0
let slots = {}



function update_style(slot_element, value)
{
    slot_element.style.backgroundColor = value == 1?active_color:unactive_color
}

function slot_update()
{
    for (let x = 0; x < dimensions[0]; x++)
    {
        for (let y = 0; y < dimensions[1]; y++)
        {
            const div = slots[`${x},${y}`]
            update_style(div, phases[selected_phase][y][x])
        }
    }
}

phase_input.onchange = () => {
    try {
        selected_phase = parseFloat(phase_input.value)
        slot_update()
    } catch(e) {
        console.log(e)
    }
    
}
phase_input.value = 0

function compile()
{
    for (let x = 0; x < dimensions[0]; x++)
    {
        for (let y = 0; y < dimensions[1]; y++)
        {
            const div = document.createElement("div")
            div.className = "slot"

            div.style.width = `calc(${size}% - 1px)`
            div.style.height = `calc(${size}% - 1px)`
            div.style.left = `${size*x}%`
            div.style.top = `${size*y}%`
            div.onclick = () => {
                console.log("click", phases[selected_phase][y][x])
                const value = phases[selected_phase][y][x] == 0?1:0
                phases[selected_phase][y][x] = value
                update_style(div, value)
            }
            update_style(div, phases[selected_phase][y][x])
            slots[`${x},${y}`] = div
            slot_grid.appendChild(div)
        }
    }
}

function dimension_update()
{
    try {
        dimensions = [
            parseInt(x_input.value),
            parseInt(y_input.value),
            parseInt(z_input.value)
        ]
        console.log("new dimensions", dimensions)

        // making sure the dimensions are filled
        for (let z = 0; z < dimensions[2]; z++) {
            phases[z] = phases[z] || []
            const phase = phases[z]
            for (let y = 0; y < dimensions[1]; y++) {
                phase[y] = phase[y] || []
                const row = phase[y]
                for (let x = 0; x < dimensions[1]; x++)
                {
                    row[x] = row[x] || 0
                }
            }
        }   

        const size = 100/Math.max(dimensions[0], dimensions[1])

        slot_grid.replaceChildren()

        
        for (let x = 0; x < dimensions[0]; x++)
        {
            for (let y = 0; y < dimensions[1]; y++)
            {
                const div = document.createElement("div")
                div.className = "slot"

                div.style.width = `calc(${size}% - 1px)`
                div.style.height = `calc(${size}% - 1px)`
                div.style.left = `${size*x}%`
                div.style.top = `${size*y}%`
                div.onclick = () => {
                    console.log("click", phases[selected_phase][y][x])
                    const value = phases[selected_phase][y][x] == 0?1:0
                    phases[selected_phase][y][x] = value
                    update_style(div, value)
                }
                update_style(div, phases[selected_phase][y][x])
                slot_grid.appendChild(div)
            }
        }

        
        console.log("replaced")
    } catch (e) {
        console.log(e)
    }


}

x_input.value = dimensions[0]
y_input.value = dimensions[1]
z_input.value = dimensions[2]

x_input.onchange = dimension_update
y_input.onchange = dimension_update
z_input.onchange = dimension_update

dimension_update()