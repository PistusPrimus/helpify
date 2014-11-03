function getTrisnonno(obj){
    return $(obj).parent().parent().parent().parent();
}

// This is a functions that scrolls to #{blah}link
function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top-300},
        'slow');
}

(function ( $ ) {
 
    $.fn.helpify = function( options ) {
        
    //  if(options === "start" ) { 
        // This is the easiest way to have default options.
        var defaults = {
            // These are the defaults.
            position:"top"
        };
 
        var options = $.extend(defaults, options);  

        var countId = 0;
        //for each obj with class "help" I get the parent tag and set popover bootstrap plugin in the attributes
        this.each(function() {
            $(this).parent().attr("data-toggle","popover");
            $(this).parent().attr("data-html","true");
            $(this).parent().attr("id","contId"+countId);
            $(this).parent().attr("data-placement",options.position);
            var dataContent = '<div>'+$(this).attr("text")+'</div><div style="margin:0 auto; margin-top:7px; text-align:center;"><a id="next'+countId+'" class="btn btn-small btn-primary">Next</a></div>'
            $(this).parent().attr("data-content",dataContent);
            $(this).parent().popover({container: 'body'});
            countId = countId +1;
       });
        //I change the popover div position if needed (first popover)
        var verticalObj =  $('#contId0').position().top;
        var horizontalObj = $('#contId0').position().left + 50;
        $('#contId0').popover('show');
        $('.popover').css("top",verticalObj);
        $('.popover').css("left",horizontalObj);
        console.log($('#contId0').position());
        //display popover in sequence when "btn-next" is clicked
        $(document.body).on("click", 'a[id^="next"]', function(){
            var currAid = $(this).attr("id").substring(4);
            console.log(currAid);
            //converto il rispett
            var id = parseInt(currAid);
            id += 1;
            //I change the popover div position if needed (first popover) if obj not null (vertical problem overflow viewport fixed)
            if($('#contId'+id).val() != undefined){
                var verticalObj =  $('#contId'+id).position().top;
                var horizontalObj = $('#contId'+id).position().left + 50;
                console.log(horizontalObj);
                goToByScroll('contId'+id);
                $('#contId'+id).popover('show');
                $('.popover').css("top",verticalObj);
                $('.popover').css("left",horizontalObj);
                $('#contId'+(id-1)).popover('hide');
            }else
                $('#contId'+(id-1)).popover('hide');
        });
    //}

    };
 
}( jQuery ));