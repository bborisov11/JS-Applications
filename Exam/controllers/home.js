 const home = (function(){
    const index = function(ctx) {
        if(userModel.isAuthorized()) {

            petModel.getAllPets().then(function (data) {
                ctx.username = storage.getData('userInfo').username;
                ctx.loggedIn = true;
                ctx.pets = data;

                ctx.loadPartials({
                    loggedInIndex: "./views/index/loggedInIndex.hbs",
                    notLoggedInIndex: "./views/index/notLoggedInIndex.hbs"
                }).then(function () {
                    this.partial("./views/nav/nav.hbs");
                })
            });

        } else {
            ctx.loggedIn = false;
            ctx.loadPartials({
                loggedInIndex: "./views/index/loggedInIndex.hbs",
                notLoggedInIndex: "./views/index/notLoggedInIndex.hbs"
            }).then(function () {
                this.partial("./views/nav/nav.hbs");
            })
        }
    };

    return {
        index
    };
}());