//global variables
var url = 'http://rri.co.id/berita';
var url_rss = 'rss.html';
var categorys = ['nasional', 'luar_negeri', 'daerah', 'kilas_berita', 'ekonomi', 'olahraga', 'arus_mudik_balik', 'serba_serbi_ramadhan', 'sigap_polri', 'feature', 'hiburan', 'budaya', 'kesehatan', 'teknologi', 'sudut_istana'];

//on document ready
$(document).ready(function(){
  //adding category
  for (var i = 0; i < categorys.length; i++) {
    var title = categorys[i].replace(/_/g, ' ');
    $('#category').append('<option value="'+categorys[i]+'">'+title+'</option>');
  }

  //select on changed
  $('#category').change(function(){
    var selected = $(this).val();
    showRss(selected);
  });
});

function showRss(category){
  if($.inArray(category, categorys) != '-1'){
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
  } else {
    console.log('we dont have that category dude.');
  }
}
