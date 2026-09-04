'use strict';

const { z } = require('zod');

const chatSchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(['user', 'assistant']),
            content: z.string().min(1).max(2000)
        })
    ).min(1).max(10),
    context: z.object({
        mood: z.string().optional(),
        restrictions: z.array(z.string()).optional()
    }).optional()
});

module.exports = { chatSchema };
