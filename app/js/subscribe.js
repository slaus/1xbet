$(document).ready(function () {
    let baseUrl = 'https://api.1xbet-bot.com'


    toastr.options = {
        positionClass: "toast-bottom-full-width",
    }

    $('#subscribe').submit(function (event) {
        event.preventDefault();
        var email = $('#email').val();
        if (!(email.length > 0 && (email.match(/.+?\@.+/g) || []).length !== 1)){
            $.ajax({
                url: `${baseUrl}/v1/clients/preorder?email=` + encodeURIComponent(email),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                success: function () {
                    toastr.success("Спасибо. Мы напишем вам").css('text-align', 'center')
                    setTimeout(function () {
                        location.href = '/';
                    }, 2500);
                },
                error: function (er) {
                    if (er.responseJSON && er.responseJSON.message) {
                        toastr.error(er.responseJSON.message).css('text-align', 'center')
                    }
                }
            });
        }else{
            toastr.error("Введите корректный Email").css('text-align', 'center')
        }
    })
})