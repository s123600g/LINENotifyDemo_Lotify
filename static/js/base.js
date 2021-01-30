document.addEventListener("DOMContentLoaded", function (event) {
  const App = Vue.createApp({
    data() {
      return {
        message: "",
        msg_history: [],
      };
    },
    methods: {
      user_subscribe() {
        // 取得網址，不包含URL Search Parames
        let local_url = ParsingURL(
          (protocol = ""),
          (port = ""),
          (hostname = ""),
          (pathname = "/api/user_subscribe")
        );

        // 取得請求網址
        let url_href = ParsingURL_Combine(
          (url = local_url),
          (SearchParams = {})
        );

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
      msg_send() {
        // 取得網址，不包含URL Search Parames
        let local_url = ParsingURL(
          (protocol = ""),
          (port = ""),
          (hostname = ""),
          (pathname = "/api/sendMessage")
        );

        // 取得請求網址
        let url_href = ParsingURL_Combine(
          (url = local_url),
          (SearchParams = {})
        );

        fetch(url_href, {
          method: "POST",
          body: JSON.stringify({
            msg: this.message,
          }),
        })
          .then((response) => {
            // 請求回應狀態處理
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                "Network response was not ok. " +
                  "status code: " +
                  response.status +
                  " Status Text: " +
                  response.statusText
              );
            }
          })
          .then((data) => {
            this.msg_history = data["HistoryMsg"];
          })
          .catch((err) => {
            alert("與伺服器請求失敗.");
          });
      },
    },
    mounted() {
      // 取得網址，不包含URL Search Parames
      let local_url = ParsingURL(
        (protocol = ""),
        (port = ""),
        (hostname = ""),
        (pathname = "/api/History")
      );

      // 取得請求網址
      let url_href = ParsingURL_Combine((url = local_url), (SearchParams = {}));

      fetch(url_href, { method: "GET" })
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
          this.msg_history = data["HistoryMsg"];
          console.log(this.msg_history);
        })
        .catch((err) => {
          alert("與伺服器請求失敗.");
        });
    },
    // 設置vue模板識別符號，用來跟jinja2模板識別符號做分割
    delimiters: ["[[", "]]"],
  }).mount("#MainArea");
});

/**
 * 取得當前URL
 * @param {string} protocol
 * @param {string} port
 * @param {string} hostname
 * @param {string} pathname
 */
function ParsingURL(protocol, port, hostname, pathname) {
  // 取得當前網址
  let get_URL = new URL(location.href);

  let PROTOCOL = protocol;
  if (protocol == "") {
    // 取得網址中的通訊協定部分
    PROTOCOL = get_URL.protocol;
  }

  let PORT = port;
  if (port == "") {
    // 網址中Port
    PORT = get_URL.port;
  }

  let HOSTNAME = hostname;
  if (hostname == "") {
    // 取得網址中的主機名稱
    HOSTNAME = get_URL.hostname;
  }

  let PATH_NAME = pathname;
  if (pathname == "") {
    // 取得網頁路徑部分
    PATH_NAME = get_URL.pathname;
  }

  // 組成完整URL
  let full_URL = PROTOCOL + "//" + HOSTNAME + ":" + PORT + PATH_NAME;
  // console.log(full_URL);

  return new URL(full_URL);
}

/**
 * 組合請求URL，如果有網頁參數會自動整合
 * @param {object} url
 * @param {object} SearchParams
 */
function ParsingURL_Combine(url, SearchParams) {
  // 建立主URL
  let ajax_URL = new URL(url);

  // 建立URL參數
  let searchParams = new URLSearchParams(SearchParams);

  // 將主URL與URL參數合併
  ajax_URL.search = searchParams;

  return ajax_URL.href;
}
