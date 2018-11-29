function attachEvents() {

    let GET_WEATHER_LOCATION = "https://judgetests.firebaseio.com/locations.json";

    $("#submit").on("click", function () {
        let code;

       $.get(GET_WEATHER_LOCATION).then(function (data) {
            let keyWord = $("#location").val();
            for (let obj of data) {
                if(obj.name === keyWord) {
                    code = obj.code;
                    break;
                }
            }
            Promise.all([
                $.get(`https://judgetests.firebaseio.com/forecast/today/${code}.json`),
                $.get(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            ]).then(function([today, upcoming]) {
                let todayCondition = today.forecast["condition"];
                let conditionSymbol;
                let current = $("#current");
                switch (todayCondition) {
                    case "Sunny":
                        conditionSymbol = `<span class="condition symbol">&#x2600;</span>`;
                        break;
                    case "Partly sunny":
                        conditionSymbol = `<span class="condition symbol">&#x26C5;</span>`;
                        break;
                    case "Overcast":
                        conditionSymbol = `<span class="condition symbol">&#x2601;</span>`;
                        break;
                    case "Rain":
                        conditionSymbol = `<span class="condition symbol">&#x2614;</span>`;
                        break;
                }

                let condition = `<span class="condition">
                                        <span class="forecast-data">${today.name}</span>
                                        <span class="forecast-data">${today.forecast["low"]}&#176;/${today.forecast["high"]}&#176;</span>
                                        <span class="forecast-data">${todayCondition}</span>
                                 </span>`;
                current.append(conditionSymbol);
                current.append(condition);

                let upcomingDiv = $("#upcoming");
                let currentUpComing;
                for (let i = 0; i < 3; i++) {
                    currentUpComing = `<span class="upcoming">
                                        ${findCondition(upcoming.forecast[i]["condition"])}
                                        <span class="forecast-data">${upcoming.forecast[i]["low"]}&#176;/${upcoming.forecast[i]["high"]}&#176;</span>
                                        <span class="forecast-data">${upcoming.forecast[i]["condition"]}</span>
                                 </span>`;
                    upcomingDiv.append(currentUpComing);
                }
                $("#forecast").css("display", "block");
            }).catch(function (err) {
                console.log(err);
            })
        })
           .catch(function (err) {
               console.log(err);
           });
    });
    function findCondition(condition) {
        let conditionSymbol;
        switch (condition) {
            case "Sunny":
                conditionSymbol = `<span class="symbol">&#x2600;</span>`;
                break;
            case "Partly sunny":
                conditionSymbol = `<span class="symbol">&#x26C5;</span>`;
                break;
            case "Overcast":
                conditionSymbol = `<span class="symbol">&#x2601;</span>`;
                break;
            case "Rain":
                conditionSymbol = `<span class="symbol">&#x2614;</span>`;
                break;
        }
        return conditionSymbol;
    }
}
