<script lang="ts">
  let { data } = $props();
</script>

<h1>{data.competition.competition_name}</h1>
<p>Starts: {data.competition.start_time}</p>
<p>Ends: {data.competition.end_time}</p>

<h2>Listings</h2>
<ul>
  {#each data.listings as listing}
    <a href="/events/{data.competition.id}/listings/{listing.id}">{listing.team_name} - {listing.description}</a>
  {/each}
</ul>

<h2>Requests</h2>
<ul>
  {#each data.requests as request}
    <li>
      {request.team_name} - {request.description}
      <ul>
        {#each request.items as item}
          <li>{item.item_name ?? item.other_description}</li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

