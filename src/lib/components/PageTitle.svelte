<script lang="ts">
	export let title: string;
</script>

<div class="col-span-6 flex flex-col justify-between lg:flex-row">
	<h1 class="display-font mb-4 text-6xl font-bold uppercase lg:text-8xl">{title}</h1>
	<slot />
</div>
