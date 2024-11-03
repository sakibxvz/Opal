import { z } from 'zod';

export const workspaceSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Workspace name cannot be empty' })
		.max(20, { message: 'Workspace name cannot be more than 20 characters' }),
});
