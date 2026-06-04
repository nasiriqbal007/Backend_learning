import { pool } from "../config/db";

export type ActionType = "CREATE" | "UPDATE" | "DELETE";

type AuditActionLogs = {
  userId: number;
  movieId: number;
  action: ActionType;
  beforeData?: unknown;
  afterData?: unknown;
};

export const insertAuditAction = async ({
  userId,
  movieId,
  action,
  beforeData,
  afterData,
}: AuditActionLogs): Promise<void> => {
  await pool.query(
    `
        INSERT INTO audit_logs(user_id,movie_id,action,before_data, after_data)
        VALUES ($1,$2,$3,$4,$5)
        `,
    [
      userId,
      movieId,
      action,
      beforeData ? JSON.stringify(beforeData) : null,
      afterData ? JSON.stringify(afterData) : null,
    ],
  );
};
