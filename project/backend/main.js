const app = Vue.createApp({

    data() {

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
            notificationRead: localStorage.getItem("notificationRead") ? localStorage.getItem("notificationRead"): false
        }

    },

    mounted() {

        this.init();

    },

    methods: {

        init() {

            for(let i = 1; i <= this.maxPages; i++) {
                this.paginatorList.push(i);
            }

            console.log(this.paginatorList, this.maxPages);

            for (let row in this.rows) {
                row["isDropdownActive"] = false;
            }

        },

        notificationHasBeenRead() {
            localStorage.setItem("notificationRead", true);
            this.notificationRead = true;
        },

        fetch(fetchUrl) {

            return new Promise(async(resolve, reject) => {

                try {

                    response = await fetch(fetchUrl).then(response => response.json());
    
                    this.rows = response.data;
                    this.prevPageUrl = response.prev_page_url;
                    this.nextPageUrl = response.next_page_url;
                    this.currentPage = response.current_page;

                    resolve(response);
    
                } catch (error) {
                    
                    reject(error);
    
                }

            });

        },

        fetchData(option) {

            const fetchUrl = option == "next" ? this.nextPageUrl : this.prevPageUrl;

            this.fetch(fetchUrl).then(response => {
                console.log("fetchData success", response);
            }).catch(err => console.log(err));

        },

        fetchDataByPageNumber(pageNumber) {

            const fetchUrl = `${this.apiUrl}/${this.apiMainRessource}/${this.currentRessource}?page=${pageNumber}`;

            this.fetch(fetchUrl).then(response => {
                console.log("fetchDataByPageNumber success", response);
            }).catch(err => console.log(err));

        },

        loadPrevPage() {

            this.fetchData('prev');

        },

        loadNextPage() {

            this.fetchData('next');

        },

        toggleDropdown(rowIndex) {

            this.rows[rowIndex].isDropdownActive = !this.rows[rowIndex].isDropdownActive;

            this.rows.forEach((row, i) => {

                if (i != rowIndex) {
                    this.rows[i].isDropdownActive = false;
                }

            });

        },

        editRow(rowIndex) {
            console.log(rowIndex);
        },

        deleteRow(rowIndex) {
            console.log(rowIndex);
        }

    }

});