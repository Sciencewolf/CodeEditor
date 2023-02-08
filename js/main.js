"use strict"
let words = []
let global_get_default_file_ext = ""
let global_textarea_cols = 150
let statusIsAnyWindowIsOpened = false
let notification_list = []

const listFileExt = [
    "--Choose File Extension--", "(Pozakarpatskiy++) .pozpp",
    "(Text Documents) .txt", "(Python) .py", "(C++) .cpp", "(C#) .cs",
    "(Java) .java", "(Golang) .go", "(HTML) .html", "(CSS) .css",
    "(JavaScript) .js", "(TypeScript) .ts"
]

const themes = {
  Black: "#000",
  Dark: "#414A4C",
  Melon: "#EBB3A9",
  Tea_Green: "#D1F0B1",
  Blue_Sapphire: "#086788",
  Ming: "#407076",
  Jet: "#39393A",
  Floral_White: "#FFFCF2",
};

const listDefaultFileExt = [
  ".txt", ".html", ".css", ".js",
  ".ts", ".cs", ".py", ".cpp",
  ".java", ".go", ".pozpp",
]

const eventKeys = [ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight" ]

const title_ofThePage = document.querySelector('title')
const log = console.log
const error = console.error

const onLoad = () => {
    getTagsOnLoad()
    // Open settings
    const get_settings = document.querySelector('.settings')
    const settings_btn = document.querySelector('#open-settings')
    settings_btn.addEventListener('click', () => {
        changeTitleOnSettings()
        get_settings.style.display = 'block'

        // Add Event for label
        const labels = document.querySelectorAll('label')
        labels.forEach(label => {
            label.addEventListener('click', () => {
                const checkbox = label.previousElementSibling
                checkbox.checked = !checkbox.checked
            })
        })
    })
    // Open plugins
    const get_plugin = document.querySelector('.plugins')
    const plugin_btn = document.querySelector('#open-plugins')
    plugin_btn.addEventListener('click', () => {
        changeTitleOnPlugins()
        get_plugin.style.display = 'block'
    })
    itemsInSettings()
    itemsInPlugins()
}

function getTagsOnLoad() {
    textArea()
    notificationList()
    const btns = document.getElementById('btns')
    const dialog_div = document.querySelector('.dialog')
    let button_save = document.createElement('button')
    let button_copy = document.createElement('button')

    button_copy.id = "btn-copy"
    button_copy.className = "btn-copy"
    button_copy.innerHTML = "Copy to Clipboard"
    button_copy.addEventListener('click', () => {
        changeTitleOnCopy()
        setTimeout(() => {
            changeTitleToDefault()
        }, 3500)

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
        statusIsAnyWindowIsOpened = true
        if(dialog_div.style.display === "block") {
            notification('Dialog is opened', 1)
            return
        }
        addWordsToList()
        dialog_div.style.display = 'block'
        getFileExtension()
    })
    btns.appendChild(button_copy)
    btns.appendChild(button_save)
}

function notificationList() {
    const button = document.querySelector('#notification-button')
    const close_btn = document.querySelector("#btn-not-close")
    const span_notification = document.querySelector('.span-notification')

    button.addEventListener('click', () => {
        span_notification.style.display = "flex"
    })

    close_btn.addEventListener('click', () => {
        span_notification.style.display = "none"
    })

    if(notification_list.length > 0) {
        button.style.backgroundColor = "yellow"
    }
}

function notification(text, z_index) {
    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()

    if(statusIsAnyWindowIsOpened) {
        const div = document.createElement('div')
        const img = document.createElement('img')
        const p = document.createElement('p')
        const body = document.querySelector('body')

        div.id = 'div_notification'
        div.className = 'div-notification'
        div.style.display = 'flex'
        div.style.justifyContent = 'center'
        div.style.alignItems = 'center'
        div.style.gap = "2em"
        div.style.zIndex = z_index

        p.innerHTML = text
        img.src = "icons8-alarm-24.png"

        div.appendChild(img)
        div.appendChild(p)
        body.appendChild(div)

        setTimeout(() => {
            body.removeChild(div)
        }, 2000)
    }

    let _date = `${hour} : ${min}`
    notification_list.push(text)
    notification_list.push(_date)

    log(notification_list)
}

function textArea() {
    const textarea = document.getElementById('textarea')
    textarea.focus()
    textarea.rows = 1
    textarea.cols = global_textarea_cols
    textarea.style.resize = 'none'
    manipulateTextArea()

    textarea.addEventListener('paste', () => {
        appendTextOnPaste()
    })

    textarea.style.height = "unset"
}

function manipulateTextArea() {
    const get_textarea = document.getElementById('textarea')

    // increase rows
    get_textarea.addEventListener('keydown', function(event){
        if(event.key === 'Enter') get_textarea.rows += 1
        updateCurrentLineColumnNumber()
    })

    // decrease rows
    get_textarea.addEventListener('keydown', (event) => {
        if(event.key === 'Backspace') {
            let text = get_textarea.value
            let cursorPos = get_textarea.selectionStart
            let substringBeforeCursor = text.substring(0, cursorPos);
            let lastNewlineIndex = substringBeforeCursor.lastIndexOf("\n");
            let currentLine = substringBeforeCursor.substring(lastNewlineIndex + 1, cursorPos);
            if(currentLine.length > 0) return

            get_textarea.rows -= 1
            updateCurrentLineColumnNumber()
        }
    })

    // increase cols
    get_textarea.addEventListener('input', () => {
        let col = get_textarea.cols
        let text = get_textarea.value
        let lines = text.split('\n')

        for(let i = 0;i < lines.length;i++) {
            let lineLength = lines[i].length
            if(lineLength > col) get_textarea.cols = lineLength
            updateCurrentLineColumnNumber()
        }
    })

    // decrease cols
    get_textarea.addEventListener('keydown', (event) => {
        if(event.key === 'Backspace') {
            let cols = get_textarea.cols
            if(cols > global_textarea_cols) get_textarea.cols -= 1
            updateCurrentLineColumnNumber()
        }
    })
}

function appendTextOnPaste() {
    const textarea = document.querySelector('textarea')
    textarea.addEventListener('input', () => {
        textarea.style.height = textarea.scrollHeight + 'px'
        // textarea.style.height = "auto"
    })
}

function addWordsToList() {
    words.length = 0
    const get_textarea = document.getElementById('textarea')
    let text = get_textarea.value
    words.push(text)
}

function copyToClipboard() {
    let str = ""
    for (const line of words){ str += line + '\n' }
    navigator.clipboard.writeText(str).then(() => { log("Success") }).catch((err) => { error("Fail", err) })
    log(str)
}

function getFileExtension() {
    const dialog_div = document.querySelector('.dialog')
    const inputFileExt_divtag = document.querySelector('.input_file_ext')
    const get_file_ext = document.createElement('input')
    const choose_file_ext = document.createElement('select')
    const div_btn = document.createElement('div')
    const ok_button_tag = document.createElement('button')
    const cancel_button_tag = document.createElement('button')
    choose_file_ext.id = 'choose_file_ext'

    div_btn.id = "div-btn-action"
    div_btn.className = "div-btn-action"

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
    div_btn.appendChild(ok_button_tag)

    cancel_button_tag.id = "btn-cancel"
    cancel_button_tag.className = "btn-cancel"
    cancel_button_tag.innerHTML = 'Cancel'

    div_btn.appendChild(cancel_button_tag)
    inputFileExt_divtag.appendChild(div_btn)

    ok_button_tag.addEventListener('click', () => {
        changeTitleToDefault()
        saveFile()
        dialog_div.style.display = "none"
        inputFileExt_divtag.textContent = ""
        statusIsAnyWindowIsOpened = false
    })

    cancel_button_tag.addEventListener('click', () => {
        changeTitleToDefault()
        dialog_div.style.display = "none"
        inputFileExt_divtag.textContent = ""
        statusIsAnyWindowIsOpened = false
    })

    detectClickOuterDialogDiv()
}

function saveFile() {
    let lines = ""
    let fileName
    let fileExtToSave = okButtonInputFileExt()

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
    a_tag.href = url
    a_tag.download = fileName
    a_tag.click()

    URL.revokeObjectURL(url)
}

function okButtonInputFileExt() {
    const get_chosen_file_ext = document.getElementById('choose_file_ext')
    const get_inputExt = document.querySelector('.get_file_ext')
    let get_text = get_chosen_file_ext.options[get_chosen_file_ext.selectedIndex].text
    let result = ""
    let lastIndexOf = get_inputExt.value.lastIndexOf('.')

    if (get_inputExt.value !== "") result = "#" + get_inputExt.value + global_get_default_file_ext
    else if (lastIndexOf > 0) {
        for (let i = lastIndexOf;i < get_inputExt.value.length; i++) {
            result += i
        }
        return result
    }
    else if (get_text === "--Choose File Extension--") result = `${global_get_default_file_ext}`
    return result
}

function detectClickOuterDialogDiv() {
    const dialog_div = document.getElementById('dialog')

    window.addEventListener('click', (event) => {
        if(!dialog_div.contains(event.target)) {
            dialog_div.style.scale = `${1.1}`
            dialog_div.style.transition = "0.4s all"
            setTimeout(() => {
                dialog_div.style.scale = `${1}`
            }, 500)
            notification("Save file", 0)
        }
    })
}

const itemsFor_updateCurrentLineColumnNumber = (textarea, span_line, span_column) => {
    let cursorPos = textarea.selectionStart;
    let textBeforeCursor = textarea.value.substring(0, cursorPos);
    let currentRow = textBeforeCursor.split("\n").length;
    let currentCol = cursorPos - textBeforeCursor.lastIndexOf("\n");
    span_line.innerHTML = `${currentRow}`
    span_column.innerHTML = `${currentCol}`
}

function updateCurrentLineColumnNumber() {
    const textarea = document.querySelector('textarea')
    const span_line = document.getElementById('line')
    const span_column = document.getElementById('column')

    textarea.addEventListener('click', () => {
        itemsFor_updateCurrentLineColumnNumber(textarea, span_line, span_column)
    })
    textarea.addEventListener('keyup', (event) => {
        if(eventKeys.includes(event.key)) {
            itemsFor_updateCurrentLineColumnNumber(textarea, span_line, span_column)
        }
    })
    itemsFor_updateCurrentLineColumnNumber(textarea, span_line, span_column)
}

function itemsInSettings() {
  const get_settings_style = document.querySelector(".settings");
  const span_buttons = document.querySelector("#span-buttons");
  const select_default_fileExt = document.getElementById("select-default-file-ext");

  const ok_button = document.createElement("button");
  const cancel_button = document.createElement("button");
  const apply_button = document.createElement("button");

  ok_button.id = "ok-btn";
  ok_button.className = "ok-btn";
  ok_button.type = "button";
  ok_button.innerHTML = "OK";

  cancel_button.id = "cancel-btn";
  cancel_button.className = "cancel-btn";
  cancel_button.type = "button";
  cancel_button.innerHTML = "Cancel";

  apply_button.id = "apply-btn";
  apply_button.className = "apply-btn";
  apply_button.type = "button";
  apply_button.innerHTML = "Apply";

  for (let opt = 0; opt < listDefaultFileExt.length; opt++) {
    const option = document.createElement("option");
    if(listDefaultFileExt[opt] === ".txt") {
        option.innerHTML = listDefaultFileExt[opt]
        option.selected = true
    }
    option.innerHTML = listDefaultFileExt[opt];
    select_default_fileExt.appendChild(option);
  }

  span_buttons.appendChild(ok_button);
  span_buttons.appendChild(cancel_button);
  span_buttons.appendChild(apply_button);

  ok_button.addEventListener("click", () => {
      actionsInSettings()
      get_settings_style.style.display = "none";
      changeTitleToDefault();
  });

  cancel_button.addEventListener("click", () => {
    get_settings_style.style.display = "none";
    changeTitleToDefault();
  });

  apply_button.addEventListener("click", () => { actionsInSettings() });
}

function actionsInSettings() {
    // Select Theme
    changeThemeToChosenColor()

    // Set Default file extension
    setDefaultFileExtension()

    // Choose font size
    chooseFontSize()

    // Smooth scrolling option
    smoothScrolling()

    // Hide to top/bottom buttons
    hideToTopBottomButtons()

    // Enable spellcheck
    enableSpellcheck()

    //Line:Column number
    showLineColumnNumber()
}

function changeThemeToChosenColor() {
    const option_for_theme = document.getElementById("select-theme");
    const get_body = document.querySelector("body");

    let color = option_for_theme.options[option_for_theme.selectedIndex].text;
    if (color.indexOf(" ") > -1) {
        color = color.replace(" ", "_");
    }
    get_body.style.backgroundColor = themes[color];
    if(color === "Dark" || color === "Jet"){
        changeColorOnDarkThemes(color)
    }
    changeColorOnLightThemes()
}

function setDefaultFileExtension() {
    const select_default_fileExt = document.getElementById("select-default-file-ext");
    global_get_default_file_ext = select_default_fileExt.options[select_default_fileExt.selectedIndex].text;
}

function chooseFontSize() {
    const select_choose_font_size = document.getElementById('select-choose-font-size')
    const get_textarea = document.querySelector('textarea')
    get_textarea.style.fontSize = select_choose_font_size.options[select_choose_font_size.selectedIndex].text.toLowerCase()
}

function smoothScrolling() {
    const checkbox_enable_smooth_scrolling = document.getElementById("checkbox-enable-smooth-scrolling");
    const html = document.querySelector("html");
    !checkbox_enable_smooth_scrolling.checked ? html.style.scrollBehavior = "unset" : html.style.scrollBehavior = "smooth"
}

function hideToTopBottomButtons() {
    const checkbox_hide_to_buttons = document.getElementById("checkbox-hide-scrollto-buttons");
    const label = document.getElementById('label-hide-scrollto-buttons')
    label.addEventListener('click', () => {
        checkbox_hide_to_buttons.checked = true
    })
    const scroll_to_btn = document.querySelector('div.scroll')
    !checkbox_hide_to_buttons.checked ? scroll_to_btn.style.display = "flex" : scroll_to_btn.style.display = "none"
}

function enableSpellcheck() {
    const textarea = document.querySelector('textarea')
    const checkbox_enable_spellcheck = document.getElementById('checkbox-spellcheck')
    checkbox_enable_spellcheck.checked ? textarea.spellcheck = true : textarea.spellcheck = false
}

function showLineColumnNumber() {
    const checkbox_line_column_number = document.getElementById('checkbox-line_column-number')
    const label = document.getElementById('label-line_column-number')
    const span_line_column_number = document.getElementById('span-Line_Column-number')

    label.addEventListener('click', () => {
        const checkbox = label.previousElementSibling
        checkbox.checked = !checkbox.checked
        log('pressed label')
    })
    checkbox_line_column_number.checked ?
        span_line_column_number.style.display = "flex" : span_line_column_number.style.display = "none"
}

function itemsInPlugins() {
    const get_plugins_style = document.querySelector('.plugins')
    const span_plugin_buttons = document.querySelector('#span-plugin-buttons')

    const ok_button_plugin = document.createElement("button");
    const cancel_button_plugin = document.createElement("button");
    const apply_button_plugin = document.createElement("button");

    ok_button_plugin.id = "ok-btn";
    ok_button_plugin.className = "ok-btn";
    ok_button_plugin.type = "button";
    ok_button_plugin.innerHTML = "OK";

    cancel_button_plugin.id = "cancel-btn";
    cancel_button_plugin.className = "cancel-btn";
    cancel_button_plugin.type = "button";
    cancel_button_plugin.innerHTML = "Cancel";

    apply_button_plugin.id = "apply-btn";
    apply_button_plugin.className = "apply-btn";
    apply_button_plugin.type = "button";
    apply_button_plugin.innerHTML = "Apply";

    span_plugin_buttons.appendChild(ok_button_plugin)
    span_plugin_buttons.appendChild(cancel_button_plugin)
    span_plugin_buttons.appendChild(apply_button_plugin)

    ok_button_plugin.addEventListener('click', () => {
        actionsInPlugins()
        get_plugins_style.style.display = 'none'
        changeTitleToDefault()
    })
    cancel_button_plugin.addEventListener('click', () => {
        get_plugins_style.style.display = 'none'
        changeTitleToDefault()
    })
    apply_button_plugin.addEventListener('click', () => { actionsInPlugins() })
}

function actionsInPlugins() {
    // Prettier
    prettier()
}

function prettier() {
    log('prettier')
}


function changeColorOnDarkThemes(color) {
    const h1 = document.querySelector('h1')
    const buttons = document.querySelectorAll('button')
    const textarea = document.querySelector('textarea')

    if(color === "Dark" || color === "Jet") {
        h1.style.color = themes["Floral_White"]
        buttons.forEach(button => {
            if(!button.id.startsWith("open-settings")){
                button.style.color = themes["Floral_White"]
                button.style.backgroundColor = themes["Black"]
            }
        })
        textarea.style.color = "black"
        textarea.style.backgroundColor = themes["Floral_White"]
    }
}

function changeColorOnLightThemes() {
    const h1 = document.querySelector('h1')
    const buttons = document.querySelectorAll('button')
    const textarea = document.querySelector('textarea')

    h1.style.color = themes['Black']
    buttons.forEach(button => {
        if(!button.id.startsWith('open-plugins') && !button.id.startsWith('open-settings')) {
            button.style.color = themes['Black']
            button.style.backgroundColor = 'buttonface'
        }
    })
}

function scrollToTopButton() { window.scrollTo(0, 0) }
function scrollToBottomButton() { window.scrollTo(0, document.body.scrollHeight) }
function changeTitleOnSettings() { title_ofThePage.innerHTML = "Settings" }
function changeTitleOnPlugins() { title_ofThePage.innerHTML = "Plugin's" }
function changeTitleOnCopy() { title_ofThePage.innerHTML = "Copied" }
function changeTitleToDefault() { title_ofThePage.innerHTML = "Code Editor(beta)" }