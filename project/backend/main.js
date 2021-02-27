const app = Vue.createApp({

    data() {

        return {
            name: 'Climatestrike API Backend',
            apiUrl: 'https://api.judoclub-rockenberg.de',
            pager: 1,
            currentRessource: 'events',
            rows: window.api.data
        }

    },

    mounted() {

        this.init();

    },

    methods: {

        init() {

            for(let row in this.rows) {
                row["isDropdownActive"] = false;
            }

        },
        
        fetchData() {


            console.log("Fetch data", this.currentRessource, this.pager);

        },

        loadPrevPage() {

            --this.pager;

            this.fetchData();

        },

        loadNextPage() {

            ++this.pager;

            this.fetchData();

        },

        toggleDropdown(rowIndex) {

            this.rows[rowIndex].isDropdownActive = !this.rows[rowIndex].isDropdownActive;

            this.rows.forEach( (row, i) => {

                if(i != rowIndex) {
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