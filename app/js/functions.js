// функция смены иконки меню на 'close'
function changeIconMenu (icon, obj) {
    var $icon = $(icon);
    if ($icon.hasClass(obj)) {
        $icon.removeClass(obj);
        $icon.addClass('fa-times');
    } else {
        $icon.removeClass('fa-times');
        $icon.addClass(obj);
    }
}
