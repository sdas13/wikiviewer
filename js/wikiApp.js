  
$(document).ready(function(){
    
    var rs=[];  
 
    
//-----Shows Recent searches when clicked on the text Box----

$('#txt').click(function(){
  
        $('.rs').empty(); 
        $('.rs').width($('.form').width()*0.98);
  
    if(rs.length!=0){
      
      var wikiPreviousSearchCollection=new app.wikiPreviousSearchCollection();
      
     for(var i in rs){ 
        
      var wikiPreviousSearchModel=new app.wikiModel({
      search:rs[i]    
      });
      
      wikiPreviousSearchCollection.add(wikiPreviousSearchModel);
      
  }
      
      //console.log(wikiPreviousSearchCollection.toJSON());
        
      var wikiSearch=new app.allleWikiSearchView({ collection:wikiPreviousSearchCollection });
      $('.rs').html(wikiSearch.render().el);
      
      $('.rs').toggle(); 
  }
  
      $('.rspb').click(function(){
      $('#txt').val(this.innerHTML);
      $('.rs').hide(); 

});
   
      $('.rspb').mouseenter(function(){
      $('#txt').val(this.innerText);
   });
  

});  

    

//----Autosuggestion while typing----
    
$('#txt').keyup(function(e){
  
    
 if(e.keyCode!==13){
      $('.pl').width($('.form').width()*0.95);
      $('.rs').hide(); 
      $('.pl').hide(); 
      $('.pl').empty(); 
      var url='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+$('#txt').val()+'&callback=JSON_CALLBACK'; 
      $('.pl').hide();    
      $('.pl').empty();
        
    
       $.ajax({url:url,jsonp: "callback", dataType: "jsonp", success: function( response ) {
       $('.pl').hide(); 
       $('.pl').empty();

       if(response.query!==undefined){ 
        var temp=response.query.pages; 

        var wikiSuggestionCollection=new app.wikiSuggestionCollection();

        for(var i in temp){     

        var wikiSuggestionModel=new app.wikiSuggestionModel({
            title:temp[i].title.toLowerCase()
        })

        wikiSuggestionCollection.add(wikiSuggestionModel);

        }

        var wikiSuggestionView=new app.allWikiSuggestionView({collection:wikiSuggestionCollection});
        $('.pl').html(wikiSuggestionView.render().el);   

        $('.pl').show(); 
       }
       

         $('.pb').click(function(){
         $('#txt').val(this.innerHTML);
         $('.pl').hide(); 
         $('.pl').empty(); 

});
   
          $('.pb').mouseenter(function(){
          $('#txt').val(this.innerHTML);
});
    
           $('.container-fluid').click(function(){
           $('.pl').hide(); 
           $('.pl').empty(); 
});
    
   
}});

 };
}); 
 
//------Starting the search----
    
    var executeSearch=function(){
  
    if($('#txt').val()=="")
      alert("Type something in the box");
    else
      {
 
     if(rs.indexOf($('#txt').val())===-1)
        rs.unshift($('#txt').val());
      
        if(rs.length>10)
          rs.pop();    

       $('.grid').fadeOut('fast'); 
       $('.grid').empty();

        var url='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+$('#txt').val()+'&callback=JSON_CALLBACK'; 
        
          $.ajax({url:url,jsonp: "callback", dataType: "jsonp", success: function( response ) {

          var temp=response.query.pages;

           var wikiCollection=new app.wikiCollection();
               
          for(var i in temp){

            
            var wikiModel=new app.wikiModel({
               pageid:temp[i].pageid, 
               title:temp[i].title,
               extract:temp[i].extract
            });  
             
            wikiCollection.add(wikiModel);  
          };
        
        var allWikiView=new app.allWikiView({collection:wikiCollection});      
        $('.grid').append(allWikiView.render().el);      
              
        }});
        
        
        $('h4').hide('fast');
        
        $('.form').animate({'padding-top':'10%','width':'80%'},function(){
        $('.grid').show('fast');   
        $('#txt').val('');
        });
        
         
      }
    };
    
    
  $('button').click(function(e){
      executeSearch();
      e.preventDefault();
  });
  
    
});