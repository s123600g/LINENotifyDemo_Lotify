document.addEventListener("DOMContentLoaded", function (event) {
  const Counter = {
    data() {
      return {
        message: "",
      };
    },
    methods: {
      user_subscribe() {
        // 取得網址，不包含URL Search Parames
        local_url = ParsingURL(
          (protocol = ""),
          (port = ""),
          (hostname = ""),
          (pathname = "/api/user_subscribe")
        );

        // 取得請求網址
        url_href = ParsingURL_Combine((url = local_url), (SearchParams = {}));

        fetch(url_href, {
          method: "GET",
        })
          .then(function (response) {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                "Response status was not ok. " +
                  "status code: " +
                  response.status +
                  " Status Text: " +
                  response.statusText
              );
            }
          })
          .then(function (data) {
            window.location.replace(data.link_str);
          })
          .catch(function (err) {
            alert("與伺服器請求失敗");
            console.log(err);
          });
      },
    },
  };

  Vue.createApp(Counter).mount("#MainArea");
});

// 取得當前URL
function ParsingURL(protocol, port, hostname, pathname) {
  // 取得當前網址
  let get_URL = new URL(location.href);

  if (protocol == "") {
    // 取得網址中的通訊協定部分
    var protocol = get_URL.protocol;
  } else {
    var protocol = protocol;
  }

  if (port == "") {
    // 網址中Port
    var port = get_URL.port;
  } else {
    var port = port;
  }

  if (hostname == "") {
    // 取得網址中的主機名稱
    var hostname = get_URL.hostname;
  } else {
    var hostname = hostname;
  }

  if (pathname == "") {
    // 取得網頁路徑部分
    var pathname = get_URL.pathname;
  } else {
    var pathname = pathname;
  }

  // 組成完整URL
  let full_URL = protocol + "//" + hostname + ":" + port + pathname;
  // console.log(full_URL);

  return new URL(full_URL);
}

// 組合請求URL
function ParsingURL_Combine(url, SearchParams) {
  // 建立主URL
  let ajax_URL = new URL(local_url);

  // 建立URL參數
  let searchParams = new URLSearchParams(SearchParams);

  // 將主URL與URL參數合併
  ajax_URL.search = searchParams;

  return ajax_URL.href;
}
