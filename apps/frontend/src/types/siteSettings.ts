import { z } from 'zod';

export const siteSettingsSocialLinksZ = z.object({
	linkedin: z.string().nullable().optional(),
	github: z.string().nullable().optional(),
	twitter: z.string().nullable().optional(),
});

export const siteSettingsZ = z.object({
	_id: z.string(),
	_type: z.literal('siteSettings'),
	title: z.string().nullable().optional(),
	socialLinks: siteSettingsSocialLinksZ.nullable().optional(),
});

export type SiteSettings = z.infer<typeof siteSettingsZ>;
export type SiteSettingsSocialLinks = z.infer<typeof siteSettingsSocialLinksZ>;
