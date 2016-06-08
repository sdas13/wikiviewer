//console.log('In View');
var app = app || {};

app.singleWikiView=Backbone.View.extend({

    //tagName:'div',
    //className:'col-lg-2 col-md-3 col-sm-4',
    
    template:_.template($('#wikiGrid').html()),
    
    
    render:function(){
    
    this.$el.html(this.template(this.model.toJSON()));
        return this;
    
}
    
});


app.singleWikiSuggestionView=Backbone.View.extend({
   
    className:'panel-body pb',
    
    template:_.template($('#wikiSuggestion').html()),
    
    render:function(){
        
     this.$el.html(this.template(this.model.toJSON()));
        return this;
        
    }
    
});


app.singleWikiSearchView=Backbone.View.extend({
   
    className:'panel-body rspb',
    
    template:_.template($('#wikiPreviousSearch').html()),
    
    render:function(){
    
    this.$el.html(this.template(this.model.toJSON()));
    return this;
    
}
    
});