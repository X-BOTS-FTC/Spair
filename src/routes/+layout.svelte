<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import '@fontsource-variable/overpass';
	import '@fontsource-variable/overpass-mono';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="top-bar">
  <a class="active" href="#home"><strong>spair</strong></a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div> 

<style>
  .top-bar {
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: var(--color-bg-accent);
    a {
      text-decoration-line: none;
      font-size: 25px;
    }
  }
</style>

{@render children()}
