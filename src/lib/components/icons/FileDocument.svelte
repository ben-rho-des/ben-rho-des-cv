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
	<path
		d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
		stroke={color}
		stroke-width="2"
		stroke-linejoin="round"
	/>
	<path
		d="M14 2V8H20"
		stroke={color}
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path d="M16 13H8" stroke={color} stroke-width="2" stroke-linecap="round" />
	<path d="M16 17H8" stroke={color} stroke-width="2" stroke-linecap="round" />
	<path d="M10 9H8" stroke={color} stroke-width="2" stroke-linecap="round" />
</svg>
