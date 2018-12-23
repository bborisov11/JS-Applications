let notification = function () {
    let info = function showInfo(message) {
        $('#infoBox>span').text(message);
        let infoBox = $('#infoBox');
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    };
    let error = function showError(message) {
        $('#errorBox>span').text(message);
        let errorBox = $('#errorBox');
         errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    };

    return {
        info,
        error
    }
}();