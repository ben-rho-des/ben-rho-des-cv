<div class="bg-columns">
	<div class="bg-columns--column"></div>
	<div class="bg-columns--column"></div>
	<div class="bg-columns--column"></div>
	<div class="bg-columns--column"></div>
	<div class="bg-columns--column"></div>
	<div class="bg-columns--column"></div>
</div>

<style>
	.bg-columns {
		position: fixed;
		top: 0;
		left: 20px;
		right: 20px;
		height: 100%;
		column-gap: var(--column-gap);
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		object-position: center;
		pointer-events: none;
		z-index: 1;
		opacity: 0.25;
		max-width: var(--max-width);
		margin: auto;
	}

	.bg-columns--column {
		height: 100%;
		border-left: 1px solid var(--primary);
		border-right: 1px solid var(--primary);
	}
</style>
