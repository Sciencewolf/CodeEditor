const appendLine = (event) => {
    const div_el = document.getElementById('inputs')
    const span_el = document.getElementById('span-content')
    const textArea = document.getElementById('textarea')
    const p_counter = document.getElementById('counter')

    let count = 0
    let newp = ""

    if(event.keyCode === 13) {
        textArea.rows++
        textArea.cols = 150
        count++
        console.log("Count: ", count)

        //newh4 = document.createElement('h4')
        p_counter.innerHTML = count

        //newh4.innerHTML = count
        //div_el.appendChild(newh4)
        console.log("Log: ", p_counter.innerHTML)
    }

    if(event.keyCode === 8 && textArea.value.length < 2) {
        textArea.rows--
        count--
        console.log("Count: another", count)
        p_counter.innerHTML = count
        console.log("Log: another", p_counter.innerHTML)
        newp.innerHTML = ""

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