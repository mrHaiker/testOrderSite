$(function () {
    var $iconMenu =  $('#list-menu i');
    var $iconContact =  $('#list-contact i');
    var $contact = $('#btn-contact');
    var $nav = $('#nav');

    // Click on mobile menu btn
    $('#list-menu').click(function () {

        $iconMenu.toggleClass('close-btn');
        changeIconMenu($iconMenu, 'fa-bars');

        if ($contact.hasClass('open-list-user')) {    // уделение открытого меню
            $contact.removeClass('open-list-user');
            $iconContact.removeClass('close-btn');
            changeIconMenu('#list-contact i', 'fa-user');
        }

        $('#nav').toggleClass('open-list-menu');    // открывает меню
    });

    // Click on mobile contact btn
    $('#list-contact').click(function () {

        $iconContact.toggleClass('close-btn');
        changeIconMenu($iconContact, 'fa-user');

        if ($nav.hasClass('open-list-menu')) {    // уделение открытого меню
            $nav.removeClass('open-list-menu');
            $iconMenu.removeClass('close-btn');
            changeIconMenu('#list-menu i', 'fa-bars');
        }

        $('#btn-contact').toggleClass('open-list-user');   // открывает меню
    });

});