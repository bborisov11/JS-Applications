const petModel = (function () {
    const petsUrl = `appdata/${storage.appKey}/pets?query={}&sort={"likes": -1}`;

    const getAllPets = function () {
        return requester.get(petsUrl);
    };
    const getAllCats = function () {
        const catUrl = `appdata/${storage.appKey}/pets?query={"category":"Cat"}`;
        return requester.get(catUrl);
    };

    const myPets = function () {
        const myPetsUrl = `appdata/app_id/pets?query={"_acl.creator":"${storage.getData('userInfo').id}"}`;
        return requester.get(myPetsUrl);
    };

    const getAllDogs = function () {
        const catUrl = `appdata/${storage.appKey}/pets?query={"category":"Dog"}`;
        return requester.get(catUrl);
    };

    const getAllParrots = function () {
        const catUrl = `appdata/${storage.appKey}/pets?query={"category":"Parrot"}`;
        return requester.get(catUrl);
    };

    const getAllReptiles = function () {
        const catUrl = `appdata/${storage.appKey}/pets?query={"category":"Reptile"}`;
        return requester.get(catUrl);
    };

    const getAllOthers = function () {
        const catUrl = `appdata/${storage.appKey}/pets?query={"category":"Other"}`;
        return requester.get(catUrl);
    };
    return {
        getAllPets,
        getAllCats,
        myPets,
        getAllDogs,
        getAllParrots,
        getAllReptiles,
        getAllOthers
    }
})();