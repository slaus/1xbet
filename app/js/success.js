$(document).ready(function () {
    let baseUrl = 'https://api.1xbet-bot.com'
    //let baseUrl = 'http://localhost:5000'


    let productId = getUrlParameter("productId")
    let orderId = getUrlParameter("order_id")
    let pincode = getUrlParameter("pincode")

    let email = getUrlParameter("customer_email")
    let customerPhone = getUrlParameter("customer_phone")
    let customerName = getUrlParameter("customer_name")

    let signature = getUrlParameter("signature")
    let clientWindowsUrl = ''
    let clientMacOsUrl = ''
    toastr.options = {
        positionClass: "toast-bottom-full-width",
    }

    $('.w-download-btn').click(function () {
        window.open(clientWindowsUrl)
    })

    $('.m-download-btn').click(function () {
        window.open(clientMacOsUrl)
    })

    sendPaymentStat({
        email,
        productId,
        orderId,
        customerName,
        customerPhone,
        pincode,
        signature
    });

    function sendPaymentStat(objToSave) {
        $.ajax({
            url: `${baseUrl}/v1/glopart`,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(objToSave),
            success: function (data) {
                $('.error').hide()

                if(data.secondPaymentSuccess && data.secondPaymentSuccess === true) {
                    $('.second-time-success').show();
                }
                else{
                    clientWindowsUrl = data.windowsUrl
                    clientMacOsUrl = data.macUrl
                    $('#c-password').html(data.password)
                    $('#c-login').html(data.email)
                    $('.first-step').show();
                    $('.first-time-success').show()
                }
            },
            error: function (er) {
                $('.error-content').show();
                if(er.responseJSON && er.responseJSON.message) {
                    toastr.error(er.responseJSON.message).css('text-align', 'center')
                }
            }
        });
    }

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
})