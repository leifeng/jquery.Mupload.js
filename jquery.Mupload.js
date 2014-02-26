/**
 * Created by zcl on 14-2-25.
 */
;
(function ($) {
    $.fn.Mupload = function(options) {
        var defaults = {
                max: 4,
                width: 400
            },
            $my = $(this),
            num = 0,
            temp = new Array(),
            inputVal = 0,
            baseHtml = function(n) {
                var name = 'Mupload' + n;
                return '<div class="Mstyle" style="width:' + options.width + 'px"><A href="javascript:;" class="delMupload" style="color: red" data="' + n + '">X</A><input type="file" style="margin-left: 10px" class="Mupload" name="' + name + '" id="'+name+'" /><span style="color: green;font-size: 15px;"></span></div>';
            },
            setVal = function(e) {
                inputVal = temp.join(',').replace(/-1,/g, '').replace(/-1/g, '');
                e.find('.Muploads').val(inputVal);
            };
        options = $.extend(defaults, options),
            $my.html('<a href="javascript:;" class="addMupload">+添加图片</a><input type="hidden" class="Muploads" name="Muploads">');
        $my.on('click', 'a.delMupload', function() {
            var n = $(this).attr('data') - 0;
            $(this).parent().remove();
            temp[n] = -1;
            if (temp.length == 0) {
                num = 0;
            }
            setVal($my);
        });

        $my.on('click', 'a.addMupload', function() {
            if (temp.length != 0) {
                inputVal = temp.join(',').replace(/-1,/g, '').replace(/-1/g, '');
                var lens = inputVal.split(',').length;
            } else {
                lens = 0;
            }
            if (lens >= options.max) {
                alert('max is ' + options.max);
            } else {
                temp.push(num);
                $my.prepend(baseHtml(num));
                num = num + 1;
                setVal($my);
            }

        });
        $my.on('change', 'input.Mupload', function() {
            $(this).next().text('ok');
        });
    };
})(jQuery)