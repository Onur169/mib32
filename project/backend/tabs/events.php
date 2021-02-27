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
    {{#events}}
      <tr>
        <td>{{id}}</td>
        <td>{{name}}</td>
        <td>{{description}}</td>
        <td>{{start_at}}</td>
        <td>{{end_at}}</td>
        <td>{{lat}}</td>
        <td>{{lng}}</td>
        <td>
          <div class="dropdown">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                <span>Click me</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Editieren
                </a>
                <a href="#" class="dropdown-item">
                  Löschen
                </a>
              </div>
            </div>
          </div>
        </td>
      </tr>
    {{/events}}
  </tbody>
</table>

<nav class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous">Previous</a>
    <a class="pagination-next">Next page</a>
    <ul class="pagination-list">
        <li>
            <a class="pagination-link" aria-label="Goto page 1">1</a>
        </li>
        <li>
            <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
            <a class="pagination-link" aria-label="Goto page 45">45</a>
        </li>
        <li>
            <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
        </li>
        <li>
            <a class="pagination-link" aria-label="Goto page 47">47</a>
        </li>
        <li>
            <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
            <a class="pagination-link" aria-label="Goto page 86">86</a>
        </li>
    </ul>
</nav>
