(function ($){
    $.fn.thelazyimage = function(options){
        var settings = $.extend({
            accessKey : 'SNeTGVotJGrywvPReIaR',
            lazyCDN : 'http://lzimg.com',
            transform: 'icon',
            lazy: false,
            responsive: false,
            responsiveTransformations: [{
                    transform: 'icon',
                    minWidth: 0
                }, {
                    transform: 'small',
                    minWidth: 768
                }, {
                    transform: 'medium',
                    minWidth: 992
                }, {
                    transform: 'large',
                    minWidth: 1200
            }],
            placeholder : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
        }, options),
            lazyUrl = function(oUrl,type){
                return settings.lazyCDN + 
                        '/' +
                        settings.accessKey +
                        '/' +
                        type +
                        '/' +
                        oUrl.split(/https?:\/\//,2).pop();
                },
            isScrolledIntoView = function (elem){
                    var docViewTop = $(window).scrollTop();
                    var docViewBottom = docViewTop + $(window).height();
                    var elemTop = $(elem).offset().top;
                    var elemBottom = elemTop + $(elem).height();
                    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
                },
            getResponsiveTransformation = function(sizes) {
                    var cWidth = getWidth(),
                        returnVal = false;
                    for (var i = sizes.length-1; i >= 0; i--) {
                        console.log(sizes[i])
                        if (parseInt(cWidth) >= parseInt(sizes[i].minWidth)) {
                            return sizes[i].transform;
                        }
                    }
                },
            getHeight = function() {
                return window.innerHeight;
                },
            getWidth = function() {
                return window.innerWidth;
                };   
        return this.filter("img").each(function(){
            // console.log(this);
            var cImg = $(this),
                oImgUrl = cImg.attr('data-lazy-src'),
                setSourceOnLoad = true,
                defaultTran = (cImg.attr('data-lazy-transform') ? cImg.attr('data-lazy-transform') : settings.transform),
                isLazy = (cImg.attr('data-lazy-load') == ('true'||'TRUE') || settings.lazy),
                isResponsive = (settings.responsive || cImg.attr('data-lazy-responsive'));

            if(!oImgUrl){
                console.log('Image missing "data-lazy-src"');
                return false;
            }
            
            if(isLazy){
                setSourceOnLoad = false;
                cImg.attr('src',settings.placeHolder);
                $( window ).on("scroll.lazyImage", function(){
                    setTimeout(function(){
                        console.log('scrolling');
                        setSource();
                    });
                });
            }
            
            var setSource = function(){
                if((isLazy && isScrolledIntoView(cImg)) || !isLazy){
                    $( window ).off("scroll.lazyImage");
                    cImg.attr('src',lazyUrl(oImgUrl,setTransition()));
                }
            };

            var setTransition = function(){
                if(!isResponsive) return defaultTran;
                // console.log('is resp')
                return getResponsiveTransformation(settings.responsiveTransformations);
            };
            

            setSource();
        });
    };
})(jQuery);
