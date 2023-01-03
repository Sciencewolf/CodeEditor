let index_of_the_line = 0
let words = []
let fileExtToSave = ""
const log = console.log
const error = console.error

const getTagsOnLoad = () => {
    let count_intervals = 0
    let count_placeholder = 0
    let placeholders = [
        "To make a new line press [ENTER]", ""
    ]
    index_of_the_line++
    const span_el = document.getElementById("span-content")

    let p_tag = document.createElement('p')
    p_tag.id = "counter"
    p_tag.innerHTML = index_of_the_line

    let input_tag_onload = document.createElement('input')
    input_tag_onload.type = "text"
    input_tag_onload.id = `input-field${index_of_the_line}`
    input_tag_onload.className = `input-field${index_of_the_line}`
    input_tag_onload.autocomplete = "none"

    const interval = setInterval(() => {
        if(!input_tag_onload.matches(':focus')){
            input_tag_onload.placeholder = placeholders[count_placeholder]
            count_placeholder = (count_placeholder + 1) % placeholders.length
            count_intervals++
        }
        else{ input_tag_onload.placeholder = "" }
        if(count_intervals === 10){ clearInterval(interval) }
    }, 1000)

    span_el.appendChild(p_tag)
    span_el.appendChild(input_tag_onload)

    const btns = document.getElementById('btns')
    let button_save = document.createElement('button')
    let button_copy = document.createElement('button')

    button_copy.id = "btn-copy"
    button_copy.className = "btn-copy"
    button_copy.innerHTML = "Copy to Clipboard"
    button_copy.addEventListener('click', () => {
        copyToClipboard()
        setTimeout(() => {
            button_copy.innerHTML = "Copied"
        }, 200)
        setTimeout(() => {
            button_copy.innerHTML = "Copy to Clipboard"
        }, 3500)

    })

    button_save.id = "btn-save"
    button_save.className = "btn-save"
    button_save.innerHTML = "Save"
    button_save.addEventListener('click', () => { chooseFileExtension() })
    btns.appendChild(button_copy)
    btns.appendChild(button_save)
    changeTheme()
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
        scrollToTopButton()
    } else if (event.key === "Backspace" && index_of_the_line > 0) { // delete keycode
        if (index_of_the_line < 1){ index_of_the_line = 1 }
        else {
            const get_elem_span = document.getElementById(`span-content${index_of_the_line}`)
            const get_input = document.getElementById(`input-field${index_of_the_line}`)
            if (get_input.value === "") {
                div_el.removeChild(get_elem_span)
                index_of_the_line--
                const last_input = document.querySelector(`.span-content${index_of_the_line} > input`)
                last_input.focus()
                scrollToTopButton()
            }
        }
    }
}

function addWordsToList() {
    const input_field = document.getElementById(`input-field${index_of_the_line - 1}`)
    let get_value = input_field.value
    let get_words = get_value.split(" ")
    words.push(get_words)
}

const copyToClipboard = () => {
    let str = ""
    for (const line of words){ str += line + '\n' }
    navigator.clipboard.writeText(str).then(() => { log("Success") }).catch((err) => { error("Fail", err) })
}

const dialog = () => {
    const get_dialog_div = document.querySelector('.dialog')
    const close_btn = document.createElement('button')
    const ok_btn = document.createElement('button')

    close_btn.id = "btn-close"
    close_btn.className = "btn-close"
    close_btn.innerHTML = "Close"
    close_btn.addEventListener('click', () => {
        get_dialog_div.close()
    })

    ok_btn.id = "btn-ok"
    ok_btn.className = "btn-ok"
    ok_btn.innerHTML = "Ok"
    ok_btn.addEventListener('click', () => {
        get_dialog_div.close()
    })

}

const scrollToTopButton = () => {
    let count = 0
    const get_inputs = document.querySelectorAll('input')
    const div_elem = document.getElementById('scroll')
    const btn = document.createElement('button')
    btn.className = "btn-scroll"
    btn.id = "btn-scroll"
    btn.innerHTML = "To Top"

    if(get_inputs.length === 49){ div_elem.appendChild(btn) }
    else if(get_inputs.length === 26){
        const get_btn = document.getElementById('btn-scroll')
        div_elem.removeChild(get_btn)
    }

    btn.addEventListener('click', () => {
        window.scrollTo(0, 0)
        const interval = setInterval(() => {
            if(count === 1){
                clearInterval(interval)
            }else if(count > 1) {
                clearInterval(interval)
            }
            else{
                scrollToBottomButton()
                clearInterval(interval)
                count++
            }
        }, 500)
    })
}

