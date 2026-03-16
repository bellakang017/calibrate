<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { matchedPersona, responses, currentScreen } from '$lib/stores/intervention.js';
  import { narratives } from '$lib/data/narratives.js';
  import Asterism from '$lib/components/Asterism.svelte';
  import NavFooter from '$lib/components/NavFooter.svelte';
  import { get } from 'svelte/store';

  currentScreen.set(3);

  const persona = get(matchedPersona);
  const narrative = persona ? narratives[persona.id] : null;

  let selfMapping = $state('');
  let paragraphEls = [];

  onMount(async () => {
    if (!persona) {
      goto(`${base}/quiz`, { replaceState: true });
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      paragraphEls.forEach(el => { if (el) el.style.opacity = '1'; });
      return;
    }

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    paragraphEls.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  });

  function handleContinue() {
    responses.update(r => ({ ...r, selfMapping }));
    goto(`${base}/task`);
  }
</script>

<div class="screen">
  {#if narrative}
    <p class="narrative-label">{narrative.title}</p>

    <div class="narrative-body">
      {#each narrative.paragraphs as para, i}
        <p class="narrative-paragraph" bind:this={paragraphEls[i]}>
          {#if i === 0}
            <span class="first-letter">{para[0]}</span>{para.slice(1)}
          {:else}
            {para}
          {/if}
        </p>
      {/each}
    </div>

    <div class="self-map">
      <Asterism />
      <p class="self-map-prompt">{narrative.selfMappingPrompt}</p>
      <textarea
        class="minimal"
        bind:value={selfMapping}
        placeholder="Begin writing..."
        rows="4"
      ></textarea>
    </div>

    <NavFooter
      current={3}
      total={5}
      onContinue={handleContinue}
      onBack={() => goto(`${base}/quiz`)}
    />
  {:else}
    <p>No persona matched. <a href="{base}/quiz">Retake the quiz</a>.</p>
  {/if}
</div>

<style>
  .narrative-label {
    font-family: var(--font-ui);
    font-size: 13px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    margin-bottom: 32px;
  }
  .narrative-paragraph {
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 300;
    color: var(--text);
    line-height: 1.9;
    margin-bottom: 28px;
    opacity: 0;
  }
  .first-letter {
    font-size: 48px;
    float: left;
    line-height: 0.82;
    margin-right: 6px;
    margin-top: 6px;
    font-weight: 500;
    color: var(--text);
  }
  .self-map {
    margin-top: 48px;
    padding-top: 32px;
  }
  .self-map-prompt {
    font-family: var(--font-question);
    font-size: 19px;
    font-style: italic;
    font-weight: 400;
    color: var(--text);
    line-height: 1.6;
    text-align: center;
    max-width: 460px;
    margin: 0 auto 24px;
  }
</style>
