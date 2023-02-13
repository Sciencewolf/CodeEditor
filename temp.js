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

function changeTitleOnPlugins() { title_ofThePage.innerHTML = "Plugin's" }