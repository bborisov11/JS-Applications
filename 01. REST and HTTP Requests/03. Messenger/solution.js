function attachEvents() {
    let BASE_PATH = "https://busstop-8fa52.firebaseio.com/messenger.json";

    $("#submit").on("click", function () {
        let author = $("#author");
        let content = $("#content");

        if (author.val() !== "" && content.val() !== "") {
            let currentObj = {
                author: author.val(),
                content: content.val(),
                timestamp: Date.now()
            };
            $.ajax({
                method: "POST",
                url: BASE_PATH,
                data: JSON.stringify(currentObj)
            }).then(function () {
               // $("#messages").text($("#messages").text() + `${currentObj.author}: ${currentObj.content}\n`);
                // console.log("Added Successfully!")
            }).catch(function (err) {
                console.log(err);
            });
            author.val('');
            content.val('')
        }
    });
    $("#refresh").on("click", function () {
        $("#messages").empty();
        $.ajax({
            method: "GET",
            url: BASE_PATH,
        }).then(function (content) {
            let keys = Object.keys(content).sort((a, b) => content[a].timestamp - content[b].timestamp);
            for (let key of keys) {
                $("#messages").append(`${content[key].author}: ${content[key].content}\n`);
            }
        }).catch(function (error) {
            console.log(error);
        });

    });
}

