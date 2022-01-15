//Tạo hàm ready để tài liệu được load xong mới thực hiện lệnh
$(document).ready(function() {
    //Biến n, dùng để gán vào cột STT
    var n = 0;

    //Tạo hàm getInfo để lấy thông tin người dùng nhập vào
    //Khi người dùng click vào nút Nhập hàm sẽ thực thi
    $("#getInfo").click(() => {
        //Lấy giá trị ở các ô input gán vào các biến
        var name = $("#name").val();
        var math = $("#math").val();
        var physical = $("#physical").val();
        var chemistry = $("#chemistry").val();
        //Kiểm tra và yêu cầu người dùng nhập đủ và đúng thông tin
        //Điểm các môn Toán, Lý, Hóa phải từ 0 đến 10
        if(name == "" | math == "" | physical == "" | chemistry == "") {
            alert("Vui lòng nhập đủ thông tin !");
        } else if((math < 0) || (math > 10)) {
            alert("Vui lòng nhập lại điểm Toán ! (từ 0 đến 10)");
        } else if((physical < 0) || (physical > 10)) {
            alert("Vui lòng nhập lại điểm Lý ! (từ 0 đến 10)");
        } else if((chemistry < 0) || (chemistry > 10)) {
            alert("Vui lòng nhập lại điểm Hóa ! (từ 0 đến 10)");
        } else {
            //Khi nhập đủ và đúng thông tin sẽ tiếp tục 
            n ++;
            //Dùng hàm append để tạo hàng
            $("#table1").append("<tr></tr>");
            //Tạo ô cho bảng và đưa thông tin người dùng đã nhập vào các ô tương ứng
            $("#table1 tr:last")
                .append("<td>" + n + "</td>")
                .append("<td>" + name + "</td>")
                .append("<td>" + math + "</td>")
                .append("<td>" + physical + "</td>")
                .append("<td>" + chemistry + "</td>")
                .append("<td>?</td>");
            //Xóa các ô input để người dùng tiếp tục nhập vào
            $("#form input").val("");

            //Dùng hàm each để duyệt qua các hàng, dùng hàm children để truy cập vào ô chứa thông tin họ tên
            //Dùng hàm addClass để thêm class cho ô, ô chứa thông tin tên sẽ được canh trái bằng css
            $("#table1 tr").not(":first").each(function() {
                $(this).children("td").eq(1).addClass("name-left");
            });
        }
    });

    //Tạo hàm average tính điểm trung bình
    $("#average").click(() => {
        //Kiểm tra nếu chưa nhập thông tin thì thông báo cho người dùng
        if( n == 0) {
            alert("Chưa nhập thông tin !");
        } else {
            //Dùng hàm each duyệt qua các hàng của bảng
            $("#table1 tr").not(":first").each(function() {
                //Lấy giá trị ở ô chứa điểm Toán, Lý, Hóa gán vào các biến
                var math = $(this).children("td").eq(2).text();
                var physical = $(this).children("td").eq(3).text();
                var chemistry = $(this).children("td").eq(4).text();
                //Dùng hàm eval để chuyển sang kiểu số, sau đó tính điểm trung bình, gán vào biến average
                var average = (eval(math) + eval(physical) + eval(chemistry)) / 3;
                //Làm tròn giá trị average đến 1 chữ số thập phân, rồi đưa vào ô chứa điểm trung bình
                $(this).children("td").eq(5).text(average.toFixed(1));
            });
        }
    });

    //Tạo hàm xác định học sinh giỏi
    $("#excellentStudents").click(() => {
        var excellent = 0;
        //Dùng hàm each duyệt qua các hàng
        $("#table1 tr").not(":first").each(function() {
            //Nếu ô chứa điểm trung bình có giá trị >= 8 thì tô đỏ hàng chứa ô đó
            if($(this).children("td").eq(5).text() >= 8) {
                $(this).addClass("red-row");
                //Nếu điểm trung bình >= 8 thì tăng biến excellent 1 đơn vị
                excellent ++;
            }
        });
        //Nếu không có học sinh giỏi thì thông báo cho người dùng
        if(excellent == 0) {
            alert("Không có học sinh giỏi !");
        }
    });

    //Tạo hàm để xem thông tin tổng thể
    $("#viewAll").click(() => {
        //Tạo mảng data, giá trị trong mảng tương ứng với: Sĩ số, số học sinh giỏi, khá, trung bình, yếu
        var data = [n, 0, 0, 0, 0];
        //Duyệt qua các hàng của bảng 1
        $("#table1 tr").not(":first").each(function() {
            //Nếu có học sinh giỏi thì tăng data[1], khá tăng data[2], trung bình tăng data[3], yếu tăng data[4]
            if($(this).children("td").eq(5).text() >= 8) {
                data[1] ++;
            } else if($(this).children("td").eq(5).text() >= 6.5) {
                data[2] ++;
            } else if($(this).children("td").eq(5).text() >= 5) {
                data[3] ++;
            } else {
                data[4] ++;
            }
        });
        //Duyệt qua các hàng của bảng 2
        $("#table2 tr").each(function(i) {
            //Gán các giá trị của mảng data vào các cột tương ứng
            $(this).children("td").text(data[i]);
        });

    });
});
