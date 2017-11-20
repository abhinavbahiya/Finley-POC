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

function deleteMe(receiptId) {
  // Not Yet Completed
  let newUrl = `${API.BASE_URL}${modifyUrls(API.REQUEST.UPDATE_DELETE_RECEIPTS), receiptId}.json`;
  console.log(newUrl);
  $.ajax({
    url: newUrl,
    method: API.TYPE.DELETE,
    success: function(result) {
      console.log(result);
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
        return `<div style = "display: inline-block;margin: 0 20px 20px 0;border:solid 2px #000;padding: 5px;">
                  <p>${receipt.id}<p>
                  <img height = 100 src = ${API.BASE_URL}${receipt.image.original}/>
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
