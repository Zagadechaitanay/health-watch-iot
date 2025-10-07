-- Create wards table
CREATE TABLE public.wards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  capacity INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create beds table with status tracking
CREATE TABLE public.beds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bed_number TEXT NOT NULL,
  ward_id UUID REFERENCES public.wards(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  is_occupied BOOLEAN DEFAULT false,
  last_vital_update TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(bed_number, ward_id)
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  diagnosis TEXT,
  bed_id UUID REFERENCES public.beds(id) ON DELETE SET NULL,
  admission_date TIMESTAMPTZ DEFAULT now(),
  discharge_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'discharged')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create vitals table for patient monitoring
CREATE TABLE public.vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  bed_id UUID REFERENCES public.beds(id) ON DELETE CASCADE,
  heart_rate INTEGER,
  spo2 INTEGER,
  temperature DECIMAL(4,1),
  ecg_data TEXT,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- Create environmental_data table for ward monitoring
CREATE TABLE public.environmental_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ward_id UUID REFERENCES public.wards(id) ON DELETE CASCADE,
  temperature DECIMAL(4,1),
  humidity DECIMAL(4,1),
  co2 INTEGER,
  vocs INTEGER,
  pm25 DECIMAL(5,2),
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  bed_id UUID REFERENCES public.beds(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('sos', 'abnormal_vitals', 'hydration', 'environmental')),
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'warning', 'info')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'acknowledged', 'resolved')),
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create notification_logs table
CREATE TABLE public.notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID REFERENCES public.alerts(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('email', 'whatsapp')),
  recipient TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending'))
);

-- Create system_config table for global settings
CREATE TABLE public.system_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key TEXT UNIQUE NOT NULL,
  config_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create actuator_controls table for ward devices
CREATE TABLE public.actuator_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ward_id UUID REFERENCES public.wards(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL CHECK (device_type IN ('fan', 'ac', 'air_purifier')),
  status BOOLEAN DEFAULT false,
  last_updated TIMESTAMPTZ DEFAULT now(),
  UNIQUE(ward_id, device_type)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.wards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.environmental_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actuator_controls ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (since this is a demo/prototype)
-- In production, these should be restricted based on user roles

CREATE POLICY "Allow public read access to wards" ON public.wards FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to wards" ON public.wards FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to wards" ON public.wards FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to wards" ON public.wards FOR DELETE USING (true);

CREATE POLICY "Allow public read access to beds" ON public.beds FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to beds" ON public.beds FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to beds" ON public.beds FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to beds" ON public.beds FOR DELETE USING (true);

CREATE POLICY "Allow public read access to patients" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to patients" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to patients" ON public.patients FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to patients" ON public.patients FOR DELETE USING (true);

CREATE POLICY "Allow public read access to vitals" ON public.vitals FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to vitals" ON public.vitals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to vitals" ON public.vitals FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to vitals" ON public.vitals FOR DELETE USING (true);

CREATE POLICY "Allow public read access to environmental_data" ON public.environmental_data FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to environmental_data" ON public.environmental_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to environmental_data" ON public.environmental_data FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to alerts" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to alerts" ON public.alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to alerts" ON public.alerts FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to notification_logs" ON public.notification_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to notification_logs" ON public.notification_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to system_config" ON public.system_config FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to system_config" ON public.system_config FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to system_config" ON public.system_config FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to actuator_controls" ON public.actuator_controls FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to actuator_controls" ON public.actuator_controls FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to actuator_controls" ON public.actuator_controls FOR UPDATE USING (true);

-- Create trigger to update patients.updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_patients_updated_at
BEFORE UPDATE ON public.patients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to update bed occupancy when patient is assigned
CREATE OR REPLACE FUNCTION public.update_bed_occupancy()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bed_occupancy_on_patient_change
AFTER UPDATE ON public.patients
FOR EACH ROW
EXECUTE FUNCTION public.update_bed_occupancy();

-- Create trigger for new patient assignment
CREATE OR REPLACE FUNCTION public.set_bed_occupancy_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.bed_id IS NOT NULL AND NEW.status = 'active' THEN
    UPDATE public.beds 
    SET is_occupied = true, last_vital_update = now()
    WHERE id = NEW.bed_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_bed_occupancy_on_patient_insert
AFTER INSERT ON public.patients
FOR EACH ROW
EXECUTE FUNCTION public.set_bed_occupancy_on_insert();

-- Insert sample data for wards
INSERT INTO public.wards (name, capacity) VALUES
  ('Ward 1', 20),
  ('Ward 2', 15),
  ('Ward 3', 15);

-- Insert sample beds
INSERT INTO public.beds (bed_number, ward_id, status) 
SELECT 
  'Bed ' || i,
  (SELECT id FROM public.wards WHERE name = 'Ward 1' LIMIT 1),
  'active'
FROM generate_series(1, 5) i;

INSERT INTO public.beds (bed_number, ward_id, status) 
SELECT 
  'Bed ' || i,
  (SELECT id FROM public.wards WHERE name = 'Ward 2' LIMIT 1),
  'active'
FROM generate_series(1, 3) i;

-- Insert sample actuator controls
INSERT INTO public.actuator_controls (ward_id, device_type, status)
SELECT id, 'fan', false FROM public.wards
UNION ALL
SELECT id, 'ac', false FROM public.wards
UNION ALL
SELECT id, 'air_purifier', false FROM public.wards;