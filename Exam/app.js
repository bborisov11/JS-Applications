const app = Sammy('#container', function(){
    this.use('Handlebars', 'hbs');
    this.before({except: {}}, function() {
        user.initializeLogin();
    });

    this.get('#/', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get("#/myPets", pets.getMyPets);
    this.get("#/allPets", pets.getAll);
    this.get("#/allCats",pets.getCats);
    this.get("#/allDogs",pets.getDogs);
    this.get("#/allParrots",pets.getParrots);
    this.get("#/allReptiles",pets.getReptiles);
    this.get("#/allOthers",pets.getOthers);
});

$(function(){
    app.run('#/');
});