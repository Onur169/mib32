<div class="tabs">
    <ul>
        {{#nav}}
        <li><a @click.prevent="renderTab('{{ filename }}')" href="/tab/{{ filename }}">{{ filename }}</a></li>
        {{/nav}}
    </ul>
</div>