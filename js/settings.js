const themes = {
    Black        : "#000" ,
    Dark         : '#414A4C' ,
    Melon        : "#EBB3A9" ,
    Tea_Green     : "#D1F0B1" ,
    Blue_Sapphire : "#086788" ,
    Ming         : "#407076" ,
    Jet          : "#39393A" ,
    Floral_White  : "#FFFCF2"
}

const listDefaultFileExt = [
    ".txt", ".html", ".css", ".js", ".ts",
    ".cs", ".py", ".cpp", ".java", ".go",
    ".pozpp"
]

const changeThemeToChosenColor = () => {
    const option_for_theme = document.getElementById('select-theme')

    const get_body = document.querySelector('body')
    const get_h1_tag = document.querySelector('#header > h1')
    const get_h3_tag = document.querySelector('body > h3')
    const get_h4_tag = document.querySelector('body > h4')

    let text = option_for_theme.options[option_for_theme.selectedIndex].text
    if(text.indexOf(" ") > -1) {
        text = text.replace(" ", "_")
    }

    get_body.style.backgroundColor = themes[text]
    get_h1_tag.style.color = themes["Black"]
    get_h3_tag.style.color = themes["Black"]
    get_h4_tag.style.color = themes["Black"]
}

const itemsInSettings = () => {
    const get_settings_style = document.querySelector('.settings')
    const span_buttons = document.querySelector('#span-buttons')
    const select_default_fileExt = document.getElementById('select-default-file-ext')

    const ok_button = document.createElement('button')
    const cancel_button = document.createElement('button')
    const apply_button = document.createElement('button')

    ok_button.id = "ok-btn"
    ok_button.className = 'ok-btn'
    ok_button.type = 'button'
    ok_button.innerHTML = "OK"

    cancel_button.id = 'cancel-btn'
    cancel_button.className = 'cancel-btn'
    cancel_button.type = 'button'
    cancel_button.innerHTML = 'Cancel'

    apply_button.id = "apply-btn"
    apply_button.className = "apply-btn"
    apply_button.type = "button"
    apply_button.innerHTML = "Apply"

    for(let opt = 0; opt < listDefaultFileExt.length; opt++){
        const option = document.createElement('option')
        option.innerHTML = listDefaultFileExt[opt]
        select_default_fileExt.appendChild(option)
    }

    span_buttons.appendChild(ok_button)
    span_buttons.appendChild(cancel_button)
    span_buttons.appendChild(apply_button)

    ok_button.addEventListener('click', () => {
        try {
            actionsInSettings()
        }catch (err) {
            error("Error", err)
        }

        get_settings_style.style.display = 'none'
        changeTitleToDefault()
    })

    cancel_button.addEventListener('click', () => {
        get_settings_style.style.display = 'none'
        changeTitleToDefault()
    })

    apply_button.addEventListener('click', () => {
        actionsInSettings()
    })
}

const actionsInSettings = () => {
    const first_line_number = document.getElementById('counter')
    const last_line_numbers = document.querySelectorAll('#counter-line')
    const html = document.querySelector('html')
    const scroll_to_btn = document.getElementById('scroll')
    const select_default_fileExt = document.getElementById('select-default-file-ext')

    const checkbox_show_line_numbers = document.getElementById('checkbox-show-line-numbers')
    const checkbox_enable_smooth_scrolling = document.getElementById('checkbox-enable-smooth-scrolling')
    const checkbox_hide_to_buttons = document.getElementById('checkbox-hide-to-buttons')

    // Smooth scrolling option
    if(!checkbox_enable_smooth_scrolling.checked){
        html.style.scrollBehavior = "unset"
    }
    else {
        html.style.scrollBehavior = "smooth"
    }

    // Line numbers on/off
    if(!checkbox_show_line_numbers.checked) {
        last_line_numbers.forEach(item => {
            item.style.display = 'none'
        })
        first_line_number.style.display = 'none'
    }
    else {
        last_line_numbers.forEach(item => {
            item.style.display = 'block'
        })
        first_line_number.style.display = 'block'
    }

    // Select Theme
    changeThemeToChosenColor()

    // Hide to top/bottom buttons
    if(checkbox_hide_to_buttons.enabled) {
        scroll_to_btn.style.display = 'flex'
    }
    else {
        scroll_to_btn.style.display = 'none'
    }

    // Set Default file extension
    global_get_default_file_ext = select_default_fileExt.options[select_default_fileExt.selectedIndex].text

}