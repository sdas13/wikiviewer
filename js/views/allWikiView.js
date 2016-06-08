var app = app || {};

app.allWikiView = Backbone.View.extend({
    
    //tagName:'div',
    //className:'',
   
    render:function(){
        
        this.collection.each(function(wiki){
            var wikiView=new app.singleWikiView({model:wiki});
            this.$el.append(wikiView.render().el);
        },this);        
        return this;
    }
    
});


app.allWikiSuggestionView=Backbone.View.extend({
    
   
    render:function(){
        
        this.collection.each(function(suggest){
            var wikiSuggestion=new app.singleWikiSuggestionView({model:suggest});
            this.$el.append(wikiSuggestion.render().el);
        },this);
        return this;
    }
    
});

app.allleWikiSearchView=Backbone.View.extend({
    
   render:function(){
        this.collection.each(function(search){
            var singleWikiSearchView=new app.singleWikiSearchView({model:search});
            this.$el.append(singleWikiSearchView.render().el);
        },this);
        return this;
    }
    
});