import { defineCollection, z } from 'astro:content';

// Impact stats shown in the home-page stat band. Only authoritative, sourced
// figures belong here (see reference/sparrow-inc/strategy/foundation-mission-vision-values.md).
const stats = defineCollection({
  type: 'content',
  schema: z.object({
    value: z.string(), // "3×", "60%", "2×"
    label: z.string(),
    source: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Core values. Body of each file is the value's description.
const values = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
  }),
});

// Staff + board. Body is an optional short bio.
const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum(['leadership', 'board']).default('leadership'),
    photo: z.string().optional(),
    order: z.number().default(0),
    public: z.boolean().default(true), // set false to omit from the public page
  }),
});

// Programs (Twin Oaks, LifeChange). Body is the long description (markdown).
const programs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    heroImage: z.string().optional(),
    contactEmail: z.string(),
    contactPhone: z.string().optional(),
    eligibility: z.array(z.string()).default([]),
    applicationSteps: z
      .array(z.object({ title: z.string(), detail: z.string() }))
      .default([]),
    gallery: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

// Testimonials. Body is the quote.
const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    attribution: z.string(),
    program: z.enum(['life-change', 'twin-oaks', 'general']).default('general'),
    photo: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// FAQs. Body is the answer.
const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    program: z.enum(['twin-oaks', 'life-change', 'general']).default('general'),
    order: z.number().default(0),
  }),
});

export const collections = { stats, values, team, programs, testimonials, faqs };
