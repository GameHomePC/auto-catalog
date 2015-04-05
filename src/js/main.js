(function(){

    function App (){}

    App.prototype = {

        select: function(selector){

            function MyJquery(){}

            MyJquery.prototype = {
                nativeClassList: (document.createElement('div').classList) ? true : false,

                init: function(selector){
                    this.select = selector;
                    return this;
                },

                addClass: function(){



                },
                toggleClass: function(){},
                removeClass: function(){},
                hasClass: function(clazz){

                    if (this.nativeClassList){

                    } else {

                        var reg = new RegExp();

                    }

                }

            };

            return new MyJquery().init(selector);

        }

    };

    var app = new App();

    console.log(app.select(document.body));


})();