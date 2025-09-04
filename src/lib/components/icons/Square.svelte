<script lang="ts">
	export let size: number = 20;
	export let color: string = 'currentColor';
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="inline-block"
>
	<rect x="3" y="3" width="18" height="18" rx="3" stroke={color} stroke-width="2" />
</svg>
