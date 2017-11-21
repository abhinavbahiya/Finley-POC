const API = {
  BASE_URL: 'http://interview.finly.io/',
  REQUEST: {
    GET_POST_RECEIPTS: 'receipts',
    UPDATE_DELETE_RECEIPTS: 'receipts/{0}'
  },
  TYPE : {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },
}

function modifyUrls() {
  if(arguments.length) {
    let endPoint = arguments[0];
    let args = Array.prototype.slice.call(arguments, 1);
    return endPoint.replace(/{(\d+)}/g, (match, number) => {
      return args[number] ? args[number] : match;
    });
  }
}

function uploadFiles() {
  let file = document.getElementById("inputFiles");
  let formData = new FormData();
  _.each(file.files, (file) => {
    formData.append('receipts', file);
  });
  $.ajax({
    url: `${API.BASE_URL}${API.REQUEST.GET_POST_RECEIPTS}.json`,
    method: API.TYPE.POST,
    processData: false,
    contentType: false,
    cache: false,
    data: formData,
    dataType: 'json',
    success: function(result) {
      console.log(result);
      getData(); // Re-render the results on the page
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function deleteMe(receiptId) {
  let newUrl = `${API.BASE_URL}${modifyUrls(API.REQUEST.UPDATE_DELETE_RECEIPTS, receiptId)}.json`;
  $.ajax({
    url: newUrl,
    method: API.TYPE.DELETE,
    success: function(result) {
      console.log(result);
      getData(); // Re-render the results on the page
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function getData() {
  let receipts = [];
  $.ajax({
    url: `${API.BASE_URL}${API.REQUEST.GET_POST_RECEIPTS}.json`,
    method: API.TYPE.GET,
    success: function(result) {
      receipts = result;
      let showReceipts = receipts.map((receipt) => {
        if(_.isNull(receipt.note)) {
          receipt.note = 'No Note Found';
        }
        return `<div style = "display: inline-block;margin: 0 20px 20px 0;border:solid 2px #000;padding: 5px;">
                  <p>Image ID: ${receipt.id}<p>
                  <img height = 100 src = ${API.BASE_URL}${receipt.image.original}/>
                  <p>Image Updated At: ${receipt.image_updated_at}</p>
                  <p>Note: ${receipt.note}</p>
                  <button onClick="deleteMe(${receipt.id})">Delete</button>
                </div>`;
      });
      document.getElementById('main').innerHTML = showReceipts.join('');
    },
    error: function(error) {
      console.log(error);
    }
  });
}

getData();
