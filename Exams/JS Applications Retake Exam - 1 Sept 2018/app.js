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
    this.get("#/details", user.getDetails);
    this.get("#/create", meme.getCreate);
    this.post("#/create", meme.postCreate);

});

$(function(){
    app.run('#/');
});