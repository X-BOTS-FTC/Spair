<script lang="ts">
  let { data } = $props();
</script>

<h1>Competitions</h1>

<ul>
  {#each data.competitions as competition}
    <li><a href="/events/{competition.id}">{competition.competition_name}</a></li>
  {/each}
</ul>
