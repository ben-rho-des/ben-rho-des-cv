<script lang="ts">
	import FileDocument from '$lib/components/icons/FileDocument.svelte';

	export let href: string;
	export let label: string = 'Download pdf';
	export let size: number = 24;
</script>

<a
	class="bubble display-font-alt flex !min-w-[150px] items-center gap-2 self-center self-start !p-6 text-2xl uppercase transition-all duration-200 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-95 lg:!min-w-[200px] lg:self-center lg:!p-10"
	target="_blank"
	rel="noopener"
	{href}
>
	<FileDocument {size} />
	{label}
</a>
