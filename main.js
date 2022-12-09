const appendLine = (event) => {
    const div_el = document.getElementById('inputs')
    const textArea = document.getElementById('textarea')
    const h4_counter = document.getElementById('counter')
    let count = 0
    let newh4 = ""

    if(event.keyCode === 13) {
        textArea.rows++
        count++
        console.log("Count: ", count)

        //newh4 = document.createElement('h4')
        h4_counter.innerHTML = count

        //newh4.innerHTML = count
        //div_el.appendChild(newh4)
        console.log("Log: ", h4_counter.innerHTML)
    }

    if(event.keyCode === 8 && textArea.value.length === 0) {
        textArea.rows--
        count--
        console.log("Count: another", count)
        h4_counter.innerHTML = count
        console.log("Log: another", h4_counter.innerHTML)
        newh4.innerHTML = ""

    }


}


const changeColor = () => {
    let KEYWORDS = {
        "chislo": "red",
        "holovna": "red",
        "kity": "red",
        "kity_net": "red",
        "ajbo": "red",
        "nekaj": "red",
        "vhod": "red",
    };

    const div_el = document.getElementById('inputs')
    const textArea = document.getElementById('textarea')

    if (textArea.value in KEYWORDS) {
        textArea.style.color = "red"
        console.log(KEYWORDS[textArea.value])
    }
    else textArea.style.color = "black"
}