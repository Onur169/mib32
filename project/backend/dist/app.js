"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = Vue.createApp({
  data: function data() {
    return {
      name: 'Climatestrike API Backend',
      apiUrl: 'https://api.judoclub-rockenberg.de',
      apiMainRessource: 'climatestrike',
      currentRessource: 'events',
      rows: window.api.data.data,
      prevPageUrl: window.api.data.prev_page_url,
      nextPageUrl: window.api.data.next_page_url,
      currentPage: window.api.data.current_page,
      maxPages: window.api.data.max_pages,
      paginatorList: [],
      notificationRead: localStorage.getItem("notificationRead") ? localStorage.getItem("notificationRead") : false
    };
  },
  mounted: function mounted() {
    this.init();
  },
  computed: {
    isPrevDisabled: function isPrevDisabled() {
      return this.currentPage <= 1;
    }
  },
  methods: {
    init: function init() {
      for (var i = 1; i <= this.maxPages; i++) {
        this.paginatorList.push(i);
      }

      for (var row in this.rows) {
        row["isDropdownActive"] = false;
      }
    },
    notificationHasBeenRead: function notificationHasBeenRead() {
      localStorage.setItem("notificationRead", true);
      this.notificationRead = true;
    },
    fetch: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (fetchUrl) {
      var _this = this;

      return new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return fetch(fetchUrl).then(function (response) {
                    return response.json();
                  });

                case 3:
                  response = _context.sent;
                  _this.rows = response.data;
                  _this.prevPageUrl = response.prev_page_url;
                  _this.nextPageUrl = response.next_page_url;
                  _this.currentPage = response.current_page;
                  resolve(response);
                  _context.next = 14;
                  break;

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](0);
                  reject(_context.t0);

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 11]]);
        }));

        return function (_x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }());
    }),
    fetchData: function fetchData(option) {
      var fetchUrl = option == "next" ? this.nextPageUrl : this.prevPageUrl;
      this.fetch(fetchUrl).then(function (response) {
        console.log("fetchData success", response);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    fetchDataByPageNumber: function fetchDataByPageNumber(pageNumber) {
      var fetchUrl = "".concat(this.apiUrl, "/").concat(this.apiMainRessource, "/").concat(this.currentRessource, "?page=").concat(pageNumber);
      this.fetch(fetchUrl).then(function (response) {
        console.log("fetchDataByPageNumber success", response);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    loadPrevPage: function loadPrevPage() {
      this.fetchData('prev');
    },
    loadNextPage: function loadNextPage() {
      this.fetchData('next');
    },
    toggleDropdown: function toggleDropdown(rowIndex) {
      var _this2 = this;

      this.rows[rowIndex].isDropdownActive = !this.rows[rowIndex].isDropdownActive;
      this.rows.forEach(function (row, i) {
        if (i != rowIndex) {
          _this2.rows[i].isDropdownActive = false;
        }
      });
    },
    editRow: function editRow(rowIndex) {
      console.log(rowIndex);
    },
    deleteRow: function deleteRow(rowIndex) {
      console.log(rowIndex);
    }
  }
});