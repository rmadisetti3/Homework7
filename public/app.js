$(function () {

  const render = function () {
      $('#holder').empty();
      $.ajax({ url: '/api/todoList', method: 'GET' })
          .then(function (data) {
              let htmlstr = '';
              data.forEach(element => {
                htmlstr += `<div class="listItems">`;
                htmlstr += `<i id="checkButton" class="far fa-square"></i>`;
                htmlstr += `<h5 class="card-title">${element.content}</h5>`;
                htmlstr += `<i id="xButton" class="fas fa-times"></i>`;
                htmlstr += `</div>`;
              });
              $('#holder').html(htmlstr);
          })
          .catch(function (err) {
              console.log(err);
          });
  }


  $('.submit').on('click', function (event) {
      event.preventDefault();

      const newtodoList = {
          content: $('#content').val().trim(),
          isChecked: false
      };

      for (let key in newtodoList) {
          if (newtodoList[key] === '') {
              alert('Please fill out all fields');
              return;
          }
      }

      $.ajax({ url: '/api/todoList', method: 'POST', data: newtodoList })
          .then(function (data) {
              if (data._id) {
                  $('#content').val('');
                  render();
              } else {
                  alert(`There's been an error`);
              }
          });
  });

  $('#holder').on('click', '#xButton', function (event) {
    $.ajax({ url: '/api/todoList', method: 'DELETE'})
    .then(function (data) {
        if (data._id) {
            $('#content').val('');
            render();
        } else {
            alert(`There's been an error`);
        }
    });
  });

  $('#holder').on('click', '#checkButton', function (event) {
      const content = $(this).data('content');
      let isCheckedNew = false
      if ($(this).data('isChecked') == false) {
         isCheckedNew = true;
         
      }
      const dataToSend = {
          content: content,
          isChecked: isCheckedNew
      };
      $.ajax({ url: '/api/todoList', method: 'PUT', data: dataToSend })
          .then(function(data) {
              render();
          })
          .catch(function (err) {
              console.log(err);
          });
  });

  render();

});