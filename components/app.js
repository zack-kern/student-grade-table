class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var gradeStorage = [];
    for (var i = 0; i < grades.length; i++) {
      gradeStorage.push(grades[i].grade);
    }
    var sum = 0;
    for (var j = 0; j < gradeStorage.length; j++) {
      sum += gradeStorage[j];
    }
    var avg = sum / gradeStorage.length;
    this.pageHeader.updateAverage(avg);
  }

  getGrades() {
    $.ajax({
      type: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError,
      data: "none",
      headers: { "X-Access-Token": "obUmk8K2" },
    });
  }
  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
  }
  createGrade(name, course, grade) {
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      data: {
        name: name,
        course: course,
        grade: grade,
      },
      headers: {
        "X-Access-Token": "obUmk8K2",
      },
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError,
    });
  }
  handleCreateGradeError(error) {
    console.error(error);
  }
  handleCreateGradeSuccess() {
    this.getGrades();
  }
}
