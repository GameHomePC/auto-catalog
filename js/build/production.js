function CreateObject(method, prototype){

    function NewObject(config){
        config = config || {};

        for (var prop in config){
            if (config.hasOwnProperty(prop)){
                this[prop] = config[prop];
            }
        }

    }

    NewObject.prototype = prototype;

    return new NewObject(method);

}

$(function(){

    var form = $('#filter-form');
    if (form.length){

        var filter = CreateObject({
            data: {}
        },{
            formDisabled: function(){
                var div = [];

                div.push('<div class="disabled-filter-ajax"></div>');

                var disabledElement = this.setData('disabledElement', $(div.join('')));

                this.getData('form').append(disabledElement);

                return this;
            },
            formEnabled: function(){
                var disabledElement = this.getData('disabledElement');

                if (disabledElement.length){
                    disabledElement.remove();
                }
            },
            listenerFormEnable: function(){
                var thix = this;
                var form = thix.getData('form');
                if (form.length){



                    var send;
                    var changeHandler = function(e){
                        if (send) clearTimeout(send);

                        send = setTimeout(function(){



                            form.ajaxSubmit({
                                dataType: 'json',
                                beforeSend: function(){
                                    thix.formDisabled();
                                },
                                complete: function(response){
                                    thix.formEnabled();
                                }
                            });

                        }, 500);

                    };

                    form.on('change', 'select', changeHandler);
                    form.on('change', 'radio', changeHandler);
                    form.on('change', 'input', changeHandler);
                    form.on('change', 'checkbox', changeHandler);

                }

                return this;
            },
            getData: function(key){
                return this.data[key];
            },
            setData: function(key, value){
                this.data[key] = value;
                return this.data[key];
            }
        });

        filter.setData('form', form);
        filter.listenerFormEnable();

    }



});