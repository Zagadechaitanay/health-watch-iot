export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      actuator_controls: {
        Row: {
          device_type: string
          id: string
          last_updated: string | null
          status: boolean | null
          ward_id: string | null
        }
        Insert: {
          device_type: string
          id?: string
          last_updated?: string | null
          status?: boolean | null
          ward_id?: string | null
        }
        Update: {
          device_type?: string
          id?: string
          last_updated?: string | null
          status?: boolean | null
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "actuator_controls_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          acknowledged_at: string | null
          alert_type: string
          bed_id: string | null
          created_at: string | null
          id: string
          message: string
          patient_id: string | null
          resolved_at: string | null
          severity: string
          status: string
        }
        Insert: {
          acknowledged_at?: string | null
          alert_type: string
          bed_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          patient_id?: string | null
          resolved_at?: string | null
          severity: string
          status?: string
        }
        Update: {
          acknowledged_at?: string | null
          alert_type?: string
          bed_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          patient_id?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_bed_id_fkey"
            columns: ["bed_id"]
            isOneToOne: false
            referencedRelation: "beds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      beds: {
        Row: {
          bed_number: string
          created_at: string | null
          id: string
          is_occupied: boolean | null
          last_vital_update: string | null
          status: string
          ward_id: string | null
        }
        Insert: {
          bed_number: string
          created_at?: string | null
          id?: string
          is_occupied?: boolean | null
          last_vital_update?: string | null
          status?: string
          ward_id?: string | null
        }
        Update: {
          bed_number?: string
          created_at?: string | null
          id?: string
          is_occupied?: boolean | null
          last_vital_update?: string | null
          status?: string
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "beds_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      environmental_data: {
        Row: {
          co2: number | null
          humidity: number | null
          id: string
          pm25: number | null
          recorded_at: string | null
          temperature: number | null
          vocs: number | null
          ward_id: string | null
        }
        Insert: {
          co2?: number | null
          humidity?: number | null
          id?: string
          pm25?: number | null
          recorded_at?: string | null
          temperature?: number | null
          vocs?: number | null
          ward_id?: string | null
        }
        Update: {
          co2?: number | null
          humidity?: number | null
          id?: string
          pm25?: number | null
          recorded_at?: string | null
          temperature?: number | null
          vocs?: number | null
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "environmental_data_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          alert_id: string | null
          id: string
          notification_type: string
          recipient: string
          sent_at: string | null
          status: string
        }
        Insert: {
          alert_id?: string | null
          id?: string
          notification_type: string
          recipient: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          alert_id?: string | null
          id?: string
          notification_type?: string
          recipient?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          admission_date: string | null
          age: number | null
          bed_id: string | null
          created_at: string | null
          diagnosis: string | null
          discharge_date: string | null
          gender: string | null
          id: string
          name: string
          patient_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          admission_date?: string | null
          age?: number | null
          bed_id?: string | null
          created_at?: string | null
          diagnosis?: string | null
          discharge_date?: string | null
          gender?: string | null
          id?: string
          name: string
          patient_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          admission_date?: string | null
          age?: number | null
          bed_id?: string | null
          created_at?: string | null
          diagnosis?: string | null
          discharge_date?: string | null
          gender?: string | null
          id?: string
          name?: string
          patient_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_bed_id_fkey"
            columns: ["bed_id"]
            isOneToOne: false
            referencedRelation: "beds"
            referencedColumns: ["id"]
          },
        ]
      }
      system_config: {
        Row: {
          config_key: string
          config_value: Json
          id: string
          updated_at: string | null
        }
        Insert: {
          config_key: string
          config_value: Json
          id?: string
          updated_at?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      vitals: {
        Row: {
          bed_id: string | null
          ecg_data: string | null
          heart_rate: number | null
          id: string
          patient_id: string | null
          recorded_at: string | null
          spo2: number | null
          temperature: number | null
        }
        Insert: {
          bed_id?: string | null
          ecg_data?: string | null
          heart_rate?: number | null
          id?: string
          patient_id?: string | null
          recorded_at?: string | null
          spo2?: number | null
          temperature?: number | null
        }
        Update: {
          bed_id?: string | null
          ecg_data?: string | null
          heart_rate?: number | null
          id?: string
          patient_id?: string | null
          recorded_at?: string | null
          spo2?: number | null
          temperature?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vitals_bed_id_fkey"
            columns: ["bed_id"]
            isOneToOne: false
            referencedRelation: "beds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vitals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      wards: {
        Row: {
          capacity: number
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          capacity?: number
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          capacity?: number
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
