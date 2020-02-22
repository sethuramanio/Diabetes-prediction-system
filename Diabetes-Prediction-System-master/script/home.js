$(document).ready(function () {
    console.log("ready");  
    $("#click").click(function () {
        console.log("clicked");

        var Pregnancies = $("#Pregnancies").val();
        var Glucose = $("#Glucose").val();
        var BloodPressure = $("#BloodPressure").val();
        var SkinThickness = $("#SkinThickness").val();
        var Insulin = $("#Insulin").val();
        var BMI = $("#BMI").val();
        var Dpf = $("#Dpf").val();
        var Age = $("#Age").val();

        if (BloodPressure.length > 0 && Pregnancies.length > 0 && Glucose.length > 0 && SkinThickness.length > 0 && Insulin.length > 0 && BMI.length > 0 && Dpf.length > 0 && Age.length > 0) {
            console.log("no error");
            var text = '{' + '"Pregnancies": ' + Pregnancies +
                ',"Glucose": ' + Glucose +
                ',"BloodPressure": ' + BloodPressure +
                ',"SkinThickness":' + SkinThickness +
                ',"Insulin":' + Insulin +
                ',"BMI":' + BMI +
                ',"Dpf":' + Dpf +
                ',"Age":' + Age + '}';
            console.log(text);
            obj = JSON.parse(text);
            console.log(obj);
            $.ajax({
                data: obj,
                type: 'POST',
                crossDomain: true,
                dataType: "json",
                crossOrigin: null,
                url: "http://54.160.238.67:5000/process"
            })
            .done(function (data) {
                if (data.error) {
                    console.log(data.Outcome);
                   
                }
                else {
                    console.log(data);
                    var ob = JSON.parse(data);
                    if (ob.Outcome === 1)
                        $("#outcome").append("In Need Of Treatment");
                    if (ob.Outcome === 0)
                        $("#outcome").append("No treatment");
                   
                }

            });
            
            
        } else {
            console.log("Enter all Values");
        }
        
        
        
  


    });
    $.ajax({
        type: "GET",
        url: "http://54.160.238.67:5000/",
        cache: false,
        success: function (data) {
            console.log(data);
            
        }
    });
});


