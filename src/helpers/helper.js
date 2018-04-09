

export default {

    today(){
        var dt = new Date();
        return (dt.getDate() + "." + (dt.getMonth() + 1) + "." + dt.getFullYear())
    },

    inputValid (inputId) {
        var inputField=document.getElementById(inputId).value;
        if (inputField === "") {
            console.log("false"+ inputId)

            var element = document.getElementById(inputId);
            element.classList.add("not-valid");

            return false;
        } else {
            console.log("true"+ inputId)
            return true;
        }
    },

    // addNotValidToId (id) {
    //     var element = document.getElementById(id);
    //     element.classList.add("not-valid");
    // }

    // timeConverter(t) {     
    //     var a = new Date(t * 1000);
    //      var today = new Date();
    //      var yesterday = new Date(Date.now() - 86400000);
    //      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //      var year = a.getFullYear();
    //      var month = months[a.getMonth()];
    //      var date = a.getDate();
    //      var hour = a.getHours();
    //      var min = a.getMinutes();
    //      if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
    //          return 'today, ' + hour + ':' + min;
    //      else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
    //          return 'yesterday, ' + hour + ':' + min;
    //      else if (year == today.getFullYear())
    //          return date + ' ' + month + ', ' + hour + ':' + min;
    //      else
    //          return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
    //  }

  } ;


// function timeConverter(UNIX_timestamp){
//     var a = new Date(UNIX_timestamp * 1000);
//     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var year = a.getFullYear();
//     var month = months[a.getMonth()];
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//     return time;
//   }