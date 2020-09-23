class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener("submit", this.handleSubmit);
  }
  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit called");
    var myForm = new FormData(event.target);
    var nameZ = myForm.get("name");
    var courseZ = myForm.get("course");
    var gradeZ = myForm.get("grade");
    this.createGrade(nameZ, courseZ, gradeZ);
    event.target.reset();
  }
}
