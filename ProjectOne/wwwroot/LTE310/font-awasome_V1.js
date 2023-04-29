function loadTimeline_V1(ID) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            var myResult = this.responseText;
            var obj = JSON.parse(myResult);
            var LastId = 0;
            var VideoUrl = "null";
            var DataToAppend = "";
            for (i in obj) {
                var nContentId = obj[i].contentId;
                if (LastId != nContentId) {
                    DataToAppend = DataToAppend + "<div class='row'>";
                    DataToAppend = DataToAppend + "<div class='col-md-12'>";
                    DataToAppend = DataToAppend + "<div class='timeline'>";
                    var smsd = obj[i].contentPublishedOn;
                    let date = new Date(Date.parse(smsd));
                    var year = ("0" + (date.getFullYear())).slice(-2);
                    var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
                    var day = ("0" + date.getDate()).slice(-2);
                    var hours = ("0" + date.getHours()).slice(-2);
                    var minutes = ("0" + date.getMinutes()).slice(-2);

                    var contentPublishedOn = day + "/" + mnth + "/" + year + " " + hours + ":" + minutes;
                    if (obj[i].contentTypeId == "1") {
                        //type 1 means notification
                        DataToAppend = DataToAppend + "<div>";
                        DataToAppend = DataToAppend + "<i class='fas fa-comments bg-yellow'></i>";
                        DataToAppend = DataToAppend + "<div class='timeline-item'>";
                        DataToAppend = DataToAppend + "<span class='time'><i class='fas fa-clock'></i>" + contentPublishedOn + "</span>";
                        DataToAppend = DataToAppend + "<h3 class='timeline-header'>Notification Uploaded</h3>";
                        DataToAppend = DataToAppend + "<div class='timeline-body'>" + obj[i].contentInstruction + "</div>";
                        DataToAppend = DataToAppend + "</div>";
                        DataToAppend = DataToAppend + "</div>";
                    }
                    if (obj[i].contentTypeId == 2) {
                        //type 2 means lecture
                        DataToAppend = DataToAppend + "<div>";
                        DataToAppend = DataToAppend + "<i class='fa fa-camera bg-purple'></i>";
                        DataToAppend = DataToAppend + "<div class='timeline-item'>";
                        DataToAppend = DataToAppend + "<span class='time'><i class='fas fa-clock'></i>" + contentPublishedOn + "</span>";
                        DataToAppend = DataToAppend + "<h3 class='timeline-header'>Lecture Uploaded <a>(Topic:" + obj[i].contentTitle + "  )</a> </h3>";
                        
                        if (obj[i].contentVideoUrl != "") {
                            VideoUrl = "https://www.youtube.com/embed/" + obj[i].contentVideoUrl;
                            if (obj[i].contentVideoUrl != "https://www.youtube.com/embed/") {
                                DataToAppend = DataToAppend + "<div class='timeline-body'>";
                                    DataToAppend = DataToAppend + "<div class='embed-responsive embed-responsive-16by9'>";
                                        DataToAppend = DataToAppend + "<iframe class='embed-responsive-item' src=" + VideoUrl + " allowfullscreen></iframe>";
                                    DataToAppend = DataToAppend + "</div>";
                                DataToAppend = DataToAppend + "</div>";
                            }
                            VideoUrl = "";
                        }
                        
                        DataToAppend = DataToAppend + "</div>";
                        DataToAppend = DataToAppend + "</div>";
                    }
                    if (obj[i].contentTypeId == 3) {
                        //type 3 means assignment
                        DataToAppend = DataToAppend + "<div>";
                        DataToAppend = DataToAppend + "<i class='fa fa-file bg-red'></i>";
                        DataToAppend = DataToAppend + "<div class='timeline-item'>";
                        DataToAppend = DataToAppend + "<span class='time'><i class='fas fa-clock'></i>" + contentPublishedOn + "</span>";
                        DataToAppend = DataToAppend + "<h3 class='timeline-header'>Assignment Uploaded <a href='../../Student/Assignments'>(Topic:" + obj[i].contentTitle + " ) Go To Assignment Tab For More Info</a> </h3>";
                        DataToAppend = DataToAppend + "</div>";
                        DataToAppend = DataToAppend + "</div>";
                    }
                    LastId = obj[i].contentId;
                    DataToAppend = DataToAppend + "</div>";
                    DataToAppend = DataToAppend + "</div>";
                    DataToAppend = DataToAppend + "</div>";
                } else {
                    LastId = obj[i].contentId;
                }
            }

            document.getElementById("ClassRoom_ID_1").innerHTML = DataToAppend;
        }
        xhttp.open("GET", "https://api.isp.edu.pk/api/LMS_student/TimeLine/" + ID);
    xhttp.send();
}
function loadLectures_V1(PortalId, Unid) {
    var DataToAppend = "";

    var formData = new FormData();
    formData.append("PortalId", PortalId);
    formData.append("Unid", Unid);
    $.ajax({
        url: 'https://api.isp.edu.pk/api/Student/Lectures',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        crossDomain: true,
        success: function (obj) {
            //Set table here
            DataToAppend = DataToAppend + "<div class='card'>";
            DataToAppend = DataToAppend + "<div class='card-header'>";
            DataToAppend = DataToAppend + "<h3 class='card-title'>Lectures</h3>";
            DataToAppend = DataToAppend + "</div>";
            DataToAppend = DataToAppend + "<div class='card-body p-0 table-responsive'>";
            DataToAppend = DataToAppend + "<table class='table'>";
            DataToAppend = DataToAppend + "<thead>";
            DataToAppend = DataToAppend + "<tr>";
            DataToAppend = DataToAppend + "<td>#</td>";
            DataToAppend = DataToAppend + "<td>Select</td>";
            DataToAppend = DataToAppend + "<td>On-line Class Attendance</td>";
            DataToAppend = DataToAppend + "<td>On Date</td>";
            DataToAppend = DataToAppend + "<td>Topic / Title</td>";
            DataToAppend = DataToAppend + "</tr>";
            DataToAppend = DataToAppend + "</thead>";
            DataToAppend = DataToAppend + "<tbody id='myTable'>";


            for (i in obj) {
                //set table rows here
                DataToAppend = DataToAppend + "<tr>";
                DataToAppend = DataToAppend + "<td>" + obj[i].contentToken + "</td>";
                DataToAppend = DataToAppend + "<td>";
                if (obj[i].contentVideoUrl != "") {
                    DataToAppend = DataToAppend + "<a href='../../../Portal_LMS/LectureFlow/" + obj[i].contentId + "' class='btn btn-block btn-primary btn-flat btn-sm'><i class='fa fa-paper-plane-o'></i>&nbsp;&nbsp;Open</a>";
                }


                DataToAppend = DataToAppend + "</td>";
                if (obj[i].atnStatus == '1') {
                    DataToAppend = DataToAppend + "<td><i class='fa fa-check' style='color:green'></i> Present In On-line Class<br>Evidence Record Number: " + obj[i].EvidenceRecordNumber + "</td>";
                }
                else if (obj[i].atnStatus == '2') {
                    DataToAppend = DataToAppend + "<td><i class='fa fa-check' style='color:green'></i> Present In On-line Class<br>Evidence Record Number: " + obj[i].EvidenceRecordNumber + "</td>";
                }
                else {
                    DataToAppend = DataToAppend + "<td><i class='fa fa-skull-remove' style='color:red'></i></td>";

                }
                DataToAppend = DataToAppend + "<td>" + obj[i].contentPublishedOn + "</td>";
                DataToAppend = DataToAppend + "<td>" + obj[i].contentTitle + "</td>";
                DataToAppend = DataToAppend + "</tr>";
            }
            DataToAppend = DataToAppend + "</tbody>";
            DataToAppend = DataToAppend + "</table>";
            DataToAppend = DataToAppend + "</div>";
            DataToAppend = DataToAppend + "</div>";

            document.getElementById("Lectures_ID_1").innerHTML = DataToAppend;
        },
        error: function (xhr, status, error) {
            alert("Result: papu " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });
}
function loadLecture_V1(Unid, ContentId) {
    GetApi = "https://lms.isp.edu.pk/api/LMS_Student/LMS_Timeline_V3_C/" + Unid + "/" + ContentId;
    var DataToAppend = "";
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var jsonResult = this.responseText;
        var obj = JSON.parse(jsonResult);
        for (i in obj) {
            DataToAppend = DataToAppend + "<div class='card'>";
            DataToAppend = DataToAppend + "<div class='card-header'>";
            DataToAppend = DataToAppend + "<h3 class='card-title'>Title Number: " + obj[i].contentTitle + " <h3>";
            DataToAppend = DataToAppend + "</div>";
            DataToAppend = DataToAppend + "<div class='box-body no-padding'>";
            DataToAppend = DataToAppend + "<div class='mailbox-read-info'>";
            if (obj[i].contentVideoUrl != null) {
                var VideoUrl = "https://www.youtube.com/embed/" + obj[i].contentVideoUrl;
                DataToAppend = DataToAppend + "<div class='embed-responsive embed-responsive-16by9'>";
                DataToAppend = DataToAppend + "<iframe class='embed-responsive-item' src='" + VideoUrl + "' allowfullscreen></iframe>";
                DataToAppend = DataToAppend + "<br>";
                DataToAppend = DataToAppend + obj[i].contentInstruction;
                DataToAppend = DataToAppend + "<br>";
                DataToAppend = DataToAppend + "</div>";
            }
            DataToAppend = DataToAppend + "<ul class='mailbox-attachments d-flex align-items-stretch clearfix'>";
            var innerJson = obj[i].attatchments;
            for (j in innerJson) {
                if (innerJson[j].filName != "NoFile.png") {
                    DataToAppend = DataToAppend + "<li>";
                    DataToAppend = DataToAppend + "<span class='mailbox-attachment-icon'><i class='far fa-file'></i></span>";
                    DataToAppend = DataToAppend + "<div class='mailbox-attachment-info'>";
                    DataToAppend = DataToAppend + "<a href='#' class='mailbox-attachment-name'><i class='fas fa-paperclip'></i>" + innerJson[j].filName + "</a>";
                    DataToAppend = DataToAppend + "<span class='mailbox-attachment-size clearfix mt-1'>";
                    DataToAppend = DataToAppend + "<a href='https://portal.isp.edu.pk/" + innerJson[j].filDirectory + "/" + innerJson[j].filYear +
                        "/" + innerJson[j].filMonth + "/" + innerJson[j].filDay +
                        "/" + innerJson[j].filName + "' download='' class='btn btn-default btn-sm float-right'><i class='fas fa-cloud-download-alt'></i></a>";
                    DataToAppend = DataToAppend + "</span>";
                    DataToAppend = DataToAppend + "</div>";
                    DataToAppend = DataToAppend + "</li>";
                }
            }
            DataToAppend = DataToAppend + "</ul>";
            DataToAppend = DataToAppend + "</div>";
            DataToAppend = DataToAppend + "</div>";
            DataToAppend = DataToAppend + "</div>";
        }
        document.getElementById("Lecture_ID_1").innerHTML = DataToAppend;
    }
    xhttp.open("GET", GetApi);
    xhttp.send();
}
function loadSMS_V1(key) {
    var DataToAppend = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);

            DataToAppend = DataToAppend + "<table class='table table-hover text-nowrap'>";
            for (i in obj) {
                if (i >= 0) {
                    DataToAppend = DataToAppend + "<tr><td>" + obj[i].SMSDate + "</td><td>" + obj[i].SMSDetails + "</td></tr>";
                } else {
                    DataToAppend = DataToAppend + "there is no record.";
                }
            }
            DataToAppend = DataToAppend + "</table>";
            document.getElementById("LoadSMS_ID_1").innerHTML = DataToAppend;
        }
    };
    xhttp.open("GET", 'https://api.isp.edu.pk/api/S_Student/SMS_Received_MIS/' + key, true);
    xhttp.send();
}
function Load_Attendance_Summary(StdID) {
    var DataToAppend = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            DataToAppend = DataToAppend + "<table class='table table-bordered'>";
            DataToAppend = DataToAppend + "<th>Subject Name</th> ";
            DataToAppend = DataToAppend + "<th>Teacher Name</th> ";
            DataToAppend = DataToAppend + "<th>Total Lectures</th> ";
            DataToAppend = DataToAppend + "<th>Total Present</th> ";
            for (i in obj) {
                if (i >= 0) {
                    DataToAppend = DataToAppend + "<tr>";
                    DataToAppend = DataToAppend + "<td>" + obj[i].SubjectName + "</td>";
                    DataToAppend = DataToAppend + "<td>" + obj[i].TeacherName + "</td>";
                    DataToAppend = DataToAppend + "<td>" + obj[i].TotalLectures + "</td>";
                    DataToAppend = DataToAppend + "<td>" + obj[i].Present + "</td>";
                    DataToAppend = DataToAppend + "</tr>";
                } else {
                    DataToAppend = DataToAppend + "there is no record.";
                }
            }
            DataToAppend = DataToAppend + "</table>";
            document.getElementById("Attendance_Summary_V1").innerHTML = DataToAppend;
        }
    };
    var url = "https://lms.isp.edu.pk/api/Attendance/Student_Summary_Count/" + StdID;
    xhttp.open("GET", url, true);
    xhttp.send();
}



