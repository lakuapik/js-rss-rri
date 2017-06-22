//global variables
var url = 'http://rri.co.id/berita';
var url_rss = 'rss.html';
var categorys = ['nasional', 'luar_negeri', 'daerah', 'kilas_berita', 'ekonomi', 'olahraga', 'arus_mudik_balik', 'serba_serbi_ramadhan', 'sigap_polri', 'feature', 'hiburan', 'budaya', 'kesehatan', 'teknologi', 'sudut_istana'];
var rss;

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
        rss = feed;
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
                  <div class="panel-body">\
                    <input type="hidden" name="idrss" value="'+i+'">\
                    <div style="text-align:center">\
                      <img class="img-responsive img-rss" alt="IMG - '+feed.entries[i].title+'" src=""/>\
                    </div>\
                    <p style="text-align:justify">'+feed.entries[i].description+'</p>\
                  </div>\
                  <button data-toggle="collapse" href="#rss_'+i+'" class="btn btn-default" style="width:100%">Hide</button>\
                </div>\
              </div>\
            </div>\
          ';
          htmlRss += html;
        }
        $('#rss').html(htmlRss);

        //load image when panel collapse
        $('.panel-group').on('show.bs.collapse', function(){
          var idrss = parseInt($(this).find('input[name=idrss]').val());
          $(this).find('img').attr('src', rss.entries[idrss].image.url)
        });
      })
      .catch(function(error){
        console.log(error);
      });
  } else {
    console.log('we dont have that category dude.');
  }
}
