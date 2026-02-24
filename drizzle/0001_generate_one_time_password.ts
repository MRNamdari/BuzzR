import { sql } from "drizzle-orm";

export const up = sql`CREATE OR REPLACE FUNCTION generate_one_time_password()
RETURNS VARCHAR(8)
LANGUAGE plpgsql
AS $$
DECLARE
    random_string VARCHAR(8);
BEGIN
    random_string := LPAD(FLOOR(random() * 100000000)::TEXT, 8, '0');
    RETURN random_string;
END;
$$;`;

export const down = sql`
  DROP FUNCTION IF EXISTS generate_one_time_password;
`;