//public string URL_LOGIN = "https://api.isp.edu.pk/api/Security/Login19/";
//        public string URL_LOGIN_20 = "https://api.isp.edu.pk/api/Security/Login20/";
//        public string URL_TIMETABLE = "https://lms.isp.edu.pk/api/LMS_Student/TimeTable_V2/";
//        public string URL_RECEIVED_SMS = "https://api.isp.edu.pk/api/Student/ReceivedSMS/";
//        public string URL_PROFILE = "https://api.isp.edu.pk/api/Student/Profile/";

//        //https://api.isp.edu.pk/api/LMS_student/TimeLine/16968
//        public string URL_TIME_LINE = "https://api.isp.edu.pk/api/LMS_student/TimeLine/";

//        //POST method Api with Unid = 16968 & PortalId = 10735
//        public string URL_LECTURE_LIST = "https://api.isp.edu.pk/api/Student/Lectures";

//        //Assignment list url/unid/portalId
//        //https://lms.isp.edu.pk/api/LMS_Student/TimeLine_3/16968/10735
//        public string URL_ASSIGNMENTS = "https://lms.isp.edu.pk/api/LMS_Student/TimeLine_3/";
//        //Single post details url/unid/contentId
//        //https://lms.isp.edu.pk/api/LMS_Student/LMS_Timeline_V3_C/16968/49561
//        public string URL_SINGLE_POST = "https://lms.isp.edu.pk/api/LMS_Student/LMS_Timeline_V3_C/";
//        public string URL_COMPLAINTS_LIST = "https://api.isp.edu.pk/api/Complaints/My_List"; //PortalId
//        public string URL_COMPLAINT = "https://api.isp.edu.pk/api/Complaints/Complain";  //ComplainID
//        public string URL_COMPLAINT_FLOW = "https://api.isp.edu.pk/api/Complaints/Flow";  //ComplainID
//        public string URL_COMPLAINT_PULLBACK = "https://api.isp.edu.pk/api/Complaints/PullBack";  //ComplainID
//        public string URL_COMPLAINT_REPLY = "https://datacenter.isp.edu.pk/api/Complaint/Reply";  //string(ReplyText), int(cmpId), File(File)
//        public string URL_COMPLAINT_HEADS = "https://api.isp.edu.pk/api/Complaints/Complain_Heads";  //Get Method no variable