-- Fix security warning: Set search_path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix security warning: Set search_path for update_bed_occupancy function
CREATE OR REPLACE FUNCTION public.update_bed_occupancy()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If bed_id changed
  IF NEW.bed_id IS DISTINCT FROM OLD.bed_id THEN
    -- Free up old bed if it exists
    IF OLD.bed_id IS NOT NULL THEN
      UPDATE public.beds 
      SET is_occupied = false 
      WHERE id = OLD.bed_id;
    END IF;
    
    -- Occupy new bed if assigned and patient is active
    IF NEW.bed_id IS NOT NULL AND NEW.status = 'active' THEN
      UPDATE public.beds 
      SET is_occupied = true, last_vital_update = now()
      WHERE id = NEW.bed_id;
    END IF;
  END IF;
  
  -- If patient status changed to discharged, free up bed
  IF NEW.status = 'discharged' AND OLD.status = 'active' THEN
    IF NEW.bed_id IS NOT NULL THEN
      UPDATE public.beds 
      SET is_occupied = false 
      WHERE id = NEW.bed_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Fix security warning: Set search_path for set_bed_occupancy_on_insert function
CREATE OR REPLACE FUNCTION public.set_bed_occupancy_on_insert()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.bed_id IS NOT NULL AND NEW.status = 'active' THEN
    UPDATE public.beds 
    SET is_occupied = true, last_vital_update = now()
    WHERE id = NEW.bed_id;
  END IF;
  RETURN NEW;
END;
$$;