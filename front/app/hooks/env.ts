import {z} from 'zod';

// Define the schema for your environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  // PORT: z.coerce.number().min(1).max(65535).default(3000),
  // DATABASE_URL: z.string().url(),
  CMS_URL: z.string().url().min(1),
  CMS_TOKEN: z.string().min(1),
});

// Validate the environment variables
const parseEnv = () => {
  console.log("Parsing environments...");

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment variables:', result.error.format());
    process.exit(1); // Exit the process with an error code
  }

  return result.data; // Return the validated environment variables
};

const env = parseEnv();

export default env;
