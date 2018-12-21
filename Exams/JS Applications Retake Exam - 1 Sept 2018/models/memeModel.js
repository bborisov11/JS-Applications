let memeModel = (function () {
    let memeUrl = `appdata/${storage.appKey}/memes?query={}&sort={"_id":-1}`;

        const getMemes = function () {
       return requester.get(memeUrl);
    };
        const getAllforGivenUser = function() {
            let currentUrl = `appdata/${storage.appKey}/memes?query={"creator":"${storage.getData('userInfo').username}"}&sort={"_id":-1}`;

            return requester.get(currentUrl);
        };

        const create = function (creator, title, description, imageUrl) {
            let memeUrl = `appdata/${storage.appKey}/memes`;
            let data = {
                 creator,
                 title,
                 description,
                 imageUrl
            };
            let authString = btoa(`${storage.appKey}:${storage.appSecret}`);
            let headers = { Authorization: 'Basic ' + authString};

            return requester.post(memeUrl, data, headers);
        };

    return {
        getAllforGivenUser,
        getMemes,
        create
    }
})();