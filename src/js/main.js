(function($) {
    var MYAPP = MYAPP || {};

    MYAPP.toggleHeader = function(selecter) {
        var selected = $(selecter);

        selected.on('click', function(e) {
            var self = $(this),
                selfSubMenu = self.next('.sub-menu');

            if(selfSubMenu.length) {
                if(!self.hasClass('active')) {
                    selected.removeClass('active');
                    self.addClass('active');
                    selfSubMenu.slideDown(200);

                } else {
                    self.removeClass('active');
                    selfSubMenu.stop().slideUp(200);

                }
            }

            return false;
        });
    };

    $(function() {
        /* toggle header */
        MYAPP.toggleHeader('.header-reg .level-1');
    });

}(jQuery));