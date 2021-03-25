const weatherForm = document.querySelector('form')
const userInput = document.querySelector('input')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = userInput.value

    message1.textContent = ''
    message2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res => {
            res.json().then(data => {
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.location
                    message2.textContent = data.forecast
                }
            })
        })
})



