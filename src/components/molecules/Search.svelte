<script lang="ts">
  import { onMount } from "svelte";
  // import { url } from "@utils/url-utils.ts";

  interface SearchResult {
    url: string;
    meta: {
      title: string;
      image?: string;
    };
    excerpt: string;
  }

  let keywordDesktop = "";
  let keywordMobile = "";
  let result: SearchResult[] = [];

  let search = (_keyword: string, _isDesktop: boolean) => {};

  onMount(() => {
    search = async (keyword: string, isDesktop: boolean) => {
      let panel = document.getElementById("search-panel");
      if (!panel) return;

      if (!keyword && isDesktop) {
        panel.classList.add("float-panel-closed");
        return;
      }

      let arr = [];
      const ret = await window.pagefind.search(keyword);
      for (const item of ret.results) {
        arr.push(await item.data());
      }

      if (!arr.length && isDesktop) {
        panel.classList.add("float-panel-closed");
        return;
      }

      if (isDesktop) {
        panel.classList.remove("float-panel-closed");
      }
      result = arr;
    };
  });

  const togglePanel = () => {
    let panel = document.getElementById("search-panel");
    panel?.classList.toggle("float-panel-closed");
  };

  $: search(keywordDesktop, true);
  $: search(keywordMobile, false);
</script>

<!-- search bar for desktop view -->
<div
  id="search-bar"
  class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg
      bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10
"
>
  <slot name="search-icon"></slot>
  <input
    placeholder="Search"
    bind:value={keywordDesktop}
    on:focus={() => search(keywordDesktop, true)}
    class="transition-all pl-10 pr-5 text-sm bg-transparent outline-transparent focus:outline-none
         h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50"
  />
</div>

<!-- toggle btn for phone/tablet view -->
<button
  on:click={togglePanel}
  aria-label="Search Panel"
  id="search-switch"
  class="btn-plain lg:hidden rounded-lg w-11 h-11 active:scale-90"
>
  <slot name="search-switch"></slot>
</button>

<!-- search panel -->
<div
  id="search-panel"
  class="float-panel float-panel-closed search-panel absolute md:w-[30rem]
top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2"
>
  <!-- search bar inside panel for phone/tablet -->
  <div
    id="search-bar-inside"
    class="flex relative lg:hidden transition-all items-center h-11 rounded-xl
      bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10
  "
  >
    <slot name="search-icon"></slot>
    <input
      placeholder="Search"
      bind:value={keywordMobile}
      class="pl-10 pr-5 absolute inset-0 text-sm bg-transparent outline-0 text-black/50 dark:text-white/50"
    />
  </div>

  <!-- search results -->
  {#each result as item}
    <a
      href={item.url}
      class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
       rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"
    >
      <div
        class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]"
      >
        {item.meta.title}<slot name="arrow-icon"></slot>
      </div>
      <div class="transition text-sm text-50">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html item.excerpt}
      </div>
      <!-- {#if item.meta?.image}
        <img src={item.meta?.image} alt="Index cover" />
      {/if} -->
    </a>
  {/each}
</div>
