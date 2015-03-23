function AjaxMessage(){}

AjaxMessage.prototype = {
    data: [],
    add: function(message, type){

        function Message(options){
            for (var prop in options){
                if (options.hasOwnProperty(prop)){
                    this[prop] = options[prop];
                }
            }
        }

        Message.prototype = {
            wrap: $('#message'),
            tpl: function(){
                var output = [];
                var rand = Math.ceil(Math.random() * 10000);
                var id = this.id = 'message-' + rand + '-' + this.time;

                output.push('<div id="'+ id +'" class="message-wrap '+ this.type +'">');
                output.push('<i data-popup="#'+ id +'" class="message-close"></i>');
                output.push('<p>'+ this.message +'</p>');
                output.push('</div>');

                return output.join('');
            },
            listener: function(){
                var id = this.id;
                this.wrap.on('click', '.message-close', function(e){
                    e.preventDefault();

                    var self = $(this);
                    var close_id = self.attr('data-popup');
                    var popup = $(close_id);
                    if (popup.length){
                        popup.remove();
                    }
                });
            },
            show: function(timeout, fadeOut){
                var wrap = this.wrap;

                if (wrap.length){
                    var tpl = this.wrap.append(this.tpl());
                    var id = tpl.find('#' + this.id);

                    this.listener();

                    if (tpl.length && id.length){
                        setTimeout(function(){
                            if (id.length){
                                id.fadeOut(fadeOut || 1000, function(){
                                    $(this).remove();
                                });
                            }
                        }, timeout || 5000);
                    }
                }

                return this;
            }
        };

        var dataIndex = this.data.length;
        var time = new Date().getTime();

        var msg = new Message({
            index: dataIndex,
            time: time,
            message: message,
            type: type
        });

        this.data.push(msg);

        return msg;
    },
    success: function(message){
        return this.add(message, 'success');
    },
    error: function(message){
        return this.add(message, 'error');
    },
    info: function(message){
        return this.add(message, 'info');
    }
};

var ajaxMessage = new AjaxMessage();

$(function(){

    var login_header = $('#login-header');
    if (login_header.length){
        login_header.on('submit', '#login-form', function(e){
            e.preventDefault();

            var self = $(this);
            if (self.length){

                self.ajaxSubmit({
                    success: function(response){
                        var data = $(response).find(login_header.selector);
                        var error = data.find('.error-reg');
                        var html = data.html();

                        login_header.html(html);

                        if (error.length){
                            var errors = error.find('span.error');
                            if (errors.length){
                                errors.each(function(i){
                                    var self = $(this);
                                    var errorMessage = self.text();

                                    ajaxMessage.error(errorMessage).show(8000, 500);
                                });
                            }
                        }
                    }
                });

            }

        });
    }



});