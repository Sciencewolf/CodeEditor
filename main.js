let count = 0

const appendOrDeleteLine = (event) => {
    const div_el = document.getElementById('inputs')
    const p_counter = document.getElementById('counter')

    if(event.keyCode === 13) {
        count++
        console.log("Count: ", count)

        let new_span = document.createElement('span')
        new_span.id = `span-content${count}`
        new_span.className = `span-content${count}`

        let new_p = document.createElement('p')
        new_p.id = "counter"
        new_p.innerHTML = count

        let new_input = document.createElement('input')
        new_input.type = 'text'
        new_input.id = "input-field"
        new_input.className = "input-field"

        new_span.appendChild(new_p)
        new_span.appendChild(new_input)

        div_el.appendChild(new_span)

        new_input.focus()
        
    }

    if(event.keyCode === 8) {
        count--
        console.log("Count: another", count)

        const get_elem_div = document.getElementById('inputs')
        const get_elem_span = document.getElementById(`span-content${count}`)

        get_elem_div.removeChild(get_elem_span)

    }
}


const changeColor = () => {

    let KEYWORDS = ["chislo", "holovna", "kity", "kity_net", "ajbo", "nekaj", "vhod"]

    const div_el = document.getElementById('inputs')
    const input_field = document.getElementById('input-field')

    if (input_field.value in KEYWORDS) {
        input_field.style.color = "red"
        
        console.log(KEYWORDS)
    }
    else textArea.style.color = "black"
}


// On button press copy all text
const copyToClipboard = () => {

}

// On button press save to a list all text and make a file and save it on desktop
const saveFile = () => {

}