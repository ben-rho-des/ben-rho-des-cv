<script lang="ts">
	export let title: string;
</script>

<div class="col-span-6 flex flex-row justify-between">
	<h1 class="display-font mb-4 text-8xl font-bold uppercase">{title}</h1>
	<slot />
</div>
