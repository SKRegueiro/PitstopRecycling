export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          abn: string
          active: boolean | null
          address: string
          business_name: string
          created_at: string
          email: string
          id: number
          signer_names: string[] | null
        }
        Insert: {
          abn: string
          active?: boolean | null
          address: string
          business_name: string
          created_at?: string
          email: string
          id?: number
          signer_names?: string[] | null
        }
        Update: {
          abn?: string
          active?: boolean | null
          address?: string
          business_name?: string
          created_at?: string
          email?: string
          id?: number
          signer_names?: string[] | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          type?: string | null
        }
        Relationships: []
      }
      fuel: {
        Row: {
          carId: number | null
          created_at: string
          employeeId: number
          id: number
          price: number
        }
        Insert: {
          carId?: number | null
          created_at?: string
          employeeId: number
          id?: number
          price: number
        }
        Update: {
          carId?: number | null
          created_at?: string
          employeeId?: number
          id?: number
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "fuel_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      pickups: {
        Row: {
          clientId: number
          created_at: string
          employeeId: number
          id: number
          site: number | null
          status: string
          tyres: Json | null
        }
        Insert: {
          clientId: number
          created_at?: string
          employeeId: number
          id?: number
          site?: number | null
          status?: string
          tyres?: Json | null
        }
        Update: {
          clientId?: number
          created_at?: string
          employeeId?: number
          id?: number
          site?: number | null
          status?: string
          tyres?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "pickups_clientId_fkey"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pickups_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pickups_site_fkey"
            columns: ["site"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          address: string
          created_at: string
          id: number
          type: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: number
          type: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: number
          type?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
