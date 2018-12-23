const pets = (function() {

    const getAll = function (ctx) {
        petModel.getAllPets().then(function (data) {
            ctx.pets = data;
            ctx.username = storage.getData('userInfo').username;
            ctx.loggedIn = true;
            ctx.pets = data;

            ctx.loadPartials({
                loggedInIndex: "./views/pets/allPets.hbs",
                notLoggedInIndex: "./views/index/notLoggedInIndex.hbs"
            }).then(function () {
                this.partial("./views/nav/nav.hbs");
            });
        })
    };

    const getCats = function (ctx) {
        petModel.getAllCats().then(function (data) {
            ctx.username = storage.getData('userInfo').username;
            ctx.loggedIn = true;
            ctx.pets = data;

            ctx.loadPartials({
                loggedInIndex: "./views/pets/allCats.hbs",
                notLoggedInIndex: "./views/index/notLoggedInIndex.hbs"
            }).then(function () {
                this.partial("./views/nav/nav.hbs");
            });
        })
    };

    const getDogs = function (ctx) {
        petModel.getAllDogs().then(function (data) {
            ctx.username = storage.getData('userInfo').username;
            ctx.loggedIn = true;
            ctx.pets = data;

            ctx.loadPartials({
                loggedInIndex: "./views/pets/allDogs.hbs",
                notLoggedInIndex: "./views/index/notLoggedInIndex.hbs"
            }).then(function () {
                this.partial("./views/nav/nav.hbs");
            });
        })
    };

    const getParrots = function (ctx) {
        petModel.getAllParrots().then(function (data) {
            ctx.username = storage.getData('userInfo').username;
            ctx.loggedIn = true;
            ctx.pets = data;

            ctx.loadPartials({
                loggedInIndex: "./views/pets/allParrots.hbs",
                notLoggedInIndex: "./views/index/notLoggedInIndex.hbs"
            }).then(function () {
                this.partial("./views/nav/nav.hbs");
            });
        })
    };
    const getReptiles = function (ctx) {
        petModel.getAllReptiles().then(function (data) {
            ctx.username = storage.getData('userInfo').username;
            ctx.loggedIn = true;
            ctx.pets = data;

            ctx.loadPartials({
                loggedInIndex: "./views/pets/allReptiles.hbs",
                notLoggedInIndex: "./views/index/notLoggedInIndex.hbs"
            }).then(function () {
                this.partial("./views/nav/nav.hbs");
            });
        })
    };

    const getOthers = function (ctx) {
        petModel.getAllOthers().then(function (data) {
            ctx.username = storage.getData('userInfo').username;
            ctx.loggedIn = true;
            ctx.pets = data;

            ctx.loadPartials({
                loggedInIndex: "./views/pets/allOthers.hbs",
                notLoggedInIndex: "./views/index/notLoggedInIndex.hbs"
            }).then(function () {
                this.partial("./views/nav/nav.hbs");
            });
        })
    };

    const getMyPets = function (ctx) {
        petModel.myPets().then(function(data) {
            ctx.partial("views/pets/myPets.hbs");
        })
    };

    return {
        getAll,
        getCats,
        getMyPets,
        getDogs,
        getParrots,
        getReptiles,
        getOthers
    }
}());