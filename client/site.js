$('#save-note').click(()=>{
//send POST method to generate new Note object
  fetch('http://localhost:3000/notes',{
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      title : $('#note-title').val(),
      priority : $('#priority-select').val()
    })
  }).then(function(response){
    return response.json()
  }).then(function(json){
    console.log(json)
  })

})

$(document).ready(()=>{
//send GET method to grab content of array on server
  fetch('http://localhost:3000/notes').then(function(response){
    return response.json()
  }).then(function(json){
    for(index in json){
      let putMe = json[index]
//build the card and card body wil be joined later
      let card = $('<div>').addClass('card')
      let cardbody = $('<div>').addClass('card-body').html(`
    <p>${json[index].title}: <br>PRIORITY: ${json[index].priority}<br>
    Started: ${json[index].dateCreated}<br>
    Completed? ${json[index].dateCompleted}</P>`)
//create and append the complete task button
    let completeBTN = $('<button>').addClass('btn btn-primary mb-2').html('COMPLETE TASK')
    completeBTN.click(()=>{
      putNote(putMe)
    })
    cardbody.append(completeBTN)
//create and append the delete task button
    let deleteBTN = $('<button>').addClass('btn btn-primary mb-2').html('DELETE TASK')
    deleteBTN.click(()=>{
      deleteNote(putMe)
    })
    cardbody.append(deleteBTN)
//place the card body (with its buttons and text) into the card
    card.html(cardbody)
//check completeion to decide append destination
  if(json[index].isCompleted){
    $('#note-cards-done').append(card)
  }
  else {
    $('#note-cards').append(card)
  }

}//end of for(index in json)
})//end of .then(function(json)
})//end of $(document).ready(()=>

function putNote(noteToUpdate){
//sends PUT method to invoke Note.completeTask() which is a Class.method()
  fetch('http://localhost:3000/notes',{
    method : 'PUT',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(noteToUpdate)
  }).then(function(response){
    return response.json()
  }).then(function(json){
    //console.log(json)
    window.location.reload()
  })

}//end of putNote

function deleteNote(noteToUpdate){
//send DELETE method to remove object from array on server
  fetch('http://localhost:3000/notes',{
    method : 'DELETE',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(noteToUpdate)
  }).then(function(response){
    return response.json()
  }).then(function(json){
    //console.log(json)
    window.location.reload()
  })

}//end of deleteNote
