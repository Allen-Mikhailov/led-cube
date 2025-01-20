const x_input = document.getElementById("x-dim")
const y_input = document.getElementById("y-dim")
const z_input = document.getElementById("z-dim")

const z_axis_input = document.getElementById("z-input")
const next_z = document.getElementById("next-z")
const prev_z = document.getElementById("prev-z")

const slot_grid = document.getElementById("grid-container")

const phase_count_input = document.getElementById("phase-count-input")
const phase_input = document.getElementById("phase-input")
const next_phase = document.getElementById("next-phase")
const prev_phase = document.getElementById("prev-phase")

const active_color = "#fff"
const unactive_color = "#000"

let dimensions = [3, 3, 3]
let z_axis = 0

let phase_count = 1
let selected_phase = 0


let phases = [] // data

let slots = {}

function clamp(v, min, max)
{
    return Math.min(Math.max(v, min), max)
}

function update_style(slot_element, value)
{
    slot_element.style.backgroundColor = value == 1?active_color:unactive_color
}

// this is some of the worst code I have ever written
function touch_slot(x, y)
{
    // phase check
    const phase = phases[selected_phase] || []
    phases[selected_phase] = phase

    // slice check
    const z_slice = phase[z_axis] || []
    phase[z_axis] = z_slice

    // row check
    const row = z_slice[y] || []
    z_slice[y] = row

    // value check
    value = row[x] || 0
    row[x] = value

    return value
        
}

function slot_update()
{
    for (let x = 0; x < dimensions[0]; x++)
    {
        for (let y = 0; y < dimensions[1]; y++)
        {
            const div = slots[`${x},${y}`]
            update_style(div, touch_slot(x, y))
        }
    }
}

function update_phase(new_phase)
{
    new_phase = clamp(new_phase, 0, phase_count-1)
    selected_phase = new_phase
    phase_input.value = new_phase+1
    slot_update()
}

phase_input.onchange = () => {
    try {
        update_phase(parseInt(phase_input.value)-1)
    } catch(e) {
        console.log(e)
    }
}

function update_z_slice(new_z)
{
    new_z = clamp(new_z, 0, dimensions[2]-1)
    z_axis_input.value = new_z+1
    z_axis = new_z
    slot_update()
}

z_axis_input.onchange = () => {
    try {
        update_phase(parseInt(z_axis_input.value)-1)
    } catch(e) {
        console.log(e)
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

        const size = 100/Math.max(dimensions[0], dimensions[1])

        slot_grid.replaceChildren();
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
                    const value = touch_slot(x, y) == 0?1:0
                    phases[selected_phase][z_axis][y][x] = value
                    update_style(div, value)
                }
                update_style(div, touch_slot(x, y))
                slots[`${x},${y}`] = div
                slot_grid.appendChild(div)
            }
        }
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

next_z.onclick = () => update_z_slice(z_axis+1)
prev_z.onclick = () => update_z_slice(z_axis-1)

next_phase.onclick = () => update_phase(selected_phase+1)
prev_phase.onclick = () => update_phase(selected_phase-1)

phase_input.value = 1
z_axis_input.value = 1

phase_count_input.value = phase_count
phase_count_input.onchange = () => phase_count = parseInt(phase_count_input.value)

dimension_update()