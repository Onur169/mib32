const app = Vue.createApp({

    data() {

        return {
            name: 'Climatestrike API Backend',
            apiUrl: 'https://api.judoclub-rockenberg.de',
            pager: 1,
            currentRessource: 'events'
        }

    },

    methods() {

        return {
            
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

            }

        }

    }

});