<div class="table-wrapper">
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
</div>

  <nav class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous" :disabled="isPrevDisabled" @click="loadPrevPage()">Previous</a>
    <a class="pagination-next" @click="loadNextPage()">Next page</a>
    <ul class="pagination-list">
      <li v-for="(paginatorNumber, paginatorIndex) of paginatorList">
        <a class="pagination-link" @click="fetchDataByPageNumber(paginatorNumber)"
          :class="{'is-current': paginatorNumber == currentPage}"
          :aria-label="`Seite: ${paginatorNumber}`">{{paginatorNumber}}</a>
      </li>
    </ul>
  </nav>

