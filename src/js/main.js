(function($) {

    function createObject(method, prototype){

        method = method || {};
        prototype = prototype || {};

        var proto_common = {
            _extend: function(){
                var obj = {};
                var item;

                for (var x = 0, len = arguments.length; x < len; x+=1){
                    item = arguments[x];
                    if (this._isObject(item)){
                        for (var prop in item){
                            if (this._hasProp(item, prop)){
                                if (prop in obj) this._log('_extend() - данный метод или свойство существует ' + prop);
                                obj[prop] = item[prop];
                            }
                        }
                    }
                }

                return obj;
            },
            _log: function(message, type){
                type = type || 'log';

                if (!(type in window.console)){
                    type = 'log';
                }

                if (window.console && type in console){
                    console[type](message);
                }

                return this;
            },
            _hasProp: function(obj, prop){
                return (this._isObject(obj)) ? obj.hasOwnProperty(prop) : false;
            },
            _type: function(data){
                return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
            },
            _isObject: function(data){
                return this._type(data) === 'object';
            },
            _isArray: function(data){
                return this._type(data) === 'array';
            },
            _isNumber: function(data){
                return this._type(data) === 'number';
            },
            _isBoolean: function(data){
                return this._type(data) === 'boolean';
            },
            _setOptions: function(){
                if (!this.options || !this._isObject(this.options)) this.options = {};

                var item;

                for (var x = 0, len = arguments.length; x < len; x+=1){
                    item = arguments[x];
                    if (this._isObject(item)){
                        for (var prop in item){
                            if (this._hasProp(item, prop)){
                                var value = item[prop];
                                this._setOption(prop, value);
                            }
                        }
                    }
                }

                return this;
            },
            _setOption: function(key, value){
                if (!this.options || !this._isObject(this.options)) this.options = {};

                this.options[key] = value;
                return this.options[key];
            },
            _getOption: function(key){
                if (!this.options || !this._isObject(this.options)) this.options = {};

                return this.options[key];
            }
        };

        prototype = proto_common._extend(proto_common, prototype);

        function MyObject(){}
        MyObject.prototype = prototype;

        return new MyObject(method);

    }

    var av = createObject({}, {

        message: createObject({}, {

            create: function(message){

                message = message || '';

                var msgObject = createObject();

                msgObject._setOptions({
                    message: message,
                    hide: 8000,
                    fade: 500
                });

                return msgObject;

            }

        })

    });

    var msg = av.message.create();

    console.log(msg);




    /* ----------------------- */

    var MYAPP = MYAPP || {};

    MYAPP.Header = function() {};

    MYAPP.Header.toggleHeader = function(selecter) {
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
        MYAPP.Header.toggleHeader('.header-reg .level-1');
    });

}(jQuery));