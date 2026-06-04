import express, { type Request, type Response } from "express";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_dFmNYIL2b9vW@ep-mute-poetry-ap256jtj-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
}

const app = express();
app.use(express.json());

app.post("/api/transfer", async (req: Request, res: Response) => {
  const { fromAccountId, toAccountId, amount } = req.body as TransferRequest;

  const sendingAmount = Number(amount);

  if (
    !fromAccountId ||
    !toAccountId ||
    !Number.isFinite(sendingAmount) ||
    sendingAmount <= 0
  ) {
    return res.status(400).json({ error: "invalid values" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const senderResult = await client.query(
      "SELECT balance FROM account WHERE userid = $1 FOR UPDATE",
      [fromAccountId],
    );

    if (senderResult.rows.length === 0) {
      throw new Error("Sender not found");
    }

    const balance = Number(senderResult.rows[0].balance);

    if (balance < sendingAmount) {
      throw new Error("Insufficient balance");
    }

    const debitResult = await client.query(
      "UPDATE account SET balance = balance - $1 WHERE userid = $2",
      [sendingAmount, fromAccountId],
    );

    if (debitResult.rowCount === 0) {
      throw new Error("Failed to debit sender");
    }

    const creditResult = await client.query(
      "UPDATE account SET balance = balance + $1 WHERE userid = $2 AND is_active =true",
      [sendingAmount, toAccountId],
    );

    if (creditResult.rowCount === 0) {
      throw new Error("Receiver not found or inactive");
    }

    await client.query("COMMIT");

    return res.json({ message: "Transfer successful" });
  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(500).json({
      error: error instanceof Error ? error.message : "transfer failed",
    });
  } finally {
    client.release();
  }
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
