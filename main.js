let count = 1
let KEYWORDS = ["chislo", "holovna", "kity", "kity_net", "ajbo", "nekaj", "vhod"]

const getTagsOnLoad = () => {
    const span_el = document.getElementById('span-content')

    let p_tag = document.createElement('p')
    p_tag.id = "counter"
    p_tag.innerHTML = count 

    let input_tag = document.createElement('input')
    input_tag.id = "input-field"
    input_tag.type = "text"
    input_tag.className = "input-field"
    input_tag.placeholder = "To make a new line press [ENTER]"

    span_el.appendChild(p_tag)
    span_el.appendChild(input_tag)

    // console.log("from getTagsOnLoad function")


    const btns = document.getElementById('btns')
    let button_save = document.createElement('button')
    let button_copy = document.createElement('button')

    button_save.id = "btn-save"
    button_save.className = "btn-save"
    button_save.innerHTML = "Save"
    button_save.onclick = saveFile()

    button_copy.id = "btn-copy"
    button_copy.className = "btn-copy"
    button_copy.innerHTML = "Copy"
    button_copy.onclick = copyToClipboard()

    btns.appendChild(button_copy)
    btns.appendChild(button_save)

}

const appendOrDeleteLine = (event) => {
    const div_el = document.getElementById('inputs')

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
    else if(event.keyCode === 8 && count > 0) {
        console.log("Count: another", count)
        if (count < 2) count = 1
        else {
            const get_elem_span = document.getElementById(`span-content${count}`)

            div_el.removeChild(get_elem_span)
            count--

            const last_input = document.querySelector(`.span-content${count} > input`)
            last_input.focus()
        }
    }
}


const changeColor = () => {
    console.log('From changeColor function')

    const input_field = document.getElementById(`input-field${count}`)
    
}


// On button press copy all text
const copyToClipboard = () => {
    console.log("From copy func")

}

// On button press save to a list all text and make a file and save it on desktop
const saveFile = () => {

}