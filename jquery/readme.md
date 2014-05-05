#Instructions

**You will need an account at TheLazyImage.com**

```
<script>
  $(document).ready(function() {
    $("img").thelazyimage({
      // Options
      accessKey:'SNeTGVotJGrywvPReIaR'
    });
  });    
</script>

<img 
    data-lazy-src="http://plakeside.com/tiger.jpg" 
    data-lazy-transform="icon"
    >
```

IMG tags will set SRC, DIV tags (and everything else) will set css background-image

##Options Are

* accessKey : **required** Your Access Key
* lazy: true/**false** wait until the image scrolls into view before loading.
* responsive : true/**false** if true then 'data-lazy-transform' attribute is ignored and it will use the responsiveTranformations value in settings to determine the transformation
* responsiveTransformations : [{transform:'nameOfTransformation',minWidth:XX}] is an array of key/values that represet the breakpoints and the tranformation name to use.

##Attributes Are
