<script lang="ts">
  export let title: string;
</script>

<div class="col-span-6 flex flex-row justify-between">
  <h1 class="display-font text-8xl font-bold mb-4 uppercase">{title}</h1>
  <slot />
</div>
