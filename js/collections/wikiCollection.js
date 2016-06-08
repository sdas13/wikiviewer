//console.log('In collection');

var app = app || {};

app.wikiCollection=Backbone.Collection.extend({
    
    model:app.wikiModel
    
});


app.wikiSuggestionCollection=Backbone.Collection.extend({
    model:app.wikiSuggestionModel
});


app.wikiPreviousSearchCollection=Backbone.Collection.extend({
   
    model:app.wikiPreviousSearchModel
    
});