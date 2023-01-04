let index_of_the_line = 0
let words = []
const light = '#e6e6e6'
const dark = '#414A4C'
const listFileExt = [
    "--Choose File Extension--", "(Pozakarpatskiy++) .pozpp",
    "(Text Documents) .txt", "(Python) .py", "(C++) .cpp", "(C#) .cs",
    "(Java) .java", "(Golang) .go", "(HTML) .html", "(CSS) .css",
    "(JavaScript) .js", "(TypeScript) .ts"
]
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
    button_save.addEventListener('click', () => {
        const dialog_div = document.querySelector('.dialog')
        dialog_div.style.display = 'block'
        getFileExtension()
    })
    btns.appendChild(button_copy)
    btns.appendChild(button_save)
}

const onLoad = () => {
    getTagsOnLoad()

    // Hide Attention for errors/bugs
    const hide_attention_text = document.getElementById('attention')
    setTimeout(() => {
        hide_attention_text.style.display = "none"
    }, 10_000)

    // Open settings
    const get_settings = document.querySelector('.settings')
    const settings_btn = document.querySelector('#open-settings')
    settings_btn.addEventListener('click', () => {
        changeTitleOnSettings()
        get_settings.style.display = 'block'
    })
    changeTheme()
    itemsInSettings()
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
} // Get text only when save btn or copy btn is pressed

const copyToClipboard = () => {
    let str = ""
    for (const line of words){ str += line + '\n' }
    navigator.clipboard.writeText(str).then(() => { log("Success") }).catch((err) => { error("Fail", err) })
}

const scrollToTopButton = () => {
    let count = 0
    const get_inputs = document.querySelectorAll('input')
    const div_elem = document.getElementById('scroll')
    const btn = document.createElement('button')
    btn.className = "btn-scroll"
    btn.id = "btn-scroll"
    btn.innerHTML = "To Top"

    if(document.getElementById('btn-scroll') && get_inputs.length !== 20 && get_inputs.length !== 15) { log("btn exists") }
    else {
        if(get_inputs.length === 20){
            div_elem.appendChild(btn)
        }
        else if(get_inputs.length === 15){
            const get_btn = document.getElementById('btn-scroll')
            div_elem.removeChild(get_btn)
        }
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
    btn.className = "btn-scroll-bottom"
    btn.id = "btn-scroll-bottom"
    btn.innerHTML = "To Bottom"

    div_elem.appendChild(btn)
    btn.addEventListener('click', () => { window.scrollTo(0, document.body.scrollHeight) })
}

const getFileExtension = () => {
    const dialog_div = document.querySelector('.dialog')
    const inputFileExt_divtag = document.querySelector('.input_file_ext')
    const get_file_ext = document.createElement('input')
    const choose_file_ext = document.createElement('select')
    const ok_button_tag = document.createElement('button')
    const cancel_button_tag = document.createElement('button')
    choose_file_ext.id = 'choose_file_ext'

    for(let opt = 0; opt < listFileExt.length; opt++){
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
    get_file_ext.placeholder = 'File Name'
    inputFileExt_divtag.appendChild(get_file_ext)

    ok_button_tag.id = "btn-ok"
    ok_button_tag.className = "btn-ok"
    ok_button_tag.innerHTML = "OK"

    inputFileExt_divtag.appendChild(choose_file_ext)
    inputFileExt_divtag.appendChild(ok_button_tag)

    cancel_button_tag.id = "btn-cancel"
    cancel_button_tag.className = "btn-cancel"
    cancel_button_tag.innerHTML = 'Cancel'

    inputFileExt_divtag.appendChild(cancel_button_tag)

    ok_button_tag.addEventListener('click', () => {
        saveFile()
        dialog_div.style.display = "none"
        inputFileExt_divtag.textContent = ""
    })

    cancel_button_tag.addEventListener('click', () => {
        dialog_div.style.display = "none"
        inputFileExt_divtag.textContent = ""
    })
}

const saveFile = () => {
    let lines = ""
    let fileName = ""
    let fileExtToSave = OK_button_inputFileExt()

    if(fileExtToSave.startsWith("#")){
        fileExtToSave = fileExtToSave.replace("#", "")
        fileName = fileExtToSave
    }
    else{
        fileExtToSave = fileExtToSave.replace(" ", "")
        fileName = `New File${fileExtToSave}`
    }
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
        get_body.style.backgroundColor = light
        get_h1_tag.style.color = dark
        get_h3_tag.style.color = dark
        get_h4_tag.style.color = dark
        get_a_tag.style.color = dark
    })
    dark_bgcolor_btn.addEventListener('click', () => {
        get_body.style.backgroundColor = dark
        get_h1_tag.style.color = light
        get_h3_tag.style.color = light
        get_h4_tag.style.color = light
        get_a_tag.style.color = light
    })
}

const OK_button_inputFileExt = () => {
    const get_choosen_file_ext = document.getElementById('choose_file_ext')
    const get_inputExt = document.querySelector('.get_file_ext')
    let get_text = get_choosen_file_ext.options[get_choosen_file_ext.selectedIndex].text
    let result = ""

    if (get_inputExt.value !== "") result = "#" + get_inputExt.value
    else if (get_text === "--Choose File Extension--") result = ".txt"
    return result
}

const changeTitleOnSettings = () => {
    const settings = document.getElementById('open-settings')
    const title_ofThePage = document.getElementById('title')
    settings.addEventListener('click', () => {
        title_ofThePage.innerHTML = "Settings"
    })
}

const itemsInSettings = () => {
    const get_settings_style = document.querySelector('.settings')
    const title_ofThePage = document.getElementById('title')

    const get_settings_panel = document.querySelector('#settings-panel')
    const ok_button = document.createElement('button')
    const cancel_button = document.createElement('button')
    const version = document.createElement('h5')

    ok_button.id = "ok-btn"
    ok_button.className = 'ok-btn'
    ok_button.type = 'button'
    ok_button.innerHTML = "OK"

    cancel_button.id = 'cancel-btn'
    cancel_button.className = 'cancel-btn'
    cancel_button.type = 'button'
    cancel_button.innerHTML = 'Cancel'

    version.innerHTML = 'Version 0.7'

    get_settings_panel.appendChild(ok_button)
    get_settings_panel.appendChild(cancel_button)
    get_settings_panel.appendChild(version)

    ok_button.addEventListener('click', () => {
        get_settings_style.style.display = 'none'
        title_ofThePage.innerHTML = 'Code Editor(beta)'
    })

    cancel_button.addEventListener('click', () => {
        get_settings_style.style.display = 'none'
        title_ofThePage.innerHTML = 'Code Editor(beta)'
    })
}