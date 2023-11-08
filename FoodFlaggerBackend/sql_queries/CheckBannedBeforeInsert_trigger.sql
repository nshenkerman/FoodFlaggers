CREATE OR REPLACE FUNCTION check_banned_before_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Users WHERE uid = NEW.host_uid AND isBanned) THEN
        RAISE EXCEPTION 'Cannot add event: Host is banned from posting events.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER CheckHostBeforeInsert
BEFORE INSERT ON Event
FOR EACH ROW
EXECUTE FUNCTION check_host_before_insert();
