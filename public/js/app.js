fetch('http://localhost:3000/weather?address=boston')
    .then(res => {
        res.json().then(data => {
            if (data.err) {
                console.log(data.err)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })