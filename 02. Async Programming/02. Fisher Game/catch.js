function attachEvents() {
    const appKey = "kid_HJ_fBA9RQ";
    const username = "guest";
    const password = "1234";

    const BASE_URL = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches`;
    const autHeaders = "Basic " + btoa(username + ":" + password);
    $(".load").on("click",function () {
        $.ajax({
            method: "GET",
            url: BASE_URL,
            headers:  {
                "Authorization" : autHeaders
            }
        }).then(function (data) {
            let catchDiv = $("#catches");
            catchDiv.empty();
            for (let obj of data) {
                let currentCatch = `<div class="catch" data-id="${obj._id}">
            <label>Angler</label>
            <input type="text" class="angler" value="${obj.angler}"/>
            <label>Weight</label>
            <input type="number" class="weight" value="${obj.weight}"/>
            <label>Species</label>
            <input type="text" class="species" value="${obj.species}"/>
            <label>Location</label>
            <input type="text" class="location" value="${obj.location}"/>
            <label>Bait</label>
            <input type="text" class="bait" value="${obj.bait}"/>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${obj.captureTime}"/>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        </div>`;

                catchDiv.append(currentCatch);
                   // console.log();
                $($(currentCatch).html()).find(".update").on("click", updateButton());
            }
        })
    });

    $(".add").on("click", function () {
        let data = {
            angler: $("#addForm .angler").val(),
            weight: $("#addForm .weight").val(),
            species: $("#addForm .species").val(),
            location: $("#addForm .location").val(),
            bait: $("#addForm .bait").val(),
            captureTime: $("#addForm .captureTime").val()
        };
        $.ajax({
            method: "POST",
            url: BASE_URL,
            data: data,
            headers:  {
                "Authorization" : autHeaders
            }
        }).then(function () {
            console.log("successfully added!")
        }).catch(function (err) {
            console.log(err);
        })
    });

        function updateButton() {
            let id = $(".update").closest("div").attr('data-id');
            const UPDATE_URL = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches/${id}`;

            let data = {
                angler: $(`#${id} .angler`).val(),
                weight: $(`#${id} .weight`).val(),
                species: $(`#${id} .species`).val(),
                location: $(`#${id} .location`).val(),
                bait: $(`#${id} .bait`).val(),
                captureTime: $(`#${id} .captureTime`).val(),
            };

            $.ajax({
                method: "PUT",
                url: UPDATE_URL,
                data: data,
                headers: {
                    "Authorization": autHeaders
                }
            }).then(() => console.log("successfully updated!"));
        }

    let deleteButton = $(".delete");

    deleteButton.on("click", function () {
        let id = deleteButton.closest("div").attr('data-id');
        const DELETE_URL = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches/${id}`;

        $.ajax({
            method: "DELETE",
            url: DELETE_URL,
            headers:  {
                "Authorization" : autHeaders
            }
        }).then(function () {
            $(`#${id}`).remove();
            console.log("Successfully deleted catch!");
        });
    })

}