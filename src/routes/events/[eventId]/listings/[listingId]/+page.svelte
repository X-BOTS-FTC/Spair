<script lang="ts">
  let { data } = $props();
</script>

<h1>{data.listing.team_name} - {data.listing.item_name}</h1>
<h3>{data.listing.description}</h3>

