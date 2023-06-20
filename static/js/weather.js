document.getElementById('weather-form').addEventListener('submit', function(event){
    event.preventDefault();

    const location = document.getElementById('location-input').value;
    //you'd put your api key here
    const API = ''

    //this is not completed
    //does not have an image available for all conditions
    const weatherImages = {
        'Snow': 'snowy.png',
        'Partly cloudly': 'cloud.png',
        'Mist': 'mist.png',
        'Sunny': 'sunny.png',
        'Rain': 'rain.png',
    };

    document.getElementById('weather-image').src = '';

    fetch(`https://api.weatherapi.com/v1/current.json?key=${API}&q=${location}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('location-name').innerText = data.location.name;
            document.getElementById('weather-description').innerText = data.current.condition.text;
            document.getElementById('temperature').innerText = `🌡 ${data.current.temp_c}°C`;
            document.getElementById('humidity').innerText = `💧 ${data.current.humidity}%`;

            const weatherCondition = data.current.condition.text;
            const weatherImageFilename = weatherImages[weatherCondition];
            console.log(weatherImageFilename);
            if (weatherImageFilename) { // Check if the weather condition exists in the map
                document.getElementById('weather-image').src = `/static/images/${weatherImageFilename}`;
            } else {
                console.error(`No image found for weather condition: ${weatherCondition}`);
            }
        })
        .catch(() => {
            alert('Invalid Input!');
        });
});
