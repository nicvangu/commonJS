;

var studentCss = {
    "id": {
        studentTable: "student-table",
        addStudentButton: "addStudentButton",
        firstNameInput: "firstNameInput",
        lastNameInput: "lastNameInput",
        gpaInput: "gpaInput"
    },
    "class": {
        studentMood : "student-mood",
        studentRecord : "student-record",
        studentName : "student-name",
        studentGpa : "student-gpa",
        studentMood : "student-mood"

    }
};

var getStudentsElements = {

    "byId": {
        studentTable: function() {
            return document.getElementById("student-table");
        },
        addStudentButton: function() {
            return document.getElementById("addStudentButton");
        },
        firstNameInput: function() {
            return document.getElementById("firstNameInput");
        },
        lastNameInput: function() {
            return document.getElementById("lastNameInput");
        },
        gpaInput: function() {
            return document.getElementById("gpaInput");
        }
    },

    "byClass": {
        studentMood: function() {
            return document.getElementsByClassName("student-mood");
        },
        studentRecord: function() {
            return document.getElementsByClassName("student-record");
        },
        studentName: function() {
            return document.getElementsByClassName("student-name");
        },
        studentGpa: function() {
            return document.getElementsByClassName("student-gpa");
        },
        studentMood: function() {
            return document.getElementsByClassName("student-mood");
        }
    }
};

;
var SchoolProfiles = (function() {

    var Person = function(firstName, middleName, lastName) {
        this.firstName = firstName;
        this.middleName = middleName || null;
        this.lastName = lastName;
        this.fullName = ((middleName === null) || (middleName === undefined)) ? firstName + " " + lastName : firstName + " " + middleName + " " + lastName;
    };

    var Student = function(firstName, middleName, lastName, gpa) {
        Person.call(this, firstName, middleName, lastName);
        this.gpa = gpa;
        this.studentName = this.fullName;
    };

    var Professor = function(firstName, middleName, lastName, gpa) {
        Person.call(this, firstName, middleName, lastName);
    };

    return {
        Person: Person,
        Student: Student
    };

})();

;
var Courses = (function() {

    return {};
})();

;
var Moods = (function(Math, document) {

    moods = [
        "happy",
        "sad",
        "angry",
        "bored",
        "tired",
        "pizza"
    ];

    var getMood = function(currentMood) {
        var numberOfMoods = moods.length - 1;
        var moodIndex = (Math.random() * numberOfMoods).toFixed(0) * 1;

        while (moods[moodIndex] == currentMood) {
            moodIndex = (Math.random() * numberOfMoods).toFixed(0) * 1;
        }

        return moods[moodIndex];
    }

    var init = function(intervalSpeed) {
        var studentMood = getStudentsElements.byClass.studentMood(); 

        setInterval(function() {
            var studentCount = studentMood.length - 1;

            for (var i = 0; i < studentMood.length; i++) {
                studentMood[i].innerHTML = Moods.getMood(studentMood[i].innerHTML);
            };

        }, intervalSpeed);
    };


    return {
        moods: moods,
        getMood: getMood,
        init: init,
    };

})(Math, document);


;
var StudentForm = (function(window, document, SchoolProfiles) {

    var studentTable = getStudentsElements.byId.studentTable();
    var addStudentButton = getStudentsElements.byId.addStudentButton();
    var firstNameInput = getStudentsElements.byId.firstNameInput();
    var lastNameInput = getStudentsElements.byId.lastNameInput();
    var gpaInput = getStudentsElements.byId.gpaInput();


    var validStudent = function(student) {
        var valid = true;
        if (student.firstName === "" || student.firstName === undefined || student.firstName === null) {
            valid = false;
            console.log('invalid firstname');
        };
        if (student.lastName === "" || student.lastName === undefined || student.lastName === null) {
            valid = false;
            console.log('invalid lastName');

        };
        if (isNaN(student.gpa) || ((student.gpa > 4) || (student.gpa < 0))) {
            valid = false;
            console.log('invalid gpa');
        };

        return valid;
    };

    var addStudent = function(student) {
        if (validStudent(student)) {
            var record = "<tr class='" + studentCss.class.studentRecord + "'>" +
                "<td class='" + studentCss.class.studentName + "'>" + student.studentName + "</td>" +
                "<td class='" + studentCss.class.studentGpa + "'>" + (student.gpa * 1.0).toFixed(1) + "</td>" +
                "<td class='" + studentCss.class.studentMood + "'>" + "---" + "</td>" +
                "</tr>";

            studentTable.innerHTML += record;
        };
    };

    var getStudentRecords = function() {
        return document.getElementsByClassName(studentId.class.studentRecord);
    };

    var show = function(el) {
        el.style.display = "";
    };

    var hide = function(el) {
        el.style.display = "none";
    };

    var hideStudents = function(numberOfStudents) {
        var records = getStudentRecords();
        var studentRecordsLength = records.length;
        var studentRecordStoppingPoint = studentRecordsLength - numberOfStudents;

        if (numberOfStudents > studentRecordsLength) {
            console.error("numberOfStudents passed in exceeds the number of available student records.");
        } else {
            for (var i = studentRecordsLength - 1; i >= studentRecordStoppingPoint; i--) {
                hide(records[i]);
            };
        };

    };

    var showMoreStudents = function(numberOfStudents) {
        var records = getStudentRecords();
        var studentRecordsLength = records.length;
        var studentRecordStoppingPoint = studentRecordsLength - numberOfStudents;

        for (var i = studentRecordsLength - 1; i >= studentRecordStoppingPoint; i--) {
            show(records[i]);
        };
    };


    addStudentButton.addEventListener("click", function(e) {
        addStudent(new SchoolProfiles.Student(firstNameInput.value, null, lastNameInput.value, gpaInput.value));
    });

    return {
        addStudent: addStudent,
        hideStudents: hideStudents,
        showMoreStudents: showMoreStudents
    };

})(window, document, SchoolProfiles);


;
var program = (function(window, document) {

    var students = [
        new SchoolProfiles.Student("Nicholas", null, "Van Gucht", 4.0),
        new SchoolProfiles.Student("Jessica", null, "Hatczel", 4.0),
        new SchoolProfiles.Student("Chris", null, "Abbott", 4.0),
        new SchoolProfiles.Student("Adam", null, "Swenson", 4.0)
    ];

    for (var i = 0; i < students.length; i++) {
        StudentForm.addStudent(students[i]);
    };

    //Moods.init(1000);

})(window, document);