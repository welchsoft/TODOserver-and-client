class Note {

  constructor(title,priority) {
    this.title = title
    this.priority = priority
    this.dateCreated = new Date()
    this.dateCompleted = 'Not Complete'
    this.isCompleted = false
//consider using GUID instead its a crazy big unique hash
    this.unique = this.title+this.dateCreated

  }
  toggleNote(){
    if(this.isCompleted){
      this.dateCompleted = 'Not Complete'
      this.isCompleted = false
    }
    else{
      this.dateCompleted = new Date()
      this.isCompleted = true
    }

  }
}

module.exports = Note
