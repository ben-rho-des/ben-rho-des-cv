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
	<circle cx="12" cy="12" r="10" stroke={color} stroke-width="2" />
	<circle cx="8" cy="9" r="1" fill={color} />
	<circle cx="16" cy="9" r="1" fill={color} />
	<path
		d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
		stroke={color}
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>
