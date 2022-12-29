let index_of_the_line = 0
let KEYWORDS = [
    "chislo", "holovna", "kity", "kity_net", "ajbo", "nekaj", "vhod"
] // keywords of pozpp

let words = [] // list of words from input
const log = console.log  //rename console.log to log
const error = console.error


const getTagsOnLoad = () => {
    let count_intervals = 0
    let placeholders = [
        "To make a new line press [ENTER]", ""
    ]
    let count_placeholder = 0
    index_of_the_line++
    const span_el = document.getElementById("span-content")

    let p_tag = document.createElement('p')
    p_tag.id = "counter"
    p_tag.innerHTML = index_of_the_line

    let input_tag_onload = document.createElement('input')
    input_tag_onload.type = "text"
    input_tag_onload.id = `input-field${index_of_the_line}`
    input_tag_onload.className = `input-field${index_of_the_line}`
    const interval = setInterval(() => {
        if(!input_tag_onload.matches(':focus')){
            input_tag_onload.placeholder = placeholders[count_placeholder]
            count_placeholder = (count_placeholder + 1) % placeholders.length
            count_intervals++
        }
        else{
            input_tag_onload.placeholder = ""
        }

        if(count_intervals === 10){
            clearInterval(interval)
        }
    }, 1000)

    input_tag_onload.autocomplete = "none"

    span_el.appendChild(p_tag)
    span_el.appendChild(input_tag_onload)

    // Button's 
    const btns = document.getElementById('btns')
    let button_save = document.createElement('button')
    let button_copy = document.createElement('button')

    button_copy.id = "btn-copy"
    button_copy.className = "btn-copy"
    button_copy.innerHTML = "Copy to Clipboard"
    button_copy.addEventListener('click', () => {
        copyToClipboard()
    })

    button_save.id = "btn-save"
    button_save.className = "btn-save"
    button_save.innerHTML = "Save"
    button_save.addEventListener('click', () => {
        saveFile()
    })
    btns.appendChild(button_copy)
    btns.appendChild(button_save)
}

const appendOrDeleteLine = (event) => {
    const div_el = document.getElementById('inputs')

    if (event.key === 'Enter') { //enter keycode
        index_of_the_line++
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
        scrollToTop()
    } else if (event.key === "Backspace" && index_of_the_line > 0) { // delete keycode
        if (index_of_the_line < 1) index_of_the_line = 1
        else {
            const get_elem_span = document.getElementById(`span-content${index_of_the_line}`)
            const get_input = document.getElementById(`input-field${index_of_the_line}`)
            if (get_input.value === "") {
                div_el.removeChild(get_elem_span)
                index_of_the_line--
                const last_input = document.querySelector(`.span-content${index_of_the_line} > input`)
                last_input.focus()
                scrollToTop()
            }
        }
    }
}

// Not fully finished
function addWordsToList() {
    const input_field = document.getElementById(`input-field${index_of_the_line - 1}`)
    let get_value = input_field.value
    let get_words = get_value.split(" ")
    words.push(get_words)
}

//For the future  --freezedstatus
// const changeColor = () => {}
const copyToClipboard = () => {
    let str = ""
    for (const line of words){
        str += line + '\n'
    }
    navigator.clipboard.writeText(str).then(() => {
        log("Success")
    }).catch((err) => {
        error("Fail", err)
    })
}

const scrollToTop = () => {
    const get_inputs = document.querySelectorAll('input')
    const div_elem = document.getElementById('scroll')
    const btn = document.createElement('button')
    btn.className = "btn-scroll"
    btn.id = "btn-scroll"
    btn.innerHTML = "To Top"

    if(get_inputs.length === 10){
        div_elem.appendChild(btn)
    }
    else if(get_inputs.length === 9){
        const get_btn = document.getElementById('btn-scroll')
        div_elem.removeChild(get_btn)
    }

    btn.addEventListener('click', () => {
        window.scrollTo(0, 0)
    })
}

const saveFile = () => {
    let lines = ""
    const fileName = 'script.pozpp'
    for (let word of words){
        lines += word + '\n'
    }

    const blob = new Blob([lines], {type: "text/plain"})
    const url = URL.createObjectURL(blob)

    const a_tag = document.createElement('a')

    a_tag.id = "a_tag"
    a_tag.href = url
    a_tag.download = fileName
    a_tag.click()

    URL.revokeObjectURL(url)
}