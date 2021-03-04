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
            notificationRead: localStorage.getItem("notificationRead") ? localStorage.getItem("notificationRead") : false,
        }

    },

    mounted() {

        this.init();

    },

    computed: {

        isPrevDisabled() {
            return this.currentPage <= 1;
        }

    },

    methods: {

        init() {

            for (let i = 1; i <= this.maxPages; i++) {
                this.paginatorList.push(i);
            }

            for (let row in this.rows) {
                row["isDropdownActive"] = false;
            }

        },

        notificationHasBeenRead() {
            localStorage.setItem("notificationRead", true);
            this.notificationRead = true;
        },

        fetch(fetchUrl) {

            return new Promise(async (resolve, reject) => {

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

        async fetchData(option) {

            const fetchUrl = option == "next" ? this.nextPageUrl : this.prevPageUrl;

            let response = null;

            try {

                response = await this.fetch(fetchUrl);

            } catch (error) {
                
                console.log(error);

            }

        },

        async fetchDataByPageNumber(pageNumber) {

            const fetchUrl = `${this.apiUrl}/${this.apiMainRessource}/${this.currentRessource}?page=${pageNumber}`;

            let response = null;

            try {

                response = await this.fetch(fetchUrl);

            } catch (error) {
                
                console.log(error);

            }

        },

        loadPrevPage() {

            this.fetchData('prev');

        },

        loadNextPage() {

            this.fetchData('next');

        },

        async renderTab(tab) {

            let response = null;
            let tabPath = `tab/${tab}`;

            try {

                response = await fetch(tabPath).then(response => response.text());

            } catch (error) {
                
                console.log(error);

            }

        }

    }

});


app.component('tab-area', {

    props: ['cols', 'rows'],

    methods: {

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
        },


    },

    template: `

        <table class="table">
            <thead>
                <tr>
                    <th v-for="columnName of cols">
                        <span v-if="columnName != 'isDropdownActive'">{{ columnName }}</span>
                    </th>
                </tr>
            </thead>

            <tbody>
            
                <tr v-for="(row, rowIndex) in rows">

                    <td v-for="key in Object.keys(row)">
                        <span v-if="key != 'isDropdownActive'">{{ row[key] }}</span>
                    </td>

                    <td>
                        <div class="dropdown" :class="{'is-active': row.isDropdownActive}" @click="toggleDropdown(rowIndex)">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>Aktion</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                            <a href="#" class="dropdown-item" @click="editRow(row.id)">Editieren</a>
                            <a href="#" class="dropdown-item" @click="deleteRow(row.id)">Löschen</a>
                            </div>
                        </div>
                        </div>
                    </td>

                </tr>

            </tbody>

        </table>

    `
});