<table class="table">
  <thead>
    <tr>
      <th><abbr title="Position">Pos</abbr></th>
      <th>Name</th>
      <th>Beschreibung</th>
      <th>Event-Start</th>
      <th>Event-Ende</th>
      <th>Lat</th>
      <th>Lng</th>
      <th><strong>Aktion auswählen</strong></th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="(row, rowIndex) in rows">
        <td>{{row.id}}</td>
        <td>{{row.name}}</td>
        <td>{{row.description}}</td>
        <td>{{row.start_at}}</td>
        <td>{{row.end_at}}</td>
        <td>{{row.lat}}</td>
        <td>{{row.lng}}</td>
        <td>
          <div class="dropdown" :class="{'is-active': row.isDropdownActive}" v-on:click="toggleDropdown(rowIndex)">
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
                <a href="#" class="dropdown-item" v-on:click="editRow(rowIndex)">Editieren</a>
                <a href="#" class="dropdown-item" v-on:click="deleteRow(rowIndex)">Löschen</a>
              </div>
            </div>
          </div>
        </td>
      </tr>
  </tbody>
</table>

<nav class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous" v-on:click="loadPrevPage()">Previous</a>
    <a class="pagination-next" v-on:click="loadNextPage()">Next page</a>
    <ul class="pagination-list">
        <li v-for="(paginatorNumber, paginatorIndex) of paginatorList">
            <a class="pagination-link" v-on:click="fetchDataByPageNumber(paginatorNumber)" :class="{'is-current': paginatorNumber == currentPage}" :aria-label="`Seite: ${paginatorNumber}`">{{paginatorNumber}}</a>
        </li>
    </ul>
</nav>
