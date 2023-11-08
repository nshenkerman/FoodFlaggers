CREATE OR REPLACE FUNCTION update_ban_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.numReports >= 10 AND NEW.isBanned IS FALSE THEN
        NEW.isBanned := TRUE;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ban_status
AFTER UPDATE OF numReports ON Users
FOR EACH ROW
WHEN (OLD.numReports <> NEW.numReports)
EXECUTE FUNCTION update_ban_status();
