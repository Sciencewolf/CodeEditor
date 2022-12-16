let index_of_the_line = 0
let KEYWORDS = ["chislo", "holovna", "kity", "kity_net", "ajbo", "nekaj", "vhod"] // keywords of pozpp 

let words = new Array() // list of words from input 
const log = console.log  //rename console.log to log


const getTagsOnLoad = () => {
    index_of_the_line++
    const span_el = document.getElementById("span-content")

    // Tags 
    let p_tag = document.createElement('p')
    p_tag.id = "counter"
    p_tag.innerHTML = index_of_the_line 

    let input_tag = document.createElement('input')
    input_tag.id = `input-field${index_of_the_line}`
    input_tag.type = "text"
    input_tag.className = `input-field${index_of_the_line}`
    input_tag.placeholder = "To make a new line press [ENTER]"
    input_tag.autocomplete = "none"

    span_el.appendChild(p_tag)
    span_el.appendChild(input_tag)

    // Button's 
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

    if(event.keyCode === 13) { //enter keycode
        index_of_the_line++
        log("Count: ", index_of_the_line)

        let new_span = document.createElement('span')
        new_span.id = `span-content${index_of_the_line}`
        new_span.className = `span-content${index_of_the_line}`

        let new_p = document.createElement('p')
        new_p.id = "counter"
        new_p.innerHTML = index_of_the_line

        let new_input = document.createElement('input')
        new_input.type = 'text'
        new_input.id = `input-field${index_of_the_line}`
        new_input.className = `input-field${index_of_the_line}`
        new_input.autocomplete = "none"

        new_span.appendChild(new_p)
        new_span.appendChild(new_input)

        div_el.appendChild(new_span)

        new_input.focus()

        addWordsToList()
    }
    else if(event.keyCode === 8 && index_of_the_line > 0) { // delete keycode
        log("Count: another", index_of_the_line)
        if (index_of_the_line < 1) index_of_the_line = 1
        else {
            const get_elem_span = document.getElementById(`span-content${index_of_the_line}`)
            const get_input = document.getElementById(`input-field${index_of_the_line}`)
            // need to remove words or chars and rewrite list with new word

            div_el.removeChild(get_elem_span)
            index_of_the_line--
            const last_input = document.querySelector(`.span-content${index_of_the_line} > input`)
            last_input.focus()

            // removeWordsFromList()  omw to fix
        }
    }
}


// Not fully finished, test is required
function addWordsToList() {
    const input_field = document.getElementById(`input-field${index_of_the_line - 1}`)

    let get_value = input_field.value
    let get_words = get_value.split(" ")

    words.push(get_words)
    log("List", words)

}

const changeColor = (previous_index_of_the_line) => {
    log('From changeColor function')
    let previous_line = Array(words)
    log("prev", previous_line)


}

// Required for implementation
const removeWordsFromList = () => {
    const get_current_active_elem = document.activeElement

}

// On button press copy all text  required for implemetation
const copyToClipboard = () => {
    log("From copy func")

}

// On button press save to a list all text and make a file and save it on desktop   required for implementation
const saveFile = () => {
    log("from save func")

}