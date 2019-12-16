var Board = Backbone.Model.extend({
    urlRoot : "/board/"
})
var BoardSet = Backbone.Collection.extend({
    url : "/board/",
    model : Board
})

var Story = Backbone.Model.extend({
    urlRoot : "/story/"

});
var StorySet = Backbone.Collection.extend({
    url : "/story/"
});

var Stage = Backbone.Model.extend()
var StageSet = Backbone.Collection.extend({
    url : "/stage/"
})