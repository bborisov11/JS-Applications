$(() => {
    const app = Sammy('#main', function () {
        this.use("Handlebars", "hbs");

        this.get("/index.html", displayHome);
        this.get("#/home", displayHome);
        this.get("#/about", displayAbout);
        this.get("#/login", displayLogin);
        this.post("#/login",postLoginUser);
        this.get("#/register", displayRegisterUser);
        this.post("#/register", postRegisteredUser);
        this.get("#/logout", logout);
        this.get("#/catalog", showCatalog);
        this.get("#/create", createTeamView);
        this.post("#/create",createNewTeam);
        this.get("#/catalog",details);

        function displayHome(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            context.teamId = sessionStorage.getItem("teamId") !== "undefined"
                && sessionStorage.getItem("teamId") !== null;

            context.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/home/home.hbs");
            });
        }

        function displayAbout(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");

            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/about/about.hbs");
            });
        }

        function displayLogin(context) {

            this.loadPartials({
                header: "./templates/common/header.hbs",
                loginForm: "./templates/login/loginForm.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/login/loginPage.hbs");
            })
        }

        function displayRegisterUser(context) {
            this.loadPartials({
                header: "./templates/common/header.hbs",
                registerForm: "./templates/register/registerForm.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/register/registerPage.hbs");
            })
        }

        function postRegisteredUser(context) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPassword = this.params.repeatPassword;

            if(password !== repeatPassword) {
                auth.showError("RepeatPassword must be the same");
            } else {
                auth.register(username,password,repeatPassword)
                    .then(function (response) {
                        auth.saveSession(response);
                        auth.showInfo("You were registered successfully");
                        displayHome(context);
                    }).catch(auth.handleError)
            }
        }

        function postLoginUser(context) {
           let username = context.params.username;
           let password = context.params.password;

           auth.login(username, password)
               .then(function (response) {
                   auth.saveSession(response);
                   auth.showInfo("You logged In successfully");
                   displayHome(context);
               })
               .catch(function () {
                   auth.handleError("Wrong username or password");
               })
        }

        function logout(context) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Successfully logged out");
                    displayHome(context);
                })
        }

        function showCatalog(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            context.teamId = sessionStorage.getItem("teamId") !== "undefined"
                && sessionStorage.getItem("teamId") !== null;
            context.hasNoTeam = sessionStorage.getItem("teamId") !== null;

            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                team: "./templates/catalog/team.hbs"
            }).then(function () {
                teamsService.loadTeams()
                    .then((response) => {
                        context.teams = response;
                        this.partial("./templates/catalog/teamCatalog.hbs");
                    })
                    .catch(auth.handleError);
            })
        }

        function createTeamView(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            context.teamId = sessionStorage.getItem("teamId") !== "undefined"
                && sessionStorage.getItem("teamId") !== null;

            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                createForm: "./templates/create/createForm.hbs"
            }).then(function () {
                this.partial("./templates/create/createPage.hbs");
            })
        }

        function createNewTeam(context) {
            let name = context.params.name;
            let comment = context.params.comment;

            teamsService.createTeam(name, comment)
                .then(function (response) {
                auth.showInfo("Team created successfully");
                displayHome(context);
            })
        }

        function details(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
            context.username = sessionStorage.getItem("username");
            context.teamId = sessionStorage.getItem("teamId") !== "undefined"
                && sessionStorage.getItem("teamId") !== null;
            context._id  = sessionStorage.getItem("userId");

            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                teamControls: "./templates/catalog/teamControls.hbs",
                teamMember: "./templates/catalog/teamMember.hbs"
            }).then(function () {
                this.partial("./templates/catalog/details.hbs");
            })
        }
});
app.run();
});