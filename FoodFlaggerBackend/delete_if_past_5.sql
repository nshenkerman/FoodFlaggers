DELIMITER $$

CREATE TRIGGER DeleteReportedEvent
AFTER UPDATE ON Event
FOR EACH ROW
BEGIN
    IF NEW.num_reports >= 5 THEN
        DELETE FROM Event WHERE event_id = NEW.event_id;
    END IF;
END$$

DELIMITER ;