const scrollToBottomButton = () => {
    const div_elem = document.getElementById('scroll')
    const btn = document.createElement('button')
    btn.className = "btn-scroll"
    btn.id = "btn-scroll"
    btn.innerHTML = "To Bottom"

    div_elem.appendChild(btn)
    btn.addEventListener('click', () => { window.scrollTo(0, document.body.scrollHeight) })
}

const chooseFileExtension = () => {
    const listFileExt = [
        "--Choose File Extension--", "(Pozakarpatskiy++) .pozpp",
        "(Text Documents) .txt", "(Python) .py", "(C++) .cpp", "(C#) .cs",
        "(Java) .java", "(Golang) .go", "(HTML) .html", "(CSS) .css",
        "(JavaScript) .js", "(TypeScript) .ts"
    ]

    const inputFileExt_divtag = document.querySelector('.input_file_ext')
    inputFileExt_divtag.style.display = "flex"
    const get_file_ext = document.createElement('input')
    const choose_file_ext = document.createElement('select')
    const h2_tag = document.createElement('h2')
    const button_tag = document.createElement('button')
    choose_file_ext.id = 'choose_file_ext'

    for(let opt = 0; opt < 12; opt++){
        const create_option = document.createElement('option')
        create_option.id = `option${opt}`
        create_option.className = `option${opt}`
        create_option.value = `${opt}`
        create_option.innerHTML =`${listFileExt[opt]}`

        choose_file_ext.appendChild(create_option)
    }

    get_file_ext.type = 'text'
    get_file_ext.id = 'get_file_ext'
    get_file_ext.className = 'get_file_ext'
    get_file_ext.autocomplete = 'none'
    get_file_ext.placeholder = 'Enter file extension'
    inputFileExt_divtag.appendChild(get_file_ext)

    h2_tag.id = "text_h2"
    h2_tag.className = "text_h2"
    h2_tag.innerHTML = "---- Or choose from the list ----"
    inputFileExt_divtag.appendChild(h2_tag)

    button_tag.id = "btn-ok"
    button_tag.className = "btn-ok"
    button_tag.innerHTML = "OK"
    button_tag.addEventListener('click', () => {
        inputFileExt_divtag.style.display = "none"
        inputFileExt_divtag.textContent = ""
    })
    inputFileExt_divtag.appendChild(choose_file_ext)

    inputFileExt_divtag.appendChild(button_tag)

}

const saveFile = (fileExt) => {
    let lines = ""
    const fileName = `code.${fileExt}`
    for (let word of words){ lines += word + '\n' }

    const blob = new Blob([lines], {type: "text/plain"})
    const url = URL.createObjectURL(blob)

    const a_tag = document.createElement('a')
    a_tag.id = "a_tag"
    a_tag.href = url
    a_tag.download = fileName
    a_tag.click()

    URL.revokeObjectURL(url)
}

const changeTheme = () => {
    const get_body = document.querySelector('body')
    const light_bgcolor_btn = document.getElementById('light-btn')
    const dark_bgcolor_btn = document.getElementById('dark-btn')

    const get_h1_tag = document.querySelector('h1')
    const get_h3_tag = document.querySelector('h3')
    const get_h4_tag = document.querySelector('h4')
    const get_a_tag = document.getElementById('syntax')

    light_bgcolor_btn.addEventListener('click', () => {
        get_body.style.backgroundColor = "#e6e6e6"

        get_h1_tag.style.color = '#414A4C'
        get_h3_tag.style.color = '#414A4C'
        get_h4_tag.style.color = '#414A4C'
        get_a_tag.style.color = '#414A4C'
    })
    dark_bgcolor_btn.addEventListener('click', () => {
        get_body.style.backgroundColor = "#414A4C"

        get_h1_tag.style.color = '#e6e6e6'
        get_h3_tag.style.color = '#e6e6e6'
        get_h4_tag.style.color = '#e6e6e6'
        get_a_tag.style.color = '#e6e6e6'
    })
}