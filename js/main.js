//global variables
var proxy = 'http://crossorigin.me'
var url = 'http://rri.co.id/berita';
var url_rss = 'rss.html';
var categorys = ['nasional', 'luar_negeri', 'daerah', 'kilas_berita', 'ekonomi', 'olahraga', 'arus_mudik_balik', 'serba_serbi_ramadhan', 'sigap_polri', 'feature', 'hiburan', 'budaya', 'kesehatan', 'teknologi', 'sudut_istana'];

var rssExample;

$(document).ready(function(){
  //checking hash
  var category = getHash();
  if(category != ''){
    showRss(category);
  }

  //adding menus
  for (var i = 0; i < categorys.length; i++) {
    var title = categorys[i].replace(/_/g, ' ');
    $('#categorys').append('<a id="'+categorys[i]+'" href="#'+categorys[i]+'" class="list-group-item">'+title+'</a>');
  }
});

$(window).on('hashchange', function(){
  var category = getHash();
  if(category != ''){
    showRss(category);
  }
});

function getHash() {
  var hash = $(location).attr('hash');
  hash = hash.replace('#', ''); //deleting hastag
  return hash;
}

function showRss(category){
  var myurl = url+'/'+category+'/'+url_rss;
  var htmlRss = '';
  feednami
    .load(myurl)
    .then(function(feed){
      for (var i = 0; i < feed.entries.length; i++) {
        var html='\
          <div class="panel-group">\
            <div class="panel panel-default">\
              <div class="panel-heading">\
                <p class="panel-title">\
                  <a data-toggle="collapse" href="#rss_'+i+'">'+(i+1)+'. '+feed.entries[i].title+'</a>\
                </p>\
              </div>\
              <div id="rss_'+i+'" class="panel-collapse collapse">\
                <div class="panel-body"><p style="text-align:justify">'+feed.entries[i].description+'</p></div>\
                <button data-toggle="collapse" href="#rss_'+i+'" class="btn btn-default" style="width:100%">Hide</button>\
              </div>\
            </div>\
          </div>\
        ';
        htmlRss += html;
      }
      $('#rss').html(htmlRss);
      $('#categorys a').removeClass('active');
      $('#'+category).addClass('active');
    })
    .catch(function(error){
      console.log(error);
    });
}
