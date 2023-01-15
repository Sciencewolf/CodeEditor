let words = []
let global_get_default_file_ext = ""
let global_textarea_cols = 100

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
];

const title_ofThePage = document.querySelector('title')
const log = console.log
const error = console.error

const fetchJSONFile = async() => {
    let JSON_data = ""
    await fetch("data.json")
        .then(response => response.json()).then(json => {JSON_data = json})
    return JSON_data
}

const onLoad = () => {
    getTagsOnLoad()
    // Hide Attention for errors/bugs
    const hide_attention_text = document.getElementById('attention')
    setTimeout(() => {
        hide_attention_text.style.display = "none"
    }, 5_000)
    // Open settings
    const get_settings = document.querySelector('.settings')
    const settings_btn = document.querySelector('#open-settings')
    settings_btn.addEventListener('click', () => {
        changeTitleOnSettings()
        get_settings.style.display = 'block'
    })
    itemsInSettings()
}

const getTagsOnLoad = () => {
    textArea()
    const btns = document.getElementById('btns')
    let button_save = document.createElement('button')
    let button_copy = document.createElement('button')

    button_copy.id = "btn-copy"
    button_copy.className = "btn-copy"
    button_copy.innerHTML = "Copy to Clipboard"
    button_copy.addEventListener('click', () => {
        changeTitleOnCopy()
        setInterval(() => {
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
        changeTitleOnSave()
        addWordsToList()
        const dialog_div = document.querySelector('.dialog')
        dialog_div.style.display = 'block'
        getFileExtension()
    })
    btns.appendChild(button_copy)
    btns.appendChild(button_save)
}

function textArea() {
    const textarea = document.getElementById('textarea')
    textarea.rows = 1
    textarea.cols = global_textarea_cols
    textarea.style.resize = "none"

    manipulateTextArea()
}

function manipulateTextArea() {
    const get_textarea = document.getElementById('textarea')

    // increase rows
    get_textarea.addEventListener('keydown', function(event){
        if(event.key === 'Enter') get_textarea.rows += 1
        resizeTextareaDiv()
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
            resizeTextareaDiv()
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
            resizeTextareaDiv()
        }
    })

    // decrease cols, delete until cols !== 50
    get_textarea.addEventListener('keydown', (event) => {
        if(event.key === 'Backspace') {
            let cols = get_textarea.cols
            if(cols > global_textarea_cols) get_textarea.cols -= 1
            resizeTextareaDiv()
        }
    })
}

function resizeTextareaDiv() {
    const div_textarea = document.getElementById('div-textarea')
    const textarea = document.querySelector('textarea')

    div_textarea.style.width = textarea.offsetWidth + 'px'
    div_textarea.style.height = textarea.offsetHeight + 'px'
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
        changeTitleToDefault()
        saveFile()
        dialog_div.style.display = "none"
        inputFileExt_divtag.textContent = ""
    })

    cancel_button_tag.addEventListener('click', () => {
        changeTitleToDefault()
        dialog_div.style.display = "none"
        inputFileExt_divtag.textContent = ""
    })
}

const saveFile = () => {
    let lines = ""
    let fileName = ""
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
    a_tag.id = "a_tag"
    a_tag.href = url
    a_tag.download = fileName
    a_tag.click()

    URL.revokeObjectURL(url)
}

const okButtonInputFileExt = () => {
    const get_chosen_file_ext = document.getElementById('choose_file_ext')
    const get_inputExt = document.querySelector('.get_file_ext')
    let get_text = get_chosen_file_ext.options[get_chosen_file_ext.selectedIndex].text
    let result = ""
    let lastIndexOf = get_inputExt.value.lastIndexOf('.')

    if (get_inputExt.value !== "") return result = "#" + get_inputExt.value + global_get_default_file_ext
    else if (lastIndexOf > 0) {
        for (let i = lastIndexOf;i < get_inputExt.value.length; i++) {
            result += i
        }
        return result
    }
    else if (get_text === "--Choose File Extension--") return result = `${global_get_default_file_ext}`
    else return result = get_text
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
    try {
      actionsInSettings();
    } catch (err) {
      error("Error", err);
    }

    get_settings_style.style.display = "none";
    changeTitleToDefault();
  });

  cancel_button.addEventListener("click", () => {
    get_settings_style.style.display = "none";
    changeTitleToDefault();
  });

  apply_button.addEventListener("click", () => {
    actionsInSettings();
  });
}

const actionsInSettings = () => {
    // Smooth scrolling option
    smoothScrolling();

    // Select Theme
    changeThemeToChosenColor();

    // Hide to top/bottom buttons
    hideToTopBottomButtons();

    // Set Default file extension
    setDefaultFileExtension();

    // Choose font size
    chooseFontSize()

    // Highlight keywords
    highlightKeywords()
}

function smoothScrolling() {
  const checkbox_enable_smooth_scrolling = document.getElementById("checkbox-enable-smooth-scrolling");
  const html = document.querySelector("html");

  if (!checkbox_enable_smooth_scrolling.checked) {
    html.style.scrollBehavior = "unset";
  } else {
    html.style.scrollBehavior = "smooth";
  }
}

function changeThemeToChosenColor() {
    const option_for_theme = document.getElementById("select-theme");
    const get_body = document.querySelector("body");

    let color = option_for_theme.options[option_for_theme.selectedIndex].text;
    if (color.indexOf(" ") > -1) {
        color = color.replace(" ", "_");
    }
    get_body.style.backgroundColor = themes[color];
    changeColorOnDarkThemes(color)
}

function changeColorOnDarkThemes(color) {
    if(color === "Dark" || color === "Jet"){
        const h1 = document.querySelector('h1')
        const buttons = document.querySelectorAll('button')
        const textarea = document.querySelector('textarea')

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

const hideToTopBottomButtons = () => {
  const checkbox_hide_to_buttons = document.getElementById("checkbox-hide-scrollto-buttons");
  const scroll_to_btn = document.querySelector('div.scroll')

  if (!checkbox_hide_to_buttons.checked) scroll_to_btn.style.display = "flex"
  else scroll_to_btn.style.display = "none"
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

function highlightKeywords() {
    const checkbox_highlight_keywords = document.getElementById('checkbox-highlight-keywords')
    if(checkbox_highlight_keywords.checked){
        log('checked')
    }
}

const scrollToTopButton = () => window.scrollTo(0, 0)
const scrollToBottomButton = () => window.scrollTo(0, document.body.scrollHeight)
const changeTitleOnSettings = () => title_ofThePage.innerHTML = "Settings"
const changeTitleOnSave = () => title_ofThePage.innerHTML = "Saved"
const changeTitleOnCopy = () => title_ofThePage.innerHTML = "Copied"
const changeTitleToDefault = () => title_ofThePage.innerHTML = "Code Editor(beta)"